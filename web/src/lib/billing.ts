import { supabase } from "@/lib/supabase";
import type { Plan } from "@/lib/types";

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void };
  }
}

export function rupees(paise: number): string {
  const r = paise / 100;
  return "₹" + (Number.isInteger(r) ? r.toString() : r.toFixed(2));
}

export async function loadPlans(): Promise<Plan[]> {
  const { data } = await supabase.from("plans").select("id,label,days,price_paise,sort").eq("active", true).order("sort");
  return (data as Plan[]) ?? [];
}

export type PlusState = { active: boolean; until: string | null };

export async function loadPlus(userId: string): Promise<PlusState> {
  const { data } = await supabase.from("entitlements").select("plus_until").eq("user_id", userId).maybeSingle();
  if (!data) return { active: false, until: null };
  return { active: new Date(data.plus_until).getTime() > Date.now(), until: data.plus_until };
}

export type PaymentRow = { id: string; plan_id: string; amount_paise: number; status: string; created_at: string; paid_at: string | null };

export async function loadPayments(userId: string): Promise<PaymentRow[]> {
  const { data } = await supabase
    .from("payments")
    .select("id,plan_id,amount_paise,status,created_at,paid_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data as PaymentRow[]) ?? [];
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("could not load the payment window"));
    document.body.appendChild(s);
  });
}

export type CheckoutResult = { ok: true } | { ok: false; message: string; dismissed?: boolean };

/** Creates an order on the server, opens Razorpay, then asks the server to confirm. */
export async function startCheckout(planId: string, email?: string): Promise<CheckoutResult> {
  const { data: order, error } = await supabase.functions.invoke("create-order", { body: { plan_id: planId } });
  if (error || !order?.order_id) {
    return { ok: false, message: "we couldn't start the payment. nothing was charged. please try again in a moment." };
  }
  try {
    await loadScript();
  } catch {
    return { ok: false, message: "the payment window didn't load. check your connection and try again." };
  }
  return new Promise<CheckoutResult>((resolve) => {
    const rz = new window.Razorpay!({
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      order_id: order.order_id,
      name: "make me cool",
      description: order.plan_label,
      prefill: email ? { email } : undefined,
      theme: { color: "#04363a" },
      modal: { ondismiss: () => resolve({ ok: false, message: "no problem. nothing was charged.", dismissed: true }) },
      handler: async (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        const { data, error: vErr } = await supabase.functions.invoke("verify-payment", { body: resp });
        if (vErr || !data?.ok) {
          resolve({
            ok: false,
            message: "your payment went through, but we're still activating plus. it usually takes a minute. if it doesn't appear, write to us and we'll sort it.",
          });
        } else resolve({ ok: true });
      },
    });
    rz.on("payment.failed", () => {
      /* the window stays open so the user can retry with another method */
    });
    rz.open();
  });
}
