"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function SignInForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

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
          we sent a magic link to <strong>{email}</strong>. tap it and you&apos;re in. no password, no fuss.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="flex w-full flex-col gap-3 sm:flex-row" aria-describedby={`${id}-hint`}>
      <label htmlFor={`${id}-email`} className="sr-only">
        your email
      </label>
      <input
        id={`${id}-email`}
        className="pill-input sm:flex-1"
        type="email"
        required
        placeholder="your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        inputMode="email"
      />
      <button className="btn btn-yellow sm:w-auto" disabled={state === "sending"}>
        {state === "sending" ? "sending..." : "make me cool"}
      </button>
      <p className="t-caption w-full opacity-80 sm:basis-full">
        by continuing you agree to our <a className="underline" href="/terms">terms</a> and <a className="underline" href="/privacy">privacy policy</a>.
      </p>
      <p id={`${id}-hint`} className="sr-only">
        we email you a one-time sign-in link
      </p>
      {state === "error" && (
        <p className="t-caption w-full rounded-[14px] bg-alert px-3 py-2 text-white sm:basis-full" role="alert">
          {msg}
        </p>
      )}
    </form>
  );
}
