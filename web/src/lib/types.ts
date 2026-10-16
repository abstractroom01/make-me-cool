export type Profile = { name: string; handle: string };

export type Completion = {
  story_id: string;
  completed_on: string;
  correct: number;
  total: number;
  points: number;
};

export type View =
  | { name: "today" }
  | { name: "deck"; storyId: string }
  | { name: "quiz"; storyId: string }
  | { name: "result"; storyId: string; correct: number; total: number; points: number };
