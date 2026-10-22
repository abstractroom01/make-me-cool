"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { anonId } from "@/lib/analytics";

const upReasons = ["made me curious", "easy to follow", "a good line to say"];
const downReasons = ["too hard to follow", "too long", "boring", "something felt wrong", "too many unexplained terms"];

function Thumb({ up }: { up: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={up ? undefined : { transform: "rotate(180deg)" }}>
      <path d="M7 11v9H4v-9zM7 11l4-8c1.7 0 3 1.3 3 3v3h5a2 2 0 0 1 2 2.2l-1 6.6A2 2 0 0 1 18 20H7" />
    </svg>
  );
}

async function send(row: Record<string, unknown>, userId?: string) {
  try {
    await supabase.from("story_feedback").insert({ ...row, user_id: userId ?? null, anon_id: anonId() });
  } catch {
    /* feedback must never break the app */
  }
}

/** "did you like it?" and "spot a mistake?", saved for the curator to read. dark = shown on the teal result screen. */
export function Feedback({ storyId, userId, dark = false }: { storyId: string; userId?: string; dark?: boolean }) {
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [mistake, setMistake] = useState(false);
  const [note, setNote] = useState("");
  const [noteSent, setNoteSent] = useState(false);

  const muted = dark ? "text-paper/75" : "text-deep/70";
  const chip = (on: boolean) =>
    `rounded-full border-2 px-3 py-1.5 text-sm font-medium ${
      on ? (dark ? "border-spark bg-spark text-deep" : "border-deep bg-deep text-spark") : dark ? "border-paper/40 text-paper" : "border-line bg-white text-deep"
    }`;

  async function submit() {
    setSent(true);
    await send({ story_id: storyId, kind: "rating", rating, reasons }, userId);
  }

  async function submitNote() {
    if (!note.trim()) return;
    setNoteSent(true);
    await send({ story_id: storyId, kind: "mistake", note: note.trim().slice(0, 500) }, userId);
  }

  return (
    <section className={`rounded-[14px] border-2 p-5 ${dark ? "border-paper/25" : "border-line bg-white"}`} aria-label="your feedback">
      {sent ? (
        <p className="t-body" role="status">
          thanks. the person who picks these stories reads every answer.
        </p>
      ) : (
        <>
          <p className="t-title">did you like this one?</p>
          <div className="mt-3 flex gap-3">
            {(["up", "down"] as const).map((r) => (
              <button
                key={r}
                className={`btn !min-h-0 !px-5 !py-2.5 ${rating === r ? "btn-yellow" : dark ? "btn-ghost" : "btn-ghost"}`}
                onClick={() => {
                  setRating(r);
                  setReasons([]);
                }}
                aria-pressed={rating === r}
                aria-label={r === "up" ? "yes, i liked it" : "no, i didn't like it"}
              >
                <Thumb up={r === "up"} /> {r === "up" ? "yes" : "not really"}
              </button>
            ))}
          </div>
          {rating && (
            <div className="arrive mt-4">
              <p className={`t-caption ${muted}`}>{rating === "up" ? "what worked? (optional)" : "what was off? (optional)"}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(rating === "up" ? upReasons : downReasons).map((x) => (
                  <button
                    key={x}
                    className={chip(reasons.includes(x))}
                    aria-pressed={reasons.includes(x)}
                    onClick={() => setReasons((cur) => (cur.includes(x) ? cur.filter((y) => y !== x) : [...cur, x]))}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <button className="btn btn-yellow mt-4 !min-h-0 !py-2.5" onClick={submit}>
                send
              </button>
            </div>
          )}
        </>
      )}

      <div className={`mt-4 border-t pt-3 ${dark ? "border-paper/20" : "border-line-soft"}`}>
        {noteSent ? (
          <p className="t-caption" role="status">
            got it. we&apos;ll check it.
          </p>
        ) : mistake ? (
          <div>
            <label htmlFor={`m-${storyId}`} className={`t-caption ${muted}`}>
              what looked wrong or confusing?
            </label>
            <textarea
              id={`m-${storyId}`}
              className="pill-input !rounded-[14px] mt-1 !min-h-0 !py-2"
              rows={3}
              maxLength={500}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="for example: a name, a number, a word i didn't get"
            />
            <button className="btn btn-yellow mt-2 !min-h-0 !py-2" onClick={submitNote} disabled={!note.trim()}>
              send
            </button>
          </div>
        ) : (
          <button className={`t-caption underline ${muted}`} onClick={() => setMistake(true)}>
            spot a mistake, or something confusing?
          </button>
        )}
      </div>
    </section>
  );
}
