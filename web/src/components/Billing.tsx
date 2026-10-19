"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { loadPayments, rupees, type PaymentRow, type PlusState } from "@/lib/billing";
import { business } from "@/data/curator";
import { track } from "@/lib/analytics";

function fmt(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function Billing({
  session,
  plus,
  onBack,
  onPlus,
}: {
  session: Session;
  plus: PlusState | null;
  onBack: () => void;
  onPlus: () => void;
}) {
  const [rows, setRows] = useState<PaymentRow[] | null>(null);
  useEffect(() => {
    track("billing_page_viewed", {}, session.user.id);
    loadPayments(session.user.id).then(setRows);
  }, [session.user.id]);

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
        <button className="t-caption underline" onClick={onBack}>
          ← back
        </button>
        <h1 className="t-headline mt-4">plus and billing</h1>

        <section className="mt-6 rounded-[14px] bg-deep p-6 text-paper">
          {plus?.active ? (
            <>
              <p className="t-caption font-semibold uppercase tracking-widest text-spark">your plus pass</p>
              <p className="display mt-1 text-3xl font-bold">active until {fmt(plus.until)}</p>
              <p className="t-body mt-2 text-paper/85">nothing renews automatically. nothing is charged unless you buy another pass, so there is nothing to cancel.</p>
            </>
          ) : (
            <>
              <p className="display text-2xl font-bold">you&apos;re on the free plan</p>
              <p className="t-body mt-2 text-paper/85">the daily story, quiz, score, streak and badges are free, always.</p>
            </>
          )}
          <button className="btn btn-yellow mt-4" onClick={onPlus}>
            {plus?.active ? "add more time" : "see plus"}
          </button>
        </section>

        <h2 className="t-title mt-8">your payments</h2>
        {rows === null ? (
          <p className="t-body mt-2 text-deep/70">loading...</p>
        ) : rows.length === 0 ? (
          <p className="t-body mt-2 text-deep/70">no payments yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-[14px] border-2 border-[#cfdcdb] bg-white p-4">
                <span>
                  <span className="display block font-semibold">{r.plan_id === "plus_12m" ? "plus, 12 months" : "plus, 1 month"}</span>
                  <span className="t-caption text-deep/70">{fmt(r.paid_at ?? r.created_at)}</span>
                </span>
                <span className="text-right">
                  <span className="display block font-semibold">{rupees(r.amount_paise)}</span>
                  <span className="t-caption text-deep/70">{r.status === "created" ? "not completed" : r.status}</span>
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="t-caption mt-6 text-deep/70">
          need a tax invoice or help with a payment? write to {business.supportEmail ? <a className="underline" href={`mailto:${business.supportEmail}`}>{business.supportEmail}</a> : "us through the abstract room"}.
          see the <a className="underline" href="/refunds">refund policy</a>.
        </p>
      </div>
    </div>
  );
}
