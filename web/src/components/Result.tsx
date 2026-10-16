"use client";

import { useState } from "react";
import { stories } from "@/data/stories";
import { computeStreak } from "@/lib/streak";
import type { Completion } from "@/lib/types";
import { Chip, Spark, WeekStrip } from "./ui";

export function Result({
  storyId,
  correct,
  total,
  points,
  completions,
  onNext,
  onHome,
}: {
  storyId: string;
  correct: number;
  total: number;
  points: number;
  completions: Completion[];
  onNext: (id: string) => void;
  onHome: () => void;
}) {
  const story = stories.find((s) => s.id === storyId)!;
  const info = computeStreak(completions.map((c) => c.completed_on));
  const nextStory = stories.find((s) => !completions.some((c) => c.story_id === s.id));
  const [copied, setCopied] = useState(false);
  const perfect = correct === total;

  async function copy() {
    try {
      await navigator.clipboard.writeText(story.takeaway);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

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
          <p className="t-body mt-4 max-w-md text-paper/85">
            {perfect ? "abstract has nothing snarky to say. enjoy it, it won't last." : "you can now say something about this at a party. use it before it fades."}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
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
              <p className="display text-3xl font-bold">{info.streak}</p>
              <p className="t-caption text-deep/80">day spark</p>
            </div>
          </div>
          <div className="mt-6 rounded-[14px] border-2 border-paper/20 p-4">
            <WeekStrip week={info.week} dark />
          </div>
          <p className="t-caption mt-4 text-paper/75">
            your cool score starts at 0 today. it grows when you recall this story later.
          </p>
        </div>

        <div className="arrive space-y-5">
          <section className="card-shadow rounded-[14px] bg-spark p-7 text-deep">
            <Chip tone="deep">say it out loud</Chip>
            <p className="display mt-4 text-3xl font-bold leading-tight md:text-4xl">&ldquo;{story.takeaway}&rdquo;</p>
            <p className="t-body mt-4 text-deep/85">{story.starter}</p>
            <button className="btn btn-deep mt-5" onClick={copy}>
              {copied ? "copied!" : "copy the line"}
            </button>
          </section>
          <section className="rounded-[14px] bg-paper p-5 text-deep">
            <p className="t-caption font-semibold uppercase tracking-widest text-brand">read more</p>
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
