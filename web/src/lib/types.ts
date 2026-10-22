export type Profile = { name: string; handle: string; created_at?: string };

export type Completion = {
  story_id: string;
  completed_on: string;
  correct: number;
  total: number;
  points: number;
  shared_at?: string | null;
  told?: boolean | null;
  landed?: "laughed" | "asked_more" | "nothing" | null;
  told_answered_at?: string | null;
};

export type Plan = { id: string; label: string; days: number; price_paise: number; sort: number };

export type View =
  | { name: "today" }
  | { name: "deck"; storyId: string }
  | { name: "quiz"; storyId: string }
  | { name: "tell"; storyId: string; correct: number; total: number; points: number }
  | { name: "result"; storyId: string; correct: number; total: number; points: number; before: number; after: number; newBadges: string[] }
  | { name: "plus"; reason?: string }
  | { name: "billing" }
  | { name: "explain" }
  | { name: "deeper"; storyId: string }
  | { name: "help" }
  | { name: "delete" }
  | { name: "badges" }
  | { name: "behind"; storyId: string };
