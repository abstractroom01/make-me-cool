"use client";

import { useState } from "react";
import { stories } from "@/data/stories";
import { computeStreak } from "@/lib/streak";
import type { Completion, Profile } from "@/lib/types";
import { Check, Chip, Spark, WeekStrip } from "./ui";

export function AppShell({
  profile,
  streak,
  onHome,
  onSignOut,
  children,
}: {
  profile: Profile;
  streak: number;
  onHome: () => void;
  onSignOut: () => void;
  children: React.ReactNode;
}) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-20 border-b-2 border-[#e3eceb] bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <button onClick={onHome} className="flex items-center gap-2" aria-label="make me cool, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/icon-main.png" alt="" className="h-9 w-9" />
            <span className="display text-xl font-bold">make me cool</span>
          </button>
          <div className="relative flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-spark px-3 py-1.5 text-sm font-bold" aria-label={`${streak} day streak`}>
              <Spark size={18} /> {streak}
            </span>
            <button
              onClick={() => setMenu(!menu)}
              className="display flex h-10 w-10 items-center justify-center rounded-full bg-deep text-lg font-bold uppercase text-spark"
              aria-haspopup="menu"
              aria-expanded={menu}
              aria-label="account menu"
            >
              {profile.name.slice(0, 1)}
            </button>
            {menu && (
              <div role="menu" className="card-shadow arrive absolute right-0 top-12 w-52 rounded-[14px] border-2 border-[#e3eceb] bg-white p-2">
                <p className="px-3 py-2 text-sm text-deep/70">@{profile.handle}</p>
                <button role="menuitem" onClick={onSignOut} className="w-full rounded-[10px] px-3 py-2 text-left font-medium hover:bg-mist">
                  sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export function Today({
  profile,
  completions,
  onStart,
}: {
  profile: Profile;
  completions: Completion[];
  onStart: (storyId: string) => void;
}) {
  const doneIds = new Set(completions.map((c) => c.story_id));
  const info = computeStreak(completions.map((c) => c.completed_on));
  const next = stories.find((s) => !doneIds.has(s.id));
  const totalPoints = completions.reduce((a, c) => a + c.points, 0);
  const rest = stories.filter((s) => s.id !== next?.id);

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:px-8 md:py-12 lg:grid-cols-[1fr_340px]">
      <div className="arrive min-w-0">
        <h1 className="t-headline">
          hi <span className="accent-on-light">{profile.name.toLowerCase()}</span>.
        </h1>
        <p className="t-body mt-2 text-deep/75">
          {info.doneToday ? "today's done. abstract is almost impressed." : "five minutes. one story. let's go."}
        </p>

        {next ? (
          <section className="card-shadow mt-8 overflow-hidden rounded-[14px] bg-deep text-paper" aria-labelledby="next-title">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="yellow">{doneIds.size === 0 ? "start here" : "next up"}</Chip>
                {next.fields.map((f) => (
                  <Chip key={f} tone="light">
                    {f}
                  </Chip>
                ))}
                <Chip tone="light">sample</Chip>
              </div>
              <h2 id="next-title" className="t-headline mt-4">
                {next.title}
              </h2>
              <p className="t-body mt-3 max-w-xl text-paper/85">{next.hook}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button className="btn btn-yellow" onClick={() => onStart(next.id)}>
                  start story
                </button>
                <span className="t-caption text-paper/75">about {next.minutes} minutes · {next.cards.length} cards · 4 questions</span>
              </div>
            </div>
          </section>
        ) : (
          <section className="card-shadow mt-8 rounded-[14px] bg-spark p-6 text-deep md:p-8">
            <h2 className="t-headline">you&apos;ve done the sample pack.</h2>
            <p className="t-body mt-3 max-w-xl">
              all three stories, finished. more arrive every weekday once the app is live. until then, go be insufferable at someone.
            </p>
          </section>
        )}

        <h2 className="t-title mb-3 mt-10">the sample pack</h2>
        <ul className="space-y-3">
          {rest.map((s) => {
            const c = completions.find((x) => x.story_id === s.id);
            return (
              <li key={s.id}>
                <button
                  onClick={() => onStart(s.id)}
                  className="tile flex items-center justify-between gap-4"
                >
                  <span>
                    <span className="display block text-lg font-semibold">{s.title}</span>
                    <span className="t-caption text-deep/70">{s.fields.join(" + ")}</span>
                  </span>
                  {c ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mist px-3 py-1 text-sm font-semibold">
                      <Check /> {c.points} pts
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-spark px-3 py-1 text-sm font-semibold">new</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="t-caption mt-4 text-deep/65">
          these three are sample stories and haven&apos;t been fact-checked yet. real ones are checked against two sources before they go out.
        </p>
      </div>

      <aside className="arrive space-y-5 lg:sticky lg:top-24 lg:self-start" aria-label="your progress">
        <section className="rounded-[14px] bg-deep p-6 text-paper">
          <div className="flex items-center justify-between">
            <p className="t-caption font-semibold uppercase tracking-widest text-spark">your spark</p>
            <Spark size={26} />
          </div>
          <p className="display mt-2 text-6xl font-bold">
            {info.streak}
            <span className="t-title ml-2 font-medium text-paper/80">day{info.streak === 1 ? "" : "s"}</span>
          </p>
          <div className="mt-5">
            <WeekStrip week={info.week} dark />
          </div>
          <p className="t-caption mt-4 text-paper/75">one missed weekday a week is on the house. weekends never count against you.</p>
        </section>
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-[14px] border-2 border-[#cfdcdb] bg-white p-4">
            <p className="display text-3xl font-bold">{totalPoints}</p>
            <p className="t-caption text-deep/70">points</p>
          </div>
          <div className="rounded-[14px] border-2 border-[#cfdcdb] bg-white p-4">
            <p className="display text-3xl font-bold">
              {completions.length}
              <span className="text-lg text-deep/60">/{stories.length}</span>
            </p>
            <p className="t-caption text-deep/70">stories done</p>
          </div>
        </section>
      </aside>
    </main>
  );
}
