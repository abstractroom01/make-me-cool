"use client";

import { useState } from "react";
import { stories } from "@/data/stories";
import { supabase } from "@/lib/supabase";
import { ResourceList } from "./Resources";
import { Feedback } from "./Feedback";

export function Deeper({ storyId, userId, onBack }: { storyId: string; userId?: string; onBack: () => void }) {
  const story = stories.find((s) => s.id === storyId)!;
  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-8 md:px-8 md:py-12">
        <button className="t-caption underline" onClick={onBack}>
          ← back
        </button>
        <p className="t-caption mt-4 font-semibold uppercase tracking-widest text-brand">go deeper</p>
        <h1 className="t-headline mt-1">{story.title}</h1>
        <p className="t-body mt-2 text-deep/80">want more? a mix of things to watch, listen to, read and look at. start with whichever one sounds fun.</p>
        <div className="mt-6">
          <ResourceList items={story.resources} />
        </div>
        <div className="mt-8">
          <Feedback storyId={storyId} userId={userId} />
        </div>
      </div>
    </div>
  );
}

export function Help({ onBack }: { onBack: () => void }) {
  const items: [string, string][] = [
    ["a story", "one short story a day, told as swipeable cards. about five minutes, then four questions."],
    ["the line to say", "the last question asks which line you'd really say about it at a party. the story ends with that line, so you leave with something to say out loud."],
    ["telling someone", "the point of all this. send the line to one person, or just say it. tomorrow we ask once how it went."],
    ["your streak", "how many days in a row you've finished a story. you get one rest day a week, so one missed day won't break it. days with no story never count against you."],
    ["your cool score", "a number out of 100 for the last 7 days (and later 30, 90 and 365). it counts the days you finished a story, and counts more when you also told someone."],
    ["badges", "small marks for things you really did, like finishing a week in a row or telling ten stories. nobody takes them away."],
    ["sample stories", "the stories you see now are samples. we're still fact-checking them, and each one says what's still open."],
    ["plus", "free forever: the daily story, quiz, score, streak and badges. plus adds the full archive and sources behind each story. new accounts get 7 days of plus free, and there is no auto-renewal."],
  ];
  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-8 md:px-8 md:py-12">
        <button className="t-caption underline" onClick={onBack}>
          ← back
        </button>
        <h1 className="t-headline mt-4">
          how it <span className="accent-on-light">works</span>
        </h1>
        <dl className="mt-6 space-y-5">
          {items.map(([t, d]) => (
            <div key={t}>
              <dt className="display text-xl font-bold">{t}</dt>
              <dd className="t-body mt-1 text-deep/85">{d}</dd>
            </div>
          ))}
        </dl>
        <p className="t-body mt-8">
          want to know how the stories are made? <a className="underline" href="/how">read this</a>.
        </p>
      </div>
    </div>
  );
}

export function DeleteAccount({ email, onBack }: { email: string; onBack: () => void }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function go() {
    setBusy(true);
    setErr("");
    const { data, error } = await supabase.functions.invoke("delete-account", { body: { confirm: text } });
    if (error || !data?.ok) {
      setBusy(false);
      setErr(data?.error ?? "we couldn't delete your account. please email us and we'll do it by hand.");
      return;
    }
    await supabase.auth.signOut();
    try {
      localStorage.clear();
    } catch {
      /* ignore */
    }
    window.location.href = "/";
  }

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-xl px-5 py-8 md:py-12">
        <button className="t-caption underline" onClick={onBack}>
          ← back
        </button>
        <h1 className="t-headline mt-4">delete your account</h1>
        <p className="t-body mt-3 text-deep/85">
          this removes <strong>{email}</strong> and everything tied to it: your name and handle, your progress, streak, badges, your plus time, and your usage data. it can&apos;t be undone.
        </p>
        <p className="t-caption mt-3 text-deep/70">
          if you paid for plus, we keep the payment record (without your name) as the law requires. any plus time left is lost.
        </p>
        <label htmlFor="del" className="t-caption mt-6 block font-semibold">
          type <strong>delete</strong> to confirm
        </label>
        <input id="del" className="pill-input mt-1" value={text} onChange={(e) => setText(e.target.value)} autoCapitalize="none" autoCorrect="off" />
        {err && (
          <p className="t-caption mt-3 rounded-[14px] bg-alert px-3 py-2 text-white" role="alert">
            {err}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3">
          <button className="btn btn-deep" onClick={go} disabled={busy || text.trim().toLowerCase() !== "delete"}>
            {busy ? "deleting..." : "delete everything"}
          </button>
          <button className="btn btn-ghost" onClick={onBack}>
            keep my account
          </button>
        </div>
      </div>
    </div>
  );
}
