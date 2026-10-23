"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function SignInForm({ id, stacked = false }: { id: string; stacked?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const [checking, setChecking] = useState(false);

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setCodeErr("");
    const token = code.replace(/\s/g, "");
    let { error } = await supabase.auth.verifyOtp({ email: email.trim(), token, type: "email" });
    if (error) ({ error } = await supabase.auth.verifyOtp({ email: email.trim(), token, type: "signup" }));
    setChecking(false);
    if (error) setCodeErr("that code didn't work. check it, or ask for a new one.");
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) {
      setMsg(error.message);
      setState("error");
    } else setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="arrive rounded-[14px] bg-paper p-5 text-deep" role="status">
        <p className="t-title">check your email.</p>
        <p className="t-body mt-1 text-deep/80">
          we sent a link and a code to <strong>{email}</strong>. tap the link, or type the code here. no password.
        </p>
        <form onSubmit={verify} className="mt-3 flex gap-2">
          <label htmlFor="otp-code" className="sr-only">
            code from your email
          </label>
          <input
            id="otp-code"
            className="pill-input flex-1 text-center tracking-widest"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="code from email"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9 ]/g, ""))}
          />
          <button className="btn btn-yellow !px-5" disabled={checking || code.replace(/\s/g, "").length < 6}>
            {checking ? "..." : "go"}
          </button>
        </form>
        {codeErr && (
          <p className="t-caption mt-2 text-alert" role="alert">
            {codeErr}
          </p>
        )}
        <p className="t-caption mt-3 text-deep/70">
          tip: if the link says it expired, your email provider may have opened it already. use the code instead.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={send} className={`flex w-full flex-col gap-3 ${stacked ? "" : "sm:flex-row"}`} aria-describedby={`${id}-hint`}>
      <label htmlFor={`${id}-email`} className="sr-only">
        your email
      </label>
      <input
        id={`${id}-email`}
        className={`pill-input ${stacked ? "" : "sm:flex-1"}`}
        type="email"
        required
        placeholder="your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        inputMode="email"
      />
      <button className={`btn btn-yellow ${stacked ? "" : "sm:w-auto"}`} disabled={state === "sending"}>
        {state === "sending" ? "sending..." : "make me cool"}
      </button>
      <p className="t-caption w-full opacity-80">
        by continuing you agree to our <a className="underline" href="/terms">terms</a> and <a className="underline" href="/privacy">privacy policy</a>.
      </p>
      <p id={`${id}-hint`} className="sr-only">
        we email you a one-time sign-in link
      </p>
      {state === "error" && (
        <p className="t-caption w-full rounded-[14px] bg-alert-strong px-3 py-2 text-white sm:basis-full" role="alert">
          {msg}
        </p>
      )}
    </form>
  );
}
