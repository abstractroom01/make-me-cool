"use client";

import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { PLUS_PRICE } from "@/lib/pricing";

/** Shown to guests once they have finished a story: what free gets you, what plus adds, and how to carry on. */
export function JoinCard({ onPlus }: { onPlus: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="mt-6 rounded-[14px] bg-paper p-5 text-deep" aria-label="keep going">
      <p className="t-title">that&apos;s your free story done.</p>
      <p className="t-body mt-1 text-deep/80">want a new one every day?</p>

      <div className="mt-4 rounded-[14px] border-2 border-deep p-4">
        <p className="display text-xl font-bold">free</p>
        <ul className="t-body mt-2 space-y-1 text-deep/85">
          <li>a new story every day, plus the last 7 days</li>
          <li>your streak and cool score are saved</li>
          <li>7 days of plus free</li>
        </ul>
        {open ? (
          <div className="mt-3">
            <SignInForm id="result" stacked />
          </div>
        ) : (
          <button className="btn btn-yellow mt-3 w-full" onClick={() => setOpen(true)}>
            sign in for free access
          </button>
        )}
      </div>

      <div className="mt-3 rounded-[14px] bg-deep p-4 text-paper">
        <p className="display text-xl font-bold">
          plus <span className="text-spark">· {PLUS_PRICE} for 30 days</span>
        </p>
        <p className="t-body mt-1 text-paper/85">the full archive of past stories, and the sources behind each one. pay once, no auto-renewal.</p>
        <button className="btn btn-ghost mt-3 w-full !bg-transparent !text-paper !border-paper/60 !shadow-none" onClick={onPlus}>
          commit to become cool · {PLUS_PRICE}
        </button>
      </div>
    </section>
  );
}
