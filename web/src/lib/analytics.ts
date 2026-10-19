import { supabase } from "@/lib/supabase";

export type EventType =
  | "landing_viewed"
  | "cta_clicked"
  | "signup_started"
  | "story_started"
  | "story_finished"
  | "quiz_finished"
  | "best_line_answered"
  | "share_tapped"
  | "told_it_answered"
  | "score_viewed"
  | "score_explained_opened"
  | "badge_awarded"
  | "paywall_viewed"
  | "upgrade_clicked"
  | "checkout_started"
  | "plus_feature_used"
  | "billing_page_viewed"
  | "reminder_downloaded"
  | "error_shown";

function anonId(): string {
  try {
    let id = localStorage.getItem("mmc_anon");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("mmc_anon", id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

/** First-party events only. Never put reflections, phone numbers or emails in props. */
export function track(type: EventType, props: Record<string, string | number | boolean> = {}, userId?: string) {
  void (async () => {
    try {
      await supabase.from("events").insert({
        type,
        props,
        user_id: userId ?? null,
        anon_id: anonId(),
      });
    } catch {
      /* analytics must never break the app */
    }
  })();
}
