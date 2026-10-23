"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

/** Email and password sign-in for the review account only. Everyone else signs in with an email link or code on the home page. */
export function ReviewLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      setBusy(false);
      setErr("that email and password didn't work.");
      return;
    }
    window.location.href = "/";
  }

  return (
    <main className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-sm px-5 py-14">
        <h1 className="t-headline">review sign-in</h1>
        <p className="t-body mt-2 text-deep/80">for the account used to review checkout. everyone else signs in from the home page.</p>
        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <label htmlFor="rv-email" className="sr-only">
            email
          </label>
          <input id="rv-email" className="pill-input" type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          <label htmlFor="rv-pass" className="sr-only">
            password
          </label>
          <input id="rv-pass" className="pill-input" type="password" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          <button className="btn btn-yellow" disabled={busy}>
            {busy ? "signing in..." : "sign in"}
          </button>
          {err && (
            <p className="t-caption rounded-[14px] bg-alert-strong px-3 py-2 text-white" role="alert">
              {err}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
