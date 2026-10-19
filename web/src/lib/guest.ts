import type { Completion } from "@/lib/types";

const KEY = "mmc_guest_completions";

export function loadGuest(): Completion[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Completion[]) : [];
  } catch {
    return [];
  }
}

export function saveGuest(list: Completion[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* private mode: progress simply isn't kept */
  }
}

export function clearGuest() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
