# monthly story routine (founder approves on the 30th)

Goal: next month's stories exist, checked, and waiting for one approval. Nothing goes live until sankalp says so.

## timeline
| when | who | what |
|---|---|---|
| ~15th | scheduled claude task | drafts next month into `web/drafts/YYYY-MM/`, runs the validator and link check, writes `docs/content/review/YYYY-MM-review.md` |
| 15th to 29th | claude + sankalp | sankalp reads the review sheet, flags changes in chat, claude fixes |
| 30th | sankalp | says "approved" |
| 30th | claude | `npm run publish:month -- YYYY-MM`, then tsc, check:stories, build, commit, push. deploys on push |

If sankalp has not approved by the 30th, the app still has a buffer: never let the last published story get closer than 5 days. The task warns about this.

## how the draft is made
1. read `STORY-STYLE-GUIDE.md` and the last month's stories (voice, rotation, no repeated topics).
2. pick topics from `story-bank-batch-2.md` first, then research new ones. at least two fields each, rotate the primary field.
3. research every claim from sources actually opened. hedge what is contested.
4. write `drafts/YYYY-MM/index.ts` (split into parts of ~7 stories if long) with `import type { Story } from "../../src/data/stories"`.
5. `npm run check:stories -- --dir drafts/YYYY-MM` must pass, then `npm run check:links`.
6. write the review sheet: per story, date, title, the riskiest claim, the sources, and anything to double-check by hand.

## publishing
`npm run publish:month -- YYYY-MM` validates the draft, moves it to `src/data/months/YYYY-MM/`, and registers it in `months/index.ts`. then `npx tsc --noEmit && npm run build`, commit, push.

## after publishing
add `reveals` entries for any story with a public-domain picture (optional), and update the marketing assets if hooks changed.
