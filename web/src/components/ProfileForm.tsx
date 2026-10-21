"use client";

import { useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/types";

export function ProfileForm({ session, onDone }: { session: Session; onDone: (p: Profile) => void }) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [adult, setAdult] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const h = handle.trim().toLowerCase().replace(/^@/, "");
    if (!/^[a-z0-9_]{3,20}$/.test(h)) return setErr("handle: 3 to 20 letters, numbers or underscores.");
    setBusy(true);
    const { data: free } = await supabase.rpc("handle_available", { h });
    if (!free) {
      setBusy(false);
      return setErr("that handle is taken. be more original.");
    }
    const { error } = await supabase.from("profiles").insert({
      user_id: session.user.id,
      name: name.trim(),
      handle: h,
      age_confirmed_at: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setBusy(false);
    if (error) return setErr(error.message);
    onDone({ name: name.trim(), handle: h });
  }

  return (
    <main className="min-h-dvh bg-deep text-paper">
      <div className="mx-auto grid min-h-dvh max-w-5xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:px-8">
        <div className="arrive">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-main.png" alt="the abstract room" className="h-10 w-auto" />
          <h1 className="t-display mt-8">
            who <span className="accent-on-deep">are</span> you?
          </h1>
          <p className="t-body mt-4 max-w-md text-paper/85">
            two quick things and you&apos;re in. abstract has opinions about everyone, so give it something to work with.
          </p>
        </div>
        <form onSubmit={save} className="arrive card-shadow space-y-4 rounded-[14px] bg-paper p-6 text-deep md:p-8">
          <div>
            <label htmlFor="name" className="t-caption font-semibold">
              your name
            </label>
            <input id="name" className="pill-input mt-1" required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="meera" />
          </div>
          <div>
            <label htmlFor="handle" className="t-caption font-semibold">
              pick a handle
            </label>
            <input id="handle" className="pill-input mt-1" required value={handle} onChange={(e) => setHandle(e.target.value)} autoCapitalize="none" autoCorrect="off" placeholder="meera_watches_films" />
          </div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-0.5 h-5 w-5 accent-[#04363a]" checked={adult} onChange={(e) => setAdult(e.target.checked)} />
            <span>
              i&apos;m 18 or older, and i agree to the <a className="underline" href="/terms" target="_blank" rel="noopener noreferrer">terms</a> and{" "}
              <a className="underline" href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>
            </span>
          </label>
          {err && (
            <p className="t-caption rounded-[14px] bg-alert px-3 py-2 text-white" role="alert">
              {err}
            </p>
          )}
          <button className="btn btn-yellow w-full" disabled={!adult || !name.trim() || busy}>
            {busy ? "saving..." : "let me in"}
          </button>
        </form>
      </div>
    </main>
  );
}
