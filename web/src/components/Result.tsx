"use client";

import { stories } from "@/data/stories";
import { curator } from "@/data/curator";
import { BADGES, allScores, buildTimeline, coolerMoment, streaks } from "@/lib/score";
import { todayKey } from "@/lib/schedule";
import type { Completion } from "@/lib/types";
import { Chip, Spark, WeekStrip } from "./ui";
import { SignInForm } from "./SignInForm";
import { weekStrip } from "@/lib/week";

export function Result({
  storyId,
  correct,
  total,
  points,
  before,
  after,
  newBadges,
  completions,
  guest,
  onExplain,
  onNext,
  onHome,
}: {
  storyId: string;
  correct: number;
  total: number;
  points: number;
  before: number;
  after: number;
  newBadges: string[];
  completions: Completion[];
  guest: boolean;
  onExplain: () => void;
  onNext: (id: string) => void;
  onHome: () => void;
}) {
  const story = stories.find((s) => s.id === storyId)!;
  const today = todayKey();
  const t = buildTimeline(completions, today);
  const scores = allScores(t);
  const { current } = streaks(t);
  const moment = coolerMoment(before, after);
  const nextStory = stories.find((s) => s.publishDate <= today && !completions.some((c) => c.story_id === s.id));
  const perfect = correct === total;
  const earned = BADGES.filter((b) => newBadges.includes(b.id));

  return (
    <main className="min-h-dvh bg-deep text-paper">
      <div className="mx-auto grid min-h-dvh max-w-5xl items-center gap-8 px-5 py-10 md:px-8 lg:grid-cols-2">
        <div className="arrive">
          <div className="pop inline-block">
            <Spark size={72} />
          </div>
          <h1 className="t-display mt-4">
            {perfect ? (
              <>
                flawless. <span className="accent-on-deep">obviously.</span>
              </>
            ) : (
              <>
                story <span className="accent-on-deep">done!</span>
              </>
            )}
          </h1>

          {moment.kind === "percent" ? (
            <p className="t-title mt-4 text-spark">
              today you became {moment.value}% cooler. <span className="text-paper/80">({before} → {after})</span>
            </p>
          ) : (
            <p className="t-title mt-4 text-spark">
              your 7-day cool score: {before !== after ? `${before} → ${after}` : after}
            </p>
          )}
          <button className="t-caption mt-1 underline text-paper/80" onClick={onExplain}>
            how is this calculated?
          </button>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[14px] bg-paper p-4 text-deep">
              <p className="display text-3xl font-bold">+{points}</p>
              <p className="t-caption text-deep/70">points</p>
            </div>
            <div className="rounded-[14px] bg-paper p-4 text-deep">
              <p className="display text-3xl font-bold">
                {correct}/{total}
              </p>
              <p className="t-caption text-deep/70">right</p>
            </div>
            <div className="rounded-[14px] bg-spark p-4 text-deep">
              <p className="display text-3xl font-bold">{current}</p>
              <p className="t-caption text-deep/80">day streak</p>
            </div>
          </div>

          <div className="mt-5 rounded-[14px] border-2 border-paper/20 p-4">
            <WeekStrip week={weekStrip(t)} dark />
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2 text-center">
            {scores.map((s) => (
              <div key={s.window} className={`rounded-[14px] border-2 p-3 ${s.unlocked ? "border-paper/40" : "border-paper/15 opacity-70"}`}>
                <p className="display text-2xl font-bold">{s.unlocked ? s.score : "·"}</p>
                <p className="t-caption text-paper/75">{s.window} day</p>
                {!s.unlocked && <p className="text-[0.65rem] text-paper/60">in {s.unlocksInDays}d</p>}
              </div>
            ))}
          </div>

          {earned.length > 0 && (
            <div className="pop mt-5 rounded-[14px] bg-spark p-4 text-deep">
              <p className="t-caption font-semibold uppercase tracking-widest">new badge</p>
              {earned.map((b) => (
                <p key={b.id} className="display mt-1 text-xl font-bold">
                  {b.name} <span className="t-caption font-normal text-deep/75">· {b.how}</span>
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="arrive space-y-5">
          <section className="card-shadow rounded-[14px] bg-spark p-7 text-deep">
            <Chip tone="deep">say it out loud</Chip>
            <p className="display mt-4 text-3xl font-bold leading-tight md:text-4xl">&ldquo;{story.takeaway}&rdquo;</p>
            <p className="t-body mt-4 text-deep/85">{story.starter}</p>
          </section>

          {guest && (
            <section className="rounded-[14px] bg-paper p-5 text-deep">
              <p className="t-title">keep your score</p>
              <p className="t-body mt-1 text-deep/80">save it, and keep your streak going tomorrow. it&apos;s free, and there&apos;s no password.</p>
              <div className="mt-3">
                <SignInForm id="result" />
              </div>
            </section>
          )}

          <section className="rounded-[14px] bg-paper p-5 text-deep">
            <p className="t-caption font-semibold uppercase tracking-widest text-brand">where this came from</p>
            <ul className="mt-2 space-y-1">
              {story.sources.map((s) => (
                <li key={s.url}>
                  <a className="underline" href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="t-caption mt-3 text-deep/65">{story.caveat}</p>
          </section>

          <section className="rounded-[14px] border-2 border-paper/25 p-5">
            <p className="t-caption font-semibold uppercase tracking-widest text-spark">from the curator</p>
            <p className="t-body mt-1 text-paper/90">
              see you tomorrow{curator.name ? `. ${curator.name}` : ""}
            </p>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            {nextStory && (
              <button className="btn btn-yellow flex-1" onClick={() => onNext(nextStory.id)}>
                next story
              </button>
            )}
            <button className="btn btn-ghost flex-1" onClick={onHome}>
              back to today
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
