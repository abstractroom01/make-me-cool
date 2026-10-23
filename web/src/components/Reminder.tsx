"use client";

import { useState } from "react";
import { downloadIcs } from "@/lib/ics";

/** Step one of the day: put us in the calendar, so a story is waiting every morning. Works on any phone, no app permissions. */
export function Reminder({ dark = false }: { dark?: boolean }) {
  const [time, setTime] = useState("08:00");
  const [added, setAdded] = useState(false);
  return (
    <section className={`rounded-[14px] border-2 p-5 ${dark ? "border-paper/25" : "border-line bg-white"}`} aria-label="daily reminder">
      <p className="t-title">want a story every morning?</p>
      <p className={`t-caption mt-1 ${dark ? "text-paper/80" : "text-deep/70"}`}>adds a repeating event to your phone&apos;s calendar. no app permissions needed.</p>
      <div className="mt-3 flex items-center gap-2">
        <label htmlFor={`rt-${dark ? "d" : "l"}`} className="sr-only">
          reminder time
        </label>
        <input id={`rt-${dark ? "d" : "l"}`} type="time" value={time} onChange={(e) => setTime(e.target.value)} className="pill-input !w-32 !py-2" />
        <button
          className="btn btn-yellow !min-h-0 !px-4 !py-2"
          onClick={() => {
            downloadIcs(time);
            setAdded(true);
          }}
        >
          {added ? "added!" : "add to calendar"}
        </button>
      </div>
    </section>
  );
}
