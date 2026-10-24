"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { stories } from "@/data/stories";
import { dayKey, pointsFor } from "@/lib/streak";
import { allScores, buildTimeline, newBadgesFor, streaks } from "@/lib/score";
import { storyForToday, todayKey } from "@/lib/schedule";
import { clearGuest, loadGuest, saveGuest } from "@/lib/guest";
import { loadPlus, type PlusState } from "@/lib/billing";
import { anonId, track } from "@/lib/analytics";
import { clearProgress, getProgress } from "@/lib/progress";
import type { Completion, Profile, View } from "@/lib/types";
import { Landing } from "@/components/Landing";
import { ProfileForm } from "@/components/ProfileForm";
import { AppShell, Today } from "@/components/Today";
import { Deck } from "@/components/Deck";
import { Quiz } from "@/components/Quiz";
import { Tell } from "@/components/Tell";
import { Result } from "@/components/Result";
import { Plus } from "@/components/Plus";
import { Billing } from "@/components/Billing";
import { Badges, Behind, Explain } from "@/components/Pages";
import { DeleteAccount, Deeper, Help } from "@/components/More";

function Blank() {
  return <div className="min-h-dvh bg-deep" aria-busy="true" />;
}

type Pending = { before: number; after: number; newBadges: string[] };

// steps inside one story replace each other in the browser history,
// so the phone's back button always returns to Today in one tap
const inStory = (v: View) => v.name === "quiz" || v.name === "tell" || v.name === "result";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [serverRows, setServerRows] = useState<Completion[]>([]);
  const [guestRows, setGuestRows] = useState<Completion[]>([]);
  const [plus, setPlus] = useState<PlusState | null>(null);
  const [view, setViewState] = useState<View>({ name: "today" });
  const [guestMode, setGuestMode] = useState(false);
  const [pending, setPending] = useState<Pending>({ before: 0, after: 0, newBadges: [] });
  const viewRef = useRef<View>({ name: "today" });
  const [marks, setMarks] = useState<boolean[]>([]);

  const depthRef = useRef(0);

  // move to a screen, keeping the browser's back button in step
  const go = useCallback((next: View) => {
    const from = viewRef.current;
    const state = { v: next };
    if (next.name === "today") {
      // "back to today": step back through the history we added, so the back button never loops
      if (depthRef.current > 0) {
        window.history.go(-depthRef.current);
        return;
      }
      window.history.replaceState(state, "");
    } else if (inStory(next) && (inStory(from) || from.name === "deck")) {
      window.history.replaceState(state, "");
    } else {
      window.history.pushState(state, "");
      depthRef.current += 1;
    }
    viewRef.current = next;
    setViewState(next);
    window.scrollTo(0, 0);
  }, []);

  const back = useCallback(() => {
    if (depthRef.current > 0) window.history.back();
    else go({ name: "today" });
  }, [go]);

  useEffect(() => {
    window.history.replaceState({ v: { name: "today" } }, "");
    const onPop = (e: PopStateEvent) => {
      const v = (e.state?.v as View | undefined) ?? { name: "today" };
      depthRef.current = v.name === "today" ? 0 : Math.max(0, depthRef.current - 1);
      viewRef.current = v;
      setViewState(v);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const userId = session?.user.id;
  const [sharePlays, setSharePlays] = useState(0);
  useEffect(() => {
    supabase.rpc("share_plays", { ref: anonId() }).then(({ data }) => setSharePlays(typeof data === "number" ? data : 0));
  }, [userId]);
  const completions = session ? serverRows : guestRows;

  useEffect(() => {
    setGuestRows(loadGuest());
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (!s) {
        setProfile(undefined);
        setServerRows([]);
        setPlus(null);
        viewRef.current = { name: "today" };
        setViewState({ name: "today" });
      }
    });
    track("landing_viewed");
    return () => sub.subscription.unsubscribe();
  }, []);

  const refreshRows = useCallback(async (uid: string) => {
    const { data } = await supabase
      .from("completions")
      .select("story_id,completed_on,correct,total,points,shared_at,told,landed,told_answered_at")
      .eq("user_id", uid);
    setServerRows((data as Completion[]) ?? []);
  }, []);

  const refreshPlus = useCallback(async (uid: string) => {
    setPlus(await loadPlus(uid));
  }, []);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("profiles")
      .select("name,handle,created_at")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => setProfile(data ?? null));
    void (async () => {
      // bring anything played before signing in into the account
      const local = loadGuest();
      if (local.length) {
        for (const r of local) {
          await supabase.from("completions").insert({
            user_id: userId,
            story_id: r.story_id,
            completed_on: r.completed_on,
            correct: r.correct,
            total: r.total,
            points: r.points,
            shared_at: r.shared_at ?? null,
          });
        }
        clearGuest();
        setGuestRows([]);
      }
      await refreshRows(userId);
      await refreshPlus(userId);
    })();
  }, [userId, refreshRows, refreshPlus]);

  // a shared link (/?story=id) opens that story straight away
  const openedFromLink = useRef(false);
  useEffect(() => {
    if (!ready || openedFromLink.current) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("story");
    const ref = params.get("r") ?? "";
    if (!id) return;
    const target = stories.find((st) => st.id === id && st.publishDate <= todayKey());
    if (!target) {
      openedFromLink.current = true;
      return;
    }
    if (session && profile === undefined) return; // wait until we know who this is
    openedFromLink.current = true;
    window.history.replaceState(window.history.state, "", "/"); // clean the address first, so back returns to a plain Today
    if (!(session && profile === null)) {
      if (!session) setGuestMode(true);
      track("story_started", { story: id, from: "share_link", ref }, session?.user.id);
      go({ name: "deck", storyId: id });
    }
  }, [ready, session, profile, go]);

  const signedOut = !session;

  function startStory(id: string) {
    track("story_started", { story: id }, userId);
    // quiz already under way: pick it up from the next question
    go(getProgress(id)?.q ? { name: "quiz", storyId: id } : { name: "deck", storyId: id });
  }

  async function finishQuiz(storyId: string, correct: number, total: number, m: boolean[]) {
    setMarks(m);
    clearProgress();
    const today = todayKey();
    const already = completions.find((c) => c.story_id === storyId);
    const joined = profile?.created_at?.slice(0, 10);
    const beforeScore = allScores(buildTimeline(completions, today, joined))[0].score;
    let points = 0;
    let next = completions;
    if (!already) {
      points = pointsFor(correct, total);
      const row: Completion = { story_id: storyId, completed_on: dayKey(new Date()), correct, total, points };
      next = [...completions, row];
      if (userId) {
        await supabase.from("completions").insert({ user_id: userId, ...row });
        setServerRows(next);
      } else {
        saveGuest(next);
        setGuestRows(next);
      }
      track("story_finished", { story: storyId, correct, total }, userId);
    }
    track("quiz_finished", { story: storyId, correct, total }, userId);
    const afterScore = allScores(buildTimeline(next, today, joined))[0].score;
    setPending({ before: beforeScore, after: afterScore, newBadges: newBadgesFor(completions, next, today, joined) });
    go({ name: "tell", storyId, correct, total, points });
  }

  async function shared(storyId: string, channel: string) {
    track("share_tapped", { channel, story: storyId }, userId);
    const now = new Date().toISOString();
    const upd = (list: Completion[]) => list.map((c) => (c.story_id === storyId && !c.shared_at ? { ...c, shared_at: now } : c));
    if (userId) {
      await supabase.from("completions").update({ shared_at: now }).eq("user_id", userId).eq("story_id", storyId);
      setServerRows(upd);
    } else {
      const next = upd(guestRows);
      saveGuest(next);
      setGuestRows(next);
    }
  }

  async function answerTold(storyId: string, told: boolean | null, landed?: "laughed" | "asked_more" | "nothing") {
    const now = new Date().toISOString();
    const patch = { told, landed: landed ?? null, told_answered_at: now };
    track("told_it_answered", { answer: told === null ? "skip" : told ? "yes" : "no", landed: landed ?? "" }, userId);
    const upd = (list: Completion[]) => list.map((c) => (c.story_id === storyId ? { ...c, ...patch } : c));
    if (userId) {
      await supabase.from("completions").update(patch).eq("user_id", userId).eq("story_id", storyId);
      setServerRows(upd);
    } else {
      const next = upd(guestRows);
      saveGuest(next);
      setGuestRows(next);
    }
  }

  if (!ready) return <Blank />;

  // signed in but no profile yet
  if (session && profile === undefined) return <Blank />;
  if (session && profile === null) return <ProfileForm session={session} onDone={(p) => setProfile(p)} />;

  // signed out, nothing played: the landing page
  if (signedOut && !guestMode && guestRows.length === 0 && view.name === "today") {
    return (
      <Landing
        onPlay={() => {
          track("cta_clicked", { cta: "play_now" });
          setGuestMode(true);
          startStory(storyForToday().story.id);
        }}
        onPlus={() => go({ name: "plus" })}
      />
    );
  }

  const joined = profile?.created_at?.slice(0, 10);
  const streak = streaks(buildTimeline(completions, todayKey(), joined)).current;
  const story = "storyId" in view ? stories.find((s) => s.id === view.storyId) : undefined;
  const goToday = () => go({ name: "today" });
  const goPlus = (reason?: string) => go({ name: "plus", reason });

  if (view.name === "explain") return <Explain onBack={() => back()} />;
  if (view.name === "help") return <Help onBack={() => back()} />;
  if (view.name === "deeper") return <Deeper storyId={view.storyId} userId={userId} onBack={() => back()} />;
  if (view.name === "delete" && session)
    return <DeleteAccount email={session.user.email ?? "your account"} onBack={() => back()} />;

  if (view.name === "deck" && story)
    return <Deck story={story} onDone={() => go({ name: "quiz", storyId: story.id })} onClose={() => back()} />;

  if (view.name === "quiz" && story) return <Quiz story={story} onFinish={(c, t, m) => finishQuiz(story.id, c, t, m)} onClose={() => back()} />;

  if (view.name === "tell" && story)
    return (
      <Tell
        story={story}
        marks={marks}
        day={completions.length}
        onShared={(ch) => shared(story.id, ch)}
        onContinue={() =>
          go({ name: "result", storyId: story.id, correct: view.correct, total: view.total, points: view.points, ...pending })
        }
      />
    );

  if (view.name === "result")
    return (
      <Result
        storyId={view.storyId}
        correct={view.correct}
        total={view.total}
        points={view.points}
        before={view.before}
        after={view.after}
        newBadges={view.newBadges}
        completions={completions}
        guest={signedOut}
        userId={userId}
        onPlus={() => goPlus("result")}
        onDeeper={() => go({ name: "deeper", storyId: view.storyId })}
        onExplain={() => go({ name: "explain" })}
        onNext={startStory}
        onHome={goToday}
      />
    );

  if (view.name === "plus")
    return (
      <Plus session={session} plus={plus} reason={view.reason} onBack={() => back()} onChanged={() => userId && refreshPlus(userId)} />
    );

  if (view.name === "billing" && session)
    return <Billing session={session} plus={plus} onBack={() => back()} onPlus={() => goPlus()} />;

  if (view.name === "badges") return <Badges completions={completions} onBack={() => back()} />;

  if (view.name === "behind")
    return <Behind storyId={view.storyId} userId={userId} plus={plus} onBack={() => back()} onPlus={() => goPlus("behind")} />;

  return (
    <AppShell
      profile={profile ?? null}
      streak={streak}
      plus={plus}
      onHome={goToday}
      onPlus={() => goPlus()}
      onBilling={() => go({ name: "billing" })}
      onBadges={() => go({ name: "badges" })}
      onHelp={() => go({ name: "help" })}
      onDelete={() => go({ name: "delete" })}
      onSignOut={() => supabase.auth.signOut()}
    >
      <Today
        profile={profile ?? null}
        completions={completions}
        plus={plus}
        onStart={startStory}
        sharePlays={sharePlays}
        onBehind={(id) => go({ name: "behind", storyId: id })}
        onDeeper={(id) => go({ name: "deeper", storyId: id })}
        onPlus={goPlus}
        onExplain={() => go({ name: "explain" })}
        onAnswerTold={answerTold}
        onBadges={() => go({ name: "badges" })}
      />
    </AppShell>
  );
}
