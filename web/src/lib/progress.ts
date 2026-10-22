import { todayKey } from "@/lib/schedule";

// Where someone left off in a story, kept on this device only so a phone call or a lock screen doesn't cost them the story.
const KEY = "mmc_progress";

type Saved = { storyId: string; day: string; card?: number; q?: { i: number; correct: number; marks: boolean[] } };

function read(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

/** Progress for this story, if it was started today. */
export function getProgress(storyId: string): Saved | null {
  const s = read();
  return s && s.storyId === storyId && s.day === todayKey() ? s : null;
}

export function saveProgress(storyId: string, patch: { card?: number; q?: Saved["q"] }) {
  try {
    const cur = getProgress(storyId);
    const next: Saved = { storyId, day: todayKey(), ...(cur ?? {}), ...patch };
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* progress is a nicety, never a blocker */
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
