"use client";

import { useState } from "react";
import { stories } from "@/data/stories";
import { curator } from "@/data/curator";
import { allScores, buildTimeline, streaks } from "@/lib/score";
import { isArchived, publishedStories, storyForToday, todayKey } from "@/lib/schedule";
import { weekStrip } from "@/lib/week";
import { downloadIcs } from "@/lib/ics";
import type { PlusState } from "@/lib/billing";
import type { Completion, Profile } from "@/lib/types";
import { Check, Chip, Spark, WeekStrip } from "./ui";
import { SignInForm } from "./SignInForm";

export function AppShell({
  profile,
  streak,
  plus,
  onHome,
  onPlus,
  onBilling,
  onBadges,
  onSignOut,
  children,
}: {
  profile: Profile | null;
  streak: number;
  plus: PlusState | null;
  onHome: () => void;
  onPlus: () => void;
  onBilling: () => void;
  onBadges: () => void;
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
          <div className="relative flex items-center gap-2 md:gap-3">
            <button
              onClick={onPlus}
              className={`rounded-full px-3 py-1.5 text-sm font-bold ${plus?.active ? "bg-deep text-spark" : "border-2 border-deep text-deep"}`}
            >
              {plus?.active ? "plus ✓" : "plus"}
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-spark px-3 py-1.5 text-sm font-bold" aria-label={`${streak} day streak`}>
              <Spark size={18} /> {streak}
            </span>
            {profile && (
              <button
                onClick={() => setMenu(!menu)}
                className="display flex h-10 w-10 items-center justify-center rounded-full bg-deep text-lg font-bold uppercase text-spark"
                aria-haspopup="menu"
                aria-expanded={menu}
                aria-label="account menu"
              >
                {profile.name.slice(0, 1)}
              </button>
            )}
            {menu && profile && (
              <div role="menu" className="card-shadow arrive absolute right-0 top-12 w-56 rounded-[14px] border-2 border-[#e3eceb] bg-white p-2">
                <p className="px-3 py-2 text-sm text-deep/70">@{profile.handle}</p>
                <button role="menuitem" onClick={() => { setMenu(false); onBadges(); }} className="w-full rounded-[10px] px-3 py-2 text-left font-medium hover:bg-mist">
                  my badges
                </button>
                <button role="menuitem" onClick={() => { setMenu(false); onBilling(); }} className="w-full rounded-[10px] px-3 py-2 text-left font-medium hover:bg-mist">
                  plus and billing
                </button>
                <button role="menuitem" onClick={onSignOut} className="w-full rounded-[10px] px-3 py-2 text-left font-medium hover:bg-mist">
                  sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {children}
      <footer className="mx-auto max-w-6xl px-5 pb-10 pt-4 text-sm text-deep/70 md:px-8">
        <a className="underline" href="/privacy">privacy</a> · <a className="underline" href="/terms">terms</a> ·{" "}
        <a className="underline" href="/refunds">refunds</a>
      </footer>
    </div>
  );
}

export function Today({
  profile,
  completions,
  plus,
  onStart,
  onBehind,
  onPlus,
  onExplain,
  onAnswerTold,
  onBadges,
}: {
  profile: Profile | null;
  completions: Completion[];
  plus: PlusState | null;
  onStart: (storyId: string) => void;
  onBehind: (storyId: string) => void;
  onPlus: (reason: string) => void;
  onExplain: () => void;
  onAnswerTold: (storyId: string, told: boolean | null, landed?: "laughed" | "asked_more" | "nothing") => void;
  onBadges: () => void;
}) {
  const today = todayKey();
  const { story: todays, published } = storyForToday(today);
  const doneIds = new Set(completions.map((c) => c.story_id));
  const todayDone = completions.some((c) => c.story_id === todays.id);
  const t = buildTimeline(completions, today, profile?.created_at ? profile.created_at.slice(0, 10) : undefined);
  const scores = allScores(t);
  const { current } = streaks(t);
  const totalPoints = completions.reduce((a, c) => a + c.points, 0);
  const library = publishedStories(today).filter((s) => s.id !== todays.id);
  const toldPrompt = completions
    .filter((c) => c.completed_on < today && (c.told === null || c.told === undefined) && !c.told_answered_at)
    .sort((a, b) => b.completed_on.localeCompare(a.completed_on))[0];
  const toldStory = toldPrompt ? stories.find((s) => s.id === toldPrompt.story_id) : undefined;
  const [asking, setAsking] = useState<"yes" | null>(null);
  const [time, setTime] = useState("08:00");

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:px-8 md:py-12 lg:grid-cols-[1fr_360px]">
      <div className="arrive min-w-0">
        <h1 className="t-headline">
          {profile ? (
            <>
              hi <span className="accent-on-light">{profile.name.toLowerCase()}</span>.
            </>
          ) : (
            <>
              today&apos;s <span className="accent-on-light">story</span>
            </>
          )}
        </h1>
        <p className="t-body mt-2 text-deep/75">
          {todayDone ? "today's done. abstract is almost impressed." : "five minutes. one story. something to say out loud."}
        </p>

        {!profile && (
          <section className="mt-6 rounded-[14px] border-2 border-deep bg-white p-5">
            <p className="t-title">save your score and streak</p>
            <p className="t-body mt-1 text-deep/80">you&apos;re playing as a guest. sign in with your email and keep going tomorrow. free, no password.</p>
            <div className="mt-3">
              <SignInForm id="today" />
            </div>
          </section>
        )}

        {toldPrompt && toldStory && (
          <section className="mt-6 rounded-[14px] border-2 border-deep bg-white p-5" aria-label="how did it go">
            <p className="t-caption font-semibold uppercase tracking-widest text-brand">one quick question</p>
            <p className="t-title mt-1">did you tell anyone about &ldquo;{toldStory.title}&rdquo;?</p>
            {asking === "yes" ? (
              <div className="mt-3">
                <p className="t-body text-deep/80">how did it land?</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {([
                    ["laughed", "they laughed"],
                    ["asked_more", "they asked more"],
                    ["nothing", "nothing much"],
                  ] as const).map(([v, l]) => (
                    <button key={v} className="btn btn-ghost !min-h-0 !px-4 !py-2" onClick={() => { setAsking(null); onAnswerTold(toldPrompt.story_id, true, v); }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="btn btn-yellow !min-h-0 !px-5 !py-2" onClick={() => setAsking("yes")}>
                  yes, i told someone
                </button>
                <button className="btn btn-ghost !min-h-0 !px-5 !py-2" onClick={() => onAnswerTold(toldPrompt.story_id, false)}>
                  not this time
                </button>
                <button className="t-caption px-2 underline" onClick={() => onAnswerTold(toldPrompt.story_id, null)}>
                  skip
                </button>
              </div>
            )}
          </section>
        )}

        <section className="card-shadow mt-6 overflow-hidden rounded-[14px] bg-deep text-paper" aria-labelledby="today-title">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="yellow">{published ? "today" : "latest"}</Chip>
              {todays.fields.map((f) => (
                <Chip key={f} tone="light">
                  {f}
                </Chip>
              ))}
              <Chip tone="light">sample</Chip>
            </div>
            <h2 id="today-title" className="t-headline mt-4">
              {todays.title}
            </h2>
            <p className="t-body mt-3 max-w-xl text-paper/85">{todays.hook}</p>

            <div className="mt-5 max-w-xl rounded-[14px] border-2 border-paper/25 p-4">
              <p className="t-caption font-semibold uppercase tracking-widest text-spark">
                picked by {curator.name || "a person at the abstract room"}
              </p>
              <p className="t-body mt-1 text-paper/90">{todays.why}</p>
              <p className="t-caption mt-2 text-paper/75">still being checked: {todays.caveat.replace(/^sample story, not yet fact-checked\.\s*/i, "")}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="btn btn-yellow" onClick={() => onStart(todays.id)}>
                {todayDone ? "read it again" : "start story"}
              </button>
              <button className="btn btn-ghost !bg-transparent !text-paper !border-paper/40 !shadow-none" onClick={() => onBehind(todays.id)}>
                behind the story {plus?.active ? "" : "· plus"}
              </button>
            </div>
            <p className="t-caption mt-3 text-paper/75">about {todays.minutes} minutes · {todays.cards.length} cards · 4 questions</p>
          </div>
        </section>

        <h2 className="t-title mb-3 mt-10">earlier stories</h2>
        <ul className="space-y-3">
          {library.map((s) => {
            const c = completions.find((x) => x.story_id === s.id);
            const locked = isArchived(s, today) && !plus?.active;
            return (
              <li key={s.id}>
                <button onClick={() => (locked ? onPlus("archive") : onStart(s.id))} className="tile flex items-center justify-between gap-4">
                  <span>
                    <span className="display block text-lg font-semibold">{s.title}</span>
                    <span className="t-caption text-deep/70">{s.fields.join(" + ")}</span>
                  </span>
                  {locked ? (
                    <span className="shrink-0 rounded-full bg-deep px-3 py-1 text-sm font-semibold text-spark">plus</span>
                  ) : c ? (
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
          {library.length === 0 && <li className="t-body text-deep/70">nothing earlier yet. you&apos;re at the start.</li>}
        </ul>
        <p className="t-caption mt-4 text-deep/65">
          these are sample stories and haven&apos;t been fact-checked yet. real ones are checked against two sources before they go out.
        </p>
      </div>

      <aside className="arrive space-y-5 lg:sticky lg:top-24 lg:self-start" aria-label="your progress">
        <section className="rounded-[14px] bg-deep p-6 text-paper">
          <div className="flex items-center justify-between">
            <p className="t-caption font-semibold uppercase tracking-widest text-spark">your cool score · 7 days</p>
            <Spark size={26} />
          </div>
          <p className="display mt-2 text-6xl font-bold">{scores[0].score}</p>
          <button className="t-caption mt-1 underline text-paper/80" onClick={onExplain}>
            how is this calculated?
          </button>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {scores.slice(1).map((s) => (
              <div key={s.window} className={`rounded-[14px] border-2 p-2 ${s.unlocked ? "border-paper/40" : "border-paper/15 opacity-70"}`}>
                <p className="display text-xl font-bold">{s.unlocked ? s.score : "·"}</p>
                <p className="t-caption text-paper/75">{s.window} day</p>
                {!s.unlocked && <p className="text-[0.65rem] text-paper/60">in {s.unlocksInDays}d</p>}
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-end justify-between">
            <p className="display text-4xl font-bold">
              {current}
              <span className="t-title ml-2 font-medium text-paper/80">day streak</span>
            </p>
          </div>
          <div className="mt-4">
            <WeekStrip week={weekStrip(t)} dark />
          </div>
          <p className="t-caption mt-4 text-paper/75">one rest day a week is on the house. a day with no story never counts against you.</p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-[14px] border-2 border-[#cfdcdb] bg-white p-4">
            <p className="display text-3xl font-bold">{totalPoints}</p>
            <p className="t-caption text-deep/70">points</p>
          </div>
          <button onClick={onBadges} className="rounded-[14px] border-2 border-[#cfdcdb] bg-white p-4 text-left">
            <p className="display text-3xl font-bold">
              {doneIds.size}
              <span className="text-lg text-deep/60">/{stories.length}</span>
            </p>
            <p className="t-caption text-deep/70">stories · see badges</p>
          </button>
        </section>

        <section className="rounded-[14px] border-2 border-[#cfdcdb] bg-white p-5">
          <p className="t-title">a daily reminder</p>
          <p className="t-caption mt-1 text-deep/70">adds a repeating event to your phone&apos;s calendar. no app permissions needed.</p>
          <div className="mt-3 flex items-center gap-2">
            <label htmlFor="rt" className="sr-only">
              reminder time
            </label>
            <input id="rt" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="pill-input !w-32 !py-2" />
            <button className="btn btn-ghost !min-h-0 !px-4 !py-2" onClick={() => downloadIcs(time)}>
              add it
            </button>
          </div>
        </section>
      </aside>
    </main>
  );
}
