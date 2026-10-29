import type { Story } from "../stories";
import { stories as oct2026 } from "./2026-10";
import { stories as nov2026 } from "./2026-11";

// every approved month, in order. new months are added by `npm run publish:month`.
export const monthStories: Story[] = [...oct2026, ...nov2026];
