"use client";

import { stories } from "@/data/stories";
import { ResourceList } from "./Resources";
import { Feedback } from "./Feedback";
import { BADGES, allScores, buildTimeline, coolerMoment, streaks } from "@/lib/score";
import { todayKey } from "@/lib/schedule";
import type { Completion } from "@/lib/types";
import { Spark, WeekStrip } from "./ui";
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
  userId,
  onDeeper,
  onExplain,
  onNext,
  onHome,
}: {
  userId?: string;
  onDeeper: () => void;
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
  const unlocked = scores.filter((s) => s.unlocked);
  const { current } = streaks(t);
  const moment = coolerMoment(before, after);
  const nextStory = stories.find((s) => s.publishDate <= today && !completions.some((c) => c.story_id === s.id));
  const perfect = correct === total;
  const earned = BADGES.filter((b) => newBadges.includes(b.id));
  const finishedDays = new Set(completions.map((c) => c.completed_on)).size;

  return (
    <main className="min-h-dvh bg-deep text-paper">
      <div className="arrive mx-auto max-w-xl px-5 py-10">
        {/* 1. the moment */}
        <div className="pop inline-block">
          <Spark size={56} />
        </div>
        <h1 className="t-headline mt-3">
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
          <p className="t-title mt-2 text-spark">today you became {moment.value}% cooler.</p>
        ) : (
          <p className="t-title mt-2 text-spark">{current} day streak</p>
        )}

        {/* 2. the line to say: the whole point */}
        <section className="card-shadow mt-6 rounded-[14px] bg-spark p-6 text-deep">
          <p className="t-caption font-semibold uppercase tracking-widest">say it out loud</p>
          <p className="display mt-2 text-3xl font-bold leading-tight">&ldquo;{story.takeaway}&rdquo;</p>
          <p className="t-body mt-3 text-deep/85">{story.starter}</p>
        </section>

        {/* 3. a quiet scoreboard */}
        <section className="mt-6 rounded-[14px] border-2 border-paper/25 p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="display text-3xl font-bold">{unlocked[0]?.score ?? 0}</p>
              <p className="t-caption text-paper/75">cool score</p>
            </div>
            <div>
              <p className="display text-3xl font-bold">
                {correct}/{total}
              </p>
              <p className="t-caption text-paper/75">right</p>
            </div>
            <div>
              <p className="display text-3xl font-bold">{current}</p>
              <p className="t-caption text-paper/75">day streak</p>
            </div>
          </div>
          {finishedDays >= 2 && (
            <div className="mt-4">
              <WeekStrip week={weekStrip(t)} dark />
            </div>
          )}
          {unlocked.length > 1 && (
            <p className="t-caption mt-3 text-center text-paper/75">
              {unlocked
                .slice(1)
                .map((s) => `${s.window}-day ${s.score}`)
                .join(" · ")}
            </p>
          )}
          <button className="t-caption mt-3 block w-full text-center underline text-paper/80" onClick={onExplain}>
            how is the cool score worked out?
          </button>
        </section>

        {earned.length > 0 && (
          <div className="pop mt-4 rounded-[14px] bg-paper p-4 text-deep">
            <p className="t-caption font-semibold uppercase tracking-widest text-brand">new badge</p>
            {earned.map((b) => (
              <p key={b.id} className="display mt-1 text-xl font-bold">
                {b.name} <span className="t-caption font-normal text-deep/75">· {b.how}</span>
              </p>
            ))}
          </div>
        )}

        {/* 3b. go deeper: not just articles */}
        <section className="mt-6" aria-label="go deeper">
          <p className="t-title">want more of this one?</p>
          <div className="mt-3">
            <ResourceList items={story.resources.slice(0, 2)} dark />
          </div>
          <button className="btn btn-ghost mt-3 w-full" onClick={onDeeper}>
            see all {story.resources.length} (watch, listen, read)
          </button>
        </section>

        <div className="mt-6">
          <Feedback storyId={storyId} userId={userId} dark />
        </div>

        {/* 4. save it (guests only) */}
        {guest && (
          <section className="mt-6 rounded-[14px] bg-paper p-5 text-deep">
            <p className="t-title">keep your score</p>
            <p className="t-body mt-1 text-deep/80">sign in free and keep your streak going tomorrow. new accounts also get 7 days of plus free.</p>
            <div className="mt-3">
              <SignInForm id="result" />
            </div>
          </section>
        )}

        {/* 5. what's next */}
        <div className="mt-6 flex flex-col gap-3">
          {nextStory && (
            <button className="btn btn-yellow" onClick={() => onNext(nextStory.id)}>
              next story
            </button>
          )}
          <button className={`btn ${nextStory ? "btn-ghost" : "btn-yellow"}`} onClick={onHome}>
            back to today
          </button>
        </div>

        {/* 6. the small print, folded away */}
        <details className="mt-8 text-paper/85">
          <summary className="t-caption cursor-pointer underline">where this came from</summary>
          <ul className="mt-2 space-y-1">
            {story.sources.map((s) => (
              <li key={s.url}>
                <a className="underline" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="t-caption mt-2 text-paper/70">{story.caveat}</p>
        </details>
        <p className="t-caption mt-6 text-paper/70">see you tomorrow.</p>
      </div>
    </main>
  );
}
