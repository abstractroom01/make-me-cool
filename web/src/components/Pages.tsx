"use client";

import { useEffect, useState } from "react";
import { stories } from "@/data/stories";
import { supabase } from "@/lib/supabase";
import { track } from "@/lib/analytics";
import { BADGES, earnedBadges } from "@/lib/score";
import { todayKey } from "@/lib/schedule";
import type { PlusState } from "@/lib/billing";
import type { Completion } from "@/lib/types";
import { Check, Chip } from "./ui";

export function Badges({ completions, onBack }: { completions: Completion[]; onBack: () => void }) {
  const earned = earnedBadges(completions, todayKey());
  const groups = [...new Set(BADGES.map((b) => b.group))];
  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
        <button className="t-caption underline" onClick={onBack}>
          ← back
        </button>
        <h1 className="t-headline mt-4">
          your <span className="accent-on-light">badges</span>
        </h1>
        <p className="t-body mt-2 text-deep/80">they mark things you really did. nobody takes them away.</p>
        {groups.map((g) => (
          <section key={g} className="mt-8">
            <h2 className="t-caption font-semibold uppercase tracking-widest text-brand">{g}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {BADGES.filter((b) => b.group === g).map((b) => {
                const has = earned.has(b.id);
                return (
                  <li key={b.id} className={`rounded-[14px] border-2 p-4 ${has ? "border-deep bg-spark" : "border-[#cfdcdb] bg-white opacity-80"}`}>
                    <p className="display flex items-center gap-2 text-lg font-bold">{has && <Check />} {b.name}</p>
                    <p className="t-caption mt-1 text-deep/80">{b.how}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Explain({ onBack }: { onBack: () => void }) {
  useEffect(() => track("score_explained_opened"), []);
  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-8 md:px-8 md:py-12">
        <button className="t-caption underline" onClick={onBack}>
          ← back
        </button>
        <h1 className="t-headline mt-4">
          how your <span className="accent-on-light">cool score</span> works
        </h1>
        <div className="t-body mt-4 space-y-4 text-deep/90">
          <p>
            it&apos;s a rate, not a streak. it looks back over the last 7, 30, 90 or 365 days and asks two things for each day a story was published:
            did you finish it, and did you tell someone?
          </p>
          <p>
            the score is out of 100. <strong>70%</strong> comes from days you finished, and <strong>30%</strong> from days you told someone. so
            3 of the last 7 days finished and none told is 30. finish today and it&apos;s 4 of 7, which is 40. that&apos;s a 33% rise, and that&apos;s the
            &ldquo;you became 33% cooler&rdquo; moment.
          </p>
          <p>
            one missed day a week is forgiven (it just doesn&apos;t count), and days with no published story never count against you. the 30, 90 and 365 day
            scores unlock once you&apos;ve been around that long.
          </p>
          <p>
            the score can go down. when it does, we won&apos;t say you lost something. it recovers the moment you finish the next story.
          </p>
          <p className="t-caption text-deep/65">the 70 / 30 split is our best guess for now, and we&apos;ll adjust it as we learn what actually helps.</p>
        </div>
      </div>
    </div>
  );
}

type Extra = { curator_cut: string; source_notes: string; rabbit_holes: { label: string; url: string }[] };

export function Behind({
  storyId,
  userId,
  plus,
  onBack,
  onPlus,
}: {
  storyId: string;
  userId?: string;
  plus: PlusState | null;
  onBack: () => void;
  onPlus: () => void;
}) {
  const story = stories.find((s) => s.id === storyId)!;
  const [extra, setExtra] = useState<Extra | null | undefined>(undefined);

  useEffect(() => {
    if (!plus?.active) {
      track("paywall_viewed", { surface: "behind" }, userId);
      return;
    }
    track("plus_feature_used", { feature: "behind" }, userId);
    supabase
      .from("story_extras")
      .select("curator_cut,source_notes,rabbit_holes")
      .eq("story_id", storyId)
      .maybeSingle()
      .then(({ data }) => setExtra((data as Extra) ?? null));
  }, [plus?.active, storyId, userId]);

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-8 md:px-8 md:py-12">
        <button className="t-caption underline" onClick={onBack}>
          ← back
        </button>
        <Chip tone="yellow">behind the story · plus</Chip>
        <h1 className="t-headline mt-3">{story.title}</h1>

        {!plus?.active ? (
          <section className="mt-6 rounded-[14px] bg-deep p-6 text-paper">
            <p className="display text-2xl font-bold">this part is plus</p>
            <p className="t-body mt-2 text-paper/85">
              the sources behind this story, what&apos;s still being checked, and where to go deeper. the story itself is always free.
            </p>
            <button className="btn btn-yellow mt-4" onClick={onPlus}>
              see plus
            </button>
          </section>
        ) : extra === undefined ? (
          <p className="t-body mt-6 text-deep/70">loading...</p>
        ) : extra === null ? (
          <p className="t-body mt-6 text-deep/70">we&apos;re still writing this one up.</p>
        ) : (
          <div className="mt-6 space-y-6">
            <section>
              <h2 className="t-title">what&apos;s still being checked</h2>
              <p className="t-body mt-2 whitespace-pre-line text-deep/90">{extra.curator_cut}</p>
            </section>
            <section>
              <h2 className="t-title">where this came from</h2>
              <p className="t-body mt-2 whitespace-pre-line text-deep/90">{extra.source_notes}</p>
            </section>
            {extra.rabbit_holes.length > 0 && (
              <section>
                <h2 className="t-title">go deeper</h2>
                <ul className="mt-2 space-y-2">
                  {extra.rabbit_holes.map((r) => (
                    <li key={r.url}>
                      <a className="underline" href={r.url} target="_blank" rel="noopener noreferrer">
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
