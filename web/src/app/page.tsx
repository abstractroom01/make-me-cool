"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { stories } from "@/data/stories";
import { dayKey, pointsFor } from "@/lib/streak";
import { allScores, buildTimeline, newBadgesFor, streaks } from "@/lib/score";
import { storyForToday, todayKey } from "@/lib/schedule";
import { clearGuest, loadGuest, saveGuest } from "@/lib/guest";
import { loadPlus, type PlusState } from "@/lib/billing";
import { track } from "@/lib/analytics";
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

function Blank() {
  return <div className="min-h-dvh bg-deep" aria-busy="true" />;
}

type Pending = { before: number; after: number; newBadges: string[] };

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [serverRows, setServerRows] = useState<Completion[]>([]);
  const [guestRows, setGuestRows] = useState<Completion[]>([]);
  const [plus, setPlus] = useState<PlusState | null>(null);
  const [view, setView] = useState<View>({ name: "today" });
  const [guestMode, setGuestMode] = useState(false);
  const [explain, setExplain] = useState(false);
  const [pending, setPending] = useState<Pending>({ before: 0, after: 0, newBadges: [] });

  const userId = session?.user.id;
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
        setView({ name: "today" });
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

  const signedOut = !session;

  function startStory(id: string) {
    track("story_started", { story: id }, userId);
    setView({ name: "deck", storyId: id });
  }

  async function finishQuiz(storyId: string, correct: number, total: number) {
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
    setView({ name: "tell", storyId, correct, total, points });
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
      />
    );
  }

  const joined = profile?.created_at?.slice(0, 10);
  const streak = streaks(buildTimeline(completions, todayKey(), joined)).current;
  const story = "storyId" in view ? stories.find((s) => s.id === view.storyId) : undefined;
  const goToday = () => setView({ name: "today" });
  const goPlus = (reason?: string) => setView({ name: "plus", reason });

  if (explain) return <Explain onBack={() => setExplain(false)} />;

  if (view.name === "deck" && story)
    return <Deck story={story} onDone={() => setView({ name: "quiz", storyId: story.id })} onClose={goToday} />;

  if (view.name === "quiz" && story) return <Quiz story={story} onFinish={(c, t) => finishQuiz(story.id, c, t)} onClose={goToday} />;

  if (view.name === "tell" && story)
    return (
      <Tell
        story={story}
        onShared={(ch) => shared(story.id, ch)}
        onContinue={() =>
          setView({ name: "result", storyId: story.id, correct: view.correct, total: view.total, points: view.points, ...pending })
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
        onExplain={() => setExplain(true)}
        onNext={startStory}
        onHome={goToday}
      />
    );

  if (view.name === "plus")
    return (
      <Plus
        session={session}
        plus={plus}
        reason={view.reason}
        onBack={goToday}
        onChanged={() => userId && refreshPlus(userId)}
      />
    );

  if (view.name === "billing" && session)
    return <Billing session={session} plus={plus} onBack={goToday} onPlus={() => goPlus()} />;

  if (view.name === "badges") return <Badges completions={completions} onBack={goToday} />;

  if (view.name === "behind")
    return <Behind storyId={view.storyId} userId={userId} plus={plus} onBack={goToday} onPlus={() => goPlus("behind")} />;

  return (
    <AppShell
      profile={profile ?? null}
      streak={streak}
      plus={plus}
      onHome={goToday}
      onPlus={() => goPlus()}
      onBilling={() => setView({ name: "billing" })}
      onBadges={() => setView({ name: "badges" })}
      onSignOut={() => supabase.auth.signOut()}
    >
      <Today
        profile={profile ?? null}
        completions={completions}
        plus={plus}
        onStart={startStory}
        onBehind={(id) => setView({ name: "behind", storyId: id })}
        onPlus={goPlus}
        onExplain={() => setExplain(true)}
        onAnswerTold={answerTold}
        onBadges={() => setView({ name: "badges" })}
      />
    </AppShell>
  );
}
