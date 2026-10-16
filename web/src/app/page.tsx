"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { stories } from "@/data/stories";
import { computeStreak, dayKey, pointsFor } from "@/lib/streak";
import type { Completion, Profile, View } from "@/lib/types";
import { Landing } from "@/components/Landing";
import { ProfileForm } from "@/components/ProfileForm";
import { AppShell, Today } from "@/components/Today";
import { Deck } from "@/components/Deck";
import { Quiz } from "@/components/Quiz";
import { Result } from "@/components/Result";

function Blank() {
  return <div className="min-h-dvh bg-deep" aria-busy="true" />;
}

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [view, setView] = useState<View>({ name: "today" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (!s) {
        setProfile(undefined);
        setCompletions([]);
        setView({ name: "today" });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("profiles")
      .select("name,handle")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => setProfile(data ?? null));
    supabase
      .from("completions")
      .select("story_id,completed_on,correct,total,points")
      .eq("user_id", userId)
      .then(({ data }) => setCompletions((data as Completion[]) ?? []));
  }, [userId]);

  const finishQuiz = useCallback(
    async (storyId: string, correct: number, total: number) => {
      const already = completions.find((c) => c.story_id === storyId);
      const points = already ? 0 : pointsFor(correct, total);
      if (!already && userId) {
        const row: Completion = { story_id: storyId, completed_on: dayKey(new Date()), correct, total, points };
        await supabase.from("completions").insert({ user_id: userId, ...row });
        // show the result either way; a failed save is retried by completing the story again
        setCompletions((prev) => [...prev, row]);
      }
      setView({ name: "result", storyId, correct, total, points });
    },
    [completions, userId],
  );

  if (!ready) return <Blank />;
  if (!session) return <Landing />;
  if (profile === undefined) return <Blank />;
  if (profile === null) return <ProfileForm session={session} onDone={setProfile} />;

  const streak = computeStreak(completions.map((c) => c.completed_on)).streak;
  const story = "storyId" in view ? stories.find((s) => s.id === view.storyId) : undefined;

  if (view.name === "deck" && story)
    return <Deck story={story} onDone={() => setView({ name: "quiz", storyId: story.id })} onClose={() => setView({ name: "today" })} />;

  if (view.name === "quiz" && story)
    return <Quiz story={story} onFinish={(c, t) => finishQuiz(story.id, c, t)} onClose={() => setView({ name: "today" })} />;

  if (view.name === "result")
    return (
      <Result
        storyId={view.storyId}
        correct={view.correct}
        total={view.total}
        points={view.points}
        completions={completions}
        onNext={(id) => setView({ name: "deck", storyId: id })}
        onHome={() => setView({ name: "today" })}
      />
    );

  return (
    <AppShell profile={profile} streak={streak} onHome={() => setView({ name: "today" })} onSignOut={() => supabase.auth.signOut()}>
      <Today profile={profile} completions={completions} onStart={(id) => setView({ name: "deck", storyId: id })} />
    </AppShell>
  );
}
