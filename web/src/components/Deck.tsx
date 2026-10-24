"use client";

import { useEffect, useRef, useState } from "react";
import type { Card, Story } from "@/data/stories";
import { Chip, Steps } from "./ui";
import { Visual } from "./Visual";
import { getProgress, saveProgress } from "@/lib/progress";

const face: Record<Card["kind"], string> = {
  scene: "bg-deep text-paper",
  explain: "bg-white text-deep border-2 border-line",
  say: "bg-spark text-deep",
  crew: "bg-brand-ink text-white",
};

export function Deck({ story, onDone, onClose }: { story: Story; onDone: () => void; onClose: () => void }) {
  const [i, setI] = useState(() => Math.min(getProgress(story.id)?.card ?? 0, story.cards.length - 1));
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const last = i === story.cards.length - 1;
  const card = story.cards[i];

  function go(delta: number) {
    const n = i + delta;
    if (n < 0) return;
    if (n >= story.cards.length) return onDone();
    setI(n);
  }

  useEffect(() => {
    saveProgress(story.id, { card: i });
  }, [story.id, i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function down(e: React.PointerEvent) {
    startX.current = e.clientX;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent) {
    if (startX.current === null) return;
    setDx(e.clientX - startX.current);
  }
  function up() {
    if (startX.current === null) return;
    const moved = dx;
    startX.current = null;
    setDragging(false);
    setDx(0);
    if (moved < -70) go(1);
    else if (moved > 70) go(-1);
  }

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 py-5 md:max-w-2xl md:py-8 lg:max-w-4xl">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="rounded-full p-2 text-deep hover:bg-mist" aria-label="close story">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex flex-1 gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={story.cards.length} aria-valuenow={i + 1} aria-label="card progress">
            {story.cards.map((_, k) => (
              <span key={k} className={`h-2.5 flex-1 rounded-full ${k <= i ? "bg-brand" : "bg-[#d8e4e3]"}`} />
            ))}
          </div>
        </div>

        <div className="mt-3">
          <Steps current={1} />
        </div>
        <p className="t-caption mt-2 text-deep/70">your place is saved. close this and pick up later.</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {story.fields.map((f) => (
            <Chip key={f}>{f}</Chip>
          ))}
        </div>

        <div className="my-5 flex flex-1 items-center justify-center">
         <div className="relative w-full">
          {/* the next card peeking behind, for the swipe feel */}
          {!last && (
            <div
              aria-hidden="true"
              className={`absolute inset-0 rounded-[14px] opacity-70 ${face[story.cards[i + 1].kind]}`}
              style={{ transform: "translateY(10px) scale(0.95) rotate(1.5deg)" }}
            />
          )}
          <div
            key={i}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            style={{
              transform: `translateX(${dx}px) rotate(${dx / 28}deg)`,
              transition: dragging ? "none" : "transform 0.2s ease-out",
              touchAction: "pan-y",
            }}
            className={`card-shadow relative flex min-h-[420px] w-full cursor-grab select-none flex-col justify-between rounded-[14px] p-7 md:min-h-[460px] md:p-10 lg:min-h-[500px] lg:p-12 ${face[card.kind]} ${dragging ? "" : "arrive"}`}
            aria-live="polite"
          >
            <span
              className={`t-caption inline-flex w-fit rounded-full px-3 py-1 font-semibold uppercase tracking-widest ${
                card.kind === "scene" ? "bg-spark text-deep" : card.kind === "say" ? "bg-deep text-spark" : card.kind === "crew" ? "bg-white text-deep" : "bg-deep text-paper"
              }`}
            >
              {card.tag}
            </span>
            <div className={`my-4 space-y-5 ${card.visual ? "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:space-y-0" : ""}`}>
              {card.visual && <Visual id={card.visual} />}
              <p
                className={`display font-semibold leading-[1.15] ${
                  card.visual || card.text.length > 150
                    ? "text-[1.35rem] md:text-[1.75rem] lg:text-[2rem]"
                    : "text-[1.9rem] md:text-[2.5rem] lg:text-[3rem]"
                }`}
              >
                {card.text}
              </p>
            </div>
            <span className="t-caption opacity-70">
              {i + 1} / {story.cards.length}
              {i === 0 && " · swipe or tap next"}
            </span>
          </div>
         </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn btn-ghost" onClick={() => go(-1)} disabled={i === 0} aria-label="previous card">
            back
          </button>
          <button className="btn btn-yellow flex-1" onClick={() => go(1)}>
            {last ? "take the quiz" : "next"}
          </button>
        </div>
      </div>
    </div>
  );
}
