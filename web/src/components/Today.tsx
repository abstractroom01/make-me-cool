"use client";

import { useState } from "react";
import { stories } from "@/data/stories";
import { curator } from "@/data/curator";
import { allScores, buildTimeline, streaks } from "@/lib/score";
import { isArchived, publishedStories, storyForToday, todayKey } from "@/lib/schedule";
import { weekStrip } from "@/lib/week";
import { downloadIcs } from "@/lib/ics";
import { daysLeft, type PlusState } from "@/lib/billing";
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
  onHelp,
  onDelete,
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
  onHelp: () => void;
  onDelete: () => void;
  onSignOut: () => void;
  children: React.ReactNode;
}) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-20 border-b-2 border-line-soft bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <button onClick={onHome} className="flex items-center gap-2" aria-label="make me cool, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/icon-main.png" alt="" className="h-9 w-9" />
            <span className="display hidden text-xl font-bold sm:inline">make me cool</span>
          </button>
          <div className="relative flex items-center gap-2 md:gap-3">
            <button
              onClick={onPlus}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold ${plus?.active ? "bg-deep text-spark" : "border-2 border-deep text-deep"}`}
            >
              {plus?.active ? (plus.trial ? `plus · ${daysLeft(plus.until)}d left` : "plus ✓") : <>plus<span className="hidden font-medium sm:inline"> · 7 days free</span></>}
            </button>
            {streak > 0 && (
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-spark px-3 py-1.5 text-sm font-bold" aria-label={`${streak} day streak`}>
              <Spark size={18} /> {streak} day<span className="hidden sm:inline"> streak</span>
            </span>
            )}
            {!profile && (
              <a href="#signin" className="whitespace-nowrap text-sm font-bold text-deep underline">
                sign in
              </a>
            )}
            <button
              onClick={onHelp}
              className="display flex h-10 w-10 items-center justify-center rounded-full border-2 border-deep text-lg font-bold text-deep"
              aria-label="how it works"
            >
              ?
            </button>
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
              <div role="menu" className="card-shadow arrive absolute right-0 top-12 w-56 rounded-[14px] border-2 border-line-soft bg-white p-2">
                <p className="px-3 py-2 text-sm text-deep/70">@{profile.handle}</p>
                <button role="menuitem" onClick={() => { setMenu(false); onBadges(); }} className="w-full rounded-[10px] px-3 py-2 text-left font-medium hover:bg-mist">
                  my badges
                </button>
                <button role="menuitem" onClick={() => { setMenu(false); onBilling(); }} className="w-full rounded-[10px] px-3 py-2 text-left font-medium hover:bg-mist">
                  plus and billing
                </button>
                <button role="menuitem" onClick={() => { setMenu(false); onHelp(); }} className="w-full rounded-[10px] px-3 py-2 text-left font-medium hover:bg-mist">
                  how it works
                </button>
                <button role="menuitem" onClick={onSignOut} className="w-full rounded-[10px] px-3 py-2 text-left font-medium hover:bg-mist">
                  sign out
                </button>
                <button role="menuitem" onClick={() => { setMenu(false); onDelete(); }} className="w-full rounded-[10px] px-3 py-2 text-left text-sm text-deep/70 hover:bg-mist">
                  delete my account
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
  onDeeper,
  sharePlays,
  onPlus,
  onExplain,
  onAnswerTold,
  onBadges,
}: {
  profile: Profile | null;
  completions: Completion[];
  plus: PlusState | null;
  onStart: (storyId: string) => void;
  sharePlays: number;
  onBehind: (storyId: string) => void;
  onDeeper: (storyId: string) => void;
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
  const library = publishedStories(today).filter((s) => s.id !== todays.id);
  const toldPrompt = completions
    .filter((c) => c.completed_on < today && (c.told === null || c.told === undefined) && !c.told_answered_at)
    .sort((a, b) => b.completed_on.localeCompare(a.completed_on))[0];
  const toldStory = toldPrompt ? stories.find((s) => s.id === toldPrompt.story_id) : undefined;
  const [asking, setAsking] = useState<"yes" | null>(null);
  const [time, setTime] = useState("08:00");
  const stage = completions.length === 0 ? 0 : completions.length === 1 ? 1 : 2;

  return (
    <main className={`mx-auto grid max-w-6xl gap-8 px-5 py-8 md:px-8 md:py-12 ${stage > 0 ? "lg:grid-cols-[1fr_360px]" : "lg:max-w-3xl"}`}>
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

        {sharePlays > 0 && (
          <p className="mt-6 rounded-[14px] bg-spark p-4 font-semibold" role="status">
            {sharePlays === 1 ? "1 person" : `${sharePlays} people`} played a story from your link. it worked.
          </p>
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
              <details className="mt-2">
                <summary className="t-caption cursor-pointer text-paper/80 underline">what&apos;s still being checked</summary>
                <p className="t-caption mt-1 text-paper/75">{todays.caveat.replace(/^sample story, not yet fact-checked\.\s*/i, "")}</p>
              </details>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="btn btn-yellow" onClick={() => onStart(todays.id)}>
                {todayDone ? "read it again" : "start story"}
              </button>
              <button className="btn btn-ghost !bg-transparent !text-paper !border-paper/40 !shadow-none" onClick={() => onDeeper(todays.id)}>
                go deeper
              </button>
            </div>
            <button className="t-caption mt-3 block underline text-paper/80" onClick={() => onBehind(todays.id)}>
              behind the story {plus?.active ? "" : "(plus)"}
            </button>
            <p className="t-caption mt-3 text-paper/75">about {todays.minutes} minutes · {todays.cards.length} cards · 4 questions</p>
          </div>
        </section>

        <p className="t-caption mt-4 rounded-[14px] border-2 border-line bg-white p-3 text-deep/80">
          these are sample stories. we&apos;re still fact-checking them, and each one lists what&apos;s still open.
        </p>

        {plus?.active && plus.trial && (
          <p className="t-caption mt-4 rounded-[14px] bg-mist p-3" role="status">
            you&apos;re on your free plus trial: {daysLeft(plus.until)} days left. the archive and behind the story are open.
          </p>
        )}

        {!profile && (
          <section id="signin" className="mt-6 rounded-[14px] border-2 border-deep bg-white p-5">
            <p className="t-title">save your score and streak</p>
            <p className="t-body mt-1 text-deep/80">
              right now your progress is saved on this phone only. if you clear your browser data or switch phones, it&apos;s gone. sign in with your email to keep it. free, no password.
            </p>
            <div className="mt-3">
              <SignInForm id="today" />
            </div>
          </section>
        )}

        {stage > 0 && (
          <>
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
                      <Check /> done
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
          </>
        )}

      </div>

      {stage > 0 && (
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
          {scores.slice(1).some((s) => s.unlocked) && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {scores.slice(1).filter((s) => s.unlocked).map((s) => (
              <div key={s.window} className={`rounded-[14px] border-2 p-2 ${s.unlocked ? "border-paper/40" : "border-paper/15 opacity-70"}`}>
                <p className="display text-xl font-bold">{s.unlocked ? s.score : "·"}</p>
                <p className="t-caption text-paper/75">{s.window} day</p>
                {!s.unlocked && <p className="text-[0.65rem] text-paper/60">in {s.unlocksInDays}d</p>}
              </div>
            ))}
          </div>
          )}
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

        {stage > 1 && (
        <section aria-label="your wall of wonders">
          <div className="flex items-baseline justify-between">
            <p className="t-title">your wall of wonders</p>
            <p className="t-caption text-deep/70">
              {doneIds.size} of {stories.length}
            </p>
          </div>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {stories.map((s, k) => {
              const done = doneIds.has(s.id);
              const tone = ["bg-deep text-spark", "bg-brand text-paper", "bg-spark text-deep", "bg-alert text-white"][k % 4];
              return (
                <li key={s.id}>
                  {done ? (
                    <button
                      onClick={() => onStart(s.id)}
                      className={`flex aspect-square w-full flex-col justify-between rounded-[12px] p-2 text-left ${tone}`}
                      aria-label={`${s.title}, finished. play again`}
                    >
                      <Spark size={16} />
                      <span className="display text-[0.8rem] font-bold leading-tight">{s.title.replace(/^the /, "")}</span>
                    </button>
                  ) : (
                    <div className="flex aspect-square items-center justify-center rounded-[12px] border-2 border-dashed border-line text-xl text-deep/40" aria-label="a story still to find">
                      ?
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <button onClick={onBadges} className="t-caption mt-3 underline text-deep/80">
            see my badges
          </button>
        </section>
        )}

        {stage > 1 && (
        <section className="rounded-[14px] border-2 border-line bg-white p-5">
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
        )}
      </aside>
      )}
    </main>
  );
}
