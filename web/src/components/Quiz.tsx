"use client";

import { useEffect, useState } from "react";
import { getProgress, saveProgress } from "@/lib/progress";
import type { Question, Story } from "@/data/stories";
import { Check, Steps } from "./ui";
import { checkFill } from "@/lib/answers";

const goodLines = ["nicely done!", "see, you knew that.", "okay, we're almost impressed.", "fine. that was good."];
const badLines = ["not quite. no judgement. (some.)", "not this time.", "bold answer. wrong, but bold."];

function isRight(q: Question, picked: number | null, typed: string): boolean {
  if (q.type === "fill") return checkFill(typed, q.answer) !== "wrong";
  return picked === q.answer;
}

export function Quiz({
  story,
  onFinish,
  onClose,
}: {
  story: Story;
  onFinish: (correct: number, total: number, marks: boolean[]) => void;
  onClose: () => void;
}) {
  const saved = getProgress(story.id)?.q;
  const [i, setI] = useState(saved?.i ?? 0);
  const [picked, setPicked] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(saved?.correct ?? 0);
  const [marks, setMarks] = useState<boolean[]>(saved?.marks ?? []);

  const q = story.quiz[i];
  const total = story.quiz.length;
  const right = checked && isRight(q, picked, typed);
  const ready = q.type === "fill" ? typed.trim().length > 0 : picked !== null;
  const options = q.type === "fill" ? [] : q.options;

  function skip() {
    setChecked(true);
  }

  function leave() {
    onClose(); // answers so far are kept, so leaving costs nothing
  }

  function check() {
    const ok = isRight(q, picked, typed);
    if (ok) setCorrect((c) => c + 1);
    setChecked(true);
  }

  function next() {
    const m = [...marks, right];
    if (i + 1 >= total) return onFinish(correct, total, m);
    setMarks(m);
    saveProgress(story.id, { q: { i: i + 1, correct, marks: m } });
    setI(i + 1);
    setPicked(null);
    setTyped("");
    setChecked(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "BUTTON" || tag === "A") return;
      e.preventDefault();
      if (checked) next();
      else if (ready) check();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const praise = (right ? goodLines : badLines)[(i + (right ? 1 : 2)) % (right ? goodLines.length : badLines.length)];
  const answerText = q.type === "fill" ? q.answer[0] : q.options[q.answer];
  const closeFill = checked && q.type === "fill" && checkFill(typed, q.answer) === "close";

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 py-5 pb-48 md:max-w-2xl md:py-8">
        <div className="flex items-center gap-4">
          <button onClick={leave} className="rounded-full p-2 text-deep hover:bg-mist" aria-label="leave quiz">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#d8e4e3]" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={i + (checked ? 1 : 0)} aria-label="quiz progress">
            <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${((i + (checked ? 1 : 0)) / total) * 100}%` }} />
          </div>
        </div>

        <div className="mt-3">
          <Steps current={2} />
        </div>

        <div key={i} className="arrive mt-8 flex-1">
          <p className="t-caption font-semibold uppercase tracking-widest text-brand-ink">
            {q.type === "line" ? "what would you say?" : q.type === "fill" ? "fill the gap" : `question ${i + 1} of ${total}`}
          </p>
          <h1 className="t-headline mt-2 !text-[1.75rem] md:!text-[2.25rem]">{q.type === "fill" ? q.prompt : q.prompt}</h1>

          {q.type === "fill" ? (
            <div className="mt-6">
              <p className="t-title leading-relaxed">
                {q.before}{" "}
                <input
                  className="pill-input !inline-block !w-52 !min-h-0 !py-1.5 text-center align-middle"
                  value={typed}
                  disabled={checked}
                  onChange={(e) => setTyped(e.target.value)}
                  aria-label="your answer"
                  placeholder="one word"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoFocus
                />{" "}
                {q.after}
              </p>
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {options.map((o, k) => {
                const state = !checked ? (picked === k ? "selected" : "idle") : k === q.answer ? "right" : picked === k ? "wrong" : "idle";
                return (
                  <li key={k}>
                    <button className="tile" data-state={state} disabled={checked} onClick={() => setPicked(k)} aria-pressed={picked === k}>
                      <span className="flex items-start gap-3">
                        <span className="display flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-current text-sm font-bold">
                          {String.fromCharCode(97 + k)}
                        </span>
                        <span>{o}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {!checked && (
            <button className="t-body mt-5 underline text-deep/70" onClick={skip}>
              i&apos;m not sure. show me the answer
            </button>
          )}
        </div>
      </div>

      {/* bottom sheet: check, then feedback */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t-2 ${
          checked ? (right ? "sheet border-[#b9d8d6] bg-mist" : "sheet border-[#f3c4bf] bg-[#fdeceb]") : "border-line-soft bg-paper"
        }`}
      >
        <div className="mx-auto flex max-w-xl flex-col gap-3 px-5 py-4 md:max-w-2xl md:flex-row md:items-center md:justify-between md:py-6">
          {checked ? (
            <>
              <div role="status" aria-live="polite">
                <p className={`display flex items-center gap-2 text-2xl font-bold ${right ? "text-deep" : "text-[#a62f25]"}`}>
                  {right && <Check />} {closeFill ? "close enough! that counts." : praise}
                </p>
                <p className="t-body text-deep/85">
                  {(closeFill || !right) && (
                    <>
                      the answer: <strong>{answerText}</strong>.{" "}
                    </>
                  )}
                  {q.why}
                </p>
              </div>
              <button className={`btn md:min-w-44 ${right ? "btn-deep" : "btn-deep"}`} onClick={next}>
                {i + 1 >= total ? "see my result" : "continue"}
              </button>
            </>
          ) : (
            <button className="btn btn-yellow w-full md:ml-auto md:w-56" disabled={!ready} onClick={check}>
              check
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
