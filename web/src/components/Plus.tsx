"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { loadPlans, rupees, startCheckout, type PlusState } from "@/lib/billing";
import { track } from "@/lib/analytics";
import type { Plan } from "@/lib/types";
import { SignInForm } from "./SignInForm";
import { PLUS_PRICE } from "@/lib/pricing";
import { Check, Chip } from "./ui";

type Perk = { id: number; title: string; body: string };

const heading: Record<string, string> = {
  archive: "older stories are part of plus",
  behind: "behind the story is part of plus",
  default: "make me cool, plus",
};

function fmt(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function Plus({
  session,
  plus,
  reason,
  onBack,
  onChanged,
}: {
  session: Session | null;
  plus: PlusState | null;
  reason?: string;
  onBack: () => void;
  onChanged: () => void;
}) {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [perks, setPerks] = useState<Perk[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    track("paywall_viewed", { surface: reason ?? "plus_page" }, session?.user.id);
    loadPlans().then(setPlans);
    if (session) supabase.from("perks").select("id,title,body").order("sort").then(({ data }) => setPerks((data as Perk[]) ?? []));
  }, [reason, session]);

  async function pay(p: Plan) {
    if (!session) return;
    setMsg("");
    setBusy(p.id);
    track("upgrade_clicked", { plan: p.id }, session.user.id);
    track("checkout_started", { plan: p.id }, session.user.id);
    const r = await startCheckout(p.id, session.user.email ?? undefined);
    setBusy(null);
    if (r.ok) {
      setDone(true);
      onChanged();
    } else if (!r.dismissed) {
      setMsg(r.message);
      track("error_shown", { where: "checkout" }, session.user.id);
      onChanged();
    } else {
      setMsg(r.message);
    }
  }

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
        <button className="t-caption underline" onClick={onBack}>
          ← back
        </button>
        <h1 className="t-headline mt-4">{heading[reason ?? "default"] ?? heading.default}</h1>
        <p className="t-body mt-3 max-w-xl text-deep/85">
          the daily story, the quiz, telling someone, your cool score, your streak and your badges are free, always. plus is for going deeper. your pass
          helps pay the people who find and check these stories.
        </p>

        <section className="card-shadow mt-8 rounded-[14px] bg-deep p-6 text-paper md:p-8">
          <Chip tone="yellow">what plus includes today</Chip>
          <ul className="mt-4 space-y-3">
            {[
              ["the full archive", "every story older than 7 days. it grows every day."],
              ["behind the story", "the sources, what's still being checked, and where to go deeper, for every story."],
            ].map(([t, b]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 text-spark">
                  <Check />
                </span>
                <span>
                  <span className="display block text-lg font-semibold">{t}</span>
                  <span className="t-body text-paper/80">{b}</span>
                </span>
              </li>
            ))}
            {perks.map((p) => (
              <li key={p.id} className="flex gap-3">
                <span className="mt-1 text-spark">
                  <Check />
                </span>
                <span>
                  <span className="display block text-lg font-semibold">{p.title}</span>
                  <span className="t-body text-paper/80">{p.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="t-body mt-5 rounded-[14px] bg-paper/10 p-3 text-paper/90">new accounts get <strong>7 days of plus free</strong>, no payment needed.</p>
          <p className="t-caption mt-5 text-paper/70">coming later, not included yet: tonight mode, guest-curator seasons. we only sell what exists.</p>
        </section>

        {plus?.active && (
          <p className="t-body mt-6 rounded-[14px] bg-mist p-4">{plus.trial ? "your free trial runs until " : "you have plus until "}<strong>{fmt(plus.until)}</strong>. nothing renews automatically.</p>
        )}

        {done && <p className="t-body mt-6 rounded-[14px] bg-spark p-4 font-semibold" role="status">you&apos;re on plus. thank you!</p>}

        {!session ? (
          <section className="mt-8 rounded-[14px] border-2 border-deep bg-white p-6">
            <p className="display text-xl font-bold">plus, 30 days</p>
            <p className="display mt-1 text-4xl font-bold">{PLUS_PRICE}</p>
            <p className="t-caption mt-1 text-deep/70">pay once. no auto-renewal. the price you see is the price you pay.</p>
            <p className="t-title mt-6">sign in to buy</p>
            <p className="t-body mt-1 text-deep/80">it only takes your email. no password.</p>
            <div className="mt-3">
              <SignInForm id="plus" stacked />
            </div>
          </section>
        ) : plans === null ? (
          <p className="t-body mt-8 text-deep/70">loading...</p>
        ) : plans.length === 0 ? (
          <p className="t-body mt-8 rounded-[14px] border-2 border-line bg-white p-5">plus passes open very soon. everything free works as usual.</p>
        ) : (
          <section className="mt-8">
            <h2 className="t-title">{plus?.active ? "add more time" : "choose a pass"}</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {plans.map((p, i) => (
                <li key={p.id} className="rounded-[14px] border-2 border-deep bg-white p-5">
                  {i === plans.length - 1 && plans.length > 1 && <Chip tone="yellow">best value</Chip>}
                  <p className="display mt-2 text-xl font-bold">{p.label}</p>
                  <p className="display mt-1 text-4xl font-bold">{rupees(p.price_paise)}</p>
                  <p className="t-caption mt-1 text-deep/70">pay once. no auto-renewal. the price you see is the price you pay.</p>
                  <button className="btn btn-yellow mt-4 w-full" disabled={busy !== null} onClick={() => pay(p)}>
                    {busy === p.id ? "opening..." : "get this pass"}
                  </button>
                </li>
              ))}
            </ul>
            {msg && (
              <p className="t-body mt-4 rounded-[14px] bg-mist p-4" role="status">
                {msg}
              </p>
            )}
            <p className="t-caption mt-4 text-deep/70">
              payments are handled by razorpay (upi, cards, netbanking). we never see your card details. see our <a className="underline" href="/refunds">refund policy</a> and{" "}
              <a className="underline" href="/terms">terms</a>.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
