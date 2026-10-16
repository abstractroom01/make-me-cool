# make me cool: what's decided and what's pending

Legend: **decided** = settled in this brainstorm. **pending** = needs a decision or work. **risk** = could break the plan.

**Platform: mobile-first.** Everyone will use the app on a phone, so every screen is designed for a phone first (portrait, touch, one-handed).

## 1. core loop and product rules

| item | status | note |
|---|---|---|
| daily loop: notification, swipe card story, rabbit holes, quiz, score | decided | about 5 minutes |
| cadence | decided | 5 stories a week, plus lighter weekend bonus stories |
| card format | decided | swipeable deck, one beat per card, Tinder-style drag |
| story voice | decided | simple words, short sentences, why-it-matters card, concept explained plainly, exclamations on hooks and reveals |
| notification line | decided | YouTube-style hook, true claim only |
| quiz format | decided | 2 concept/recall MCQs, 1 fill-in-the-blank, 1 "pick the best line", 1 optional crew reflection |
| quiz scoring | decided | best line = full points, next best = half; no timer on the best-line question |
| cool score | decided (structure) | derived from stories owned (heaviest), range, told-it-out-loud |
| cool score formula | decided | 60 / 25 / 15 across stories owned, range, told-it-out-loud; owned after two recalls, held 30 days; range = fields plus pairs (capped at 20 pairs) |
| streak rules | decided | weekday streak, weekends can't break it, one free missed weekday a week, 1.5x at 7 days and 2x at 30 days |
| points and speed bonus | **pending** | speed bonus only on recall questions, or drop it |
| spaced re-quiz | **pending** | 1 to 2 recalls per day inside the 5 minutes; how stories are picked; schedule |
| "told it out loud" next-day check-in | **pending** | wording, timing, how much it counts |
| notification time and frequency | decided | user picks a moment of the day (wake-up, commute, meal, loo break, winding down, custom) and attaches a time after the first story; one per weekday plus weekend bonus; quiet hours off by default. Copy variants and A/B plan still **pending** |
| onboarding | **pending** | first card within a minute, then time picker and interests |

## 2. visual language and design

| item | status | note |
|---|---|---|
| colours | decided | deep teal, brand teal, yellow, red, off-white; retired colours excluded. Yellow now also used across pages; white used for explain and quiet screens |
| fonts | decided | Jost display, Inter body |
| corner radius | decided | about 14px on cards and buttons, 0px on photos; the brand guide needs updating |
| motion rules | decided | drag follows the finger and snaps back with no bounce; everything else arrives with one fade and 8px rise. A written spec is still **pending** |
| screen inventory | **pending** | onboarding, today deck, quiz, results and score, range map, crews, profile, settings |
| range map design | **pending** | how ten fields and their connections are drawn |
| illustration style | **pending** | one consistent style for commissioned visuals |
| accessibility | **pending** | contrast of yellow on teal, reduced-motion setting, text size, screen reader order |
| app icon and logo use | decided in guidelines, **pending** in screens | clear space and no distortion |

## 3. content engine

| item | status | note |
|---|---|---|
| story structure | decided | scene hook, visual, plain explanation, why-it-matters, takeaway, conversation starter |
| sourcing | decided | Wikipedia and long-form sites as leads; open archives and museums for verification; no community sourcing |
| week 1 pack | decided | 7 stories drafted in week-1-stories.md |
| 30-day buffer | **pending** | 7 of about 20 to 30 stories drafted |
| verification owner | decided | the founder at first, the part-time editor once hired; nothing drafted so far has had a primary-source check |
| editor review and style guide | **pending** | tone check, fact check, quiz check |
| visual rights process | **pending** | each story lists a visual and its licence; several still need a specific file picked |
| "contested" label | decided | shown as fine print where evidence is disputed |
| rabbit-hole durations | **pending** | none of the links have been timed |
| India-rooted stories | **pending** | batch 1 leans Western; Indian archives are hard for me to reach, so needs a person or open sources |
| story template in Google Sheets | **pending** | columns mirror the CSV and markdown pack |
| move to a headless CMS | **pending** | planned after 30 days |

## 4. accounts, safety and legal

| item | status | note |
|---|---|---|
| sign-up methods | decided | phone one-time code, Google, Apple; then name, handle, 15+ confirmation |
| age handling | decided | 18+ at launch. India's data protection law treats under-18s as children and may require verifiable parental consent; a lawyer should still confirm |
| privacy policy and terms | **pending** | needed for the app stores |
| image licences and attribution | **pending** | credit lines on every visual |
| content claims | **pending** | policy for corrections and takedowns |

## 5. crews and community

| item | status | note |
|---|---|---|
| crews of 3 to 5 | decided | private, see reflections, react, nudge |
| crew mechanics | **pending** | creation, invites, what "nudge" sends, leaving a crew |
| collective crew streak and avatar greying | decided (v1.1) | rules still need writing |
| community chat | decided (v1.2) | proposal: start with a read-only story thread with reactions, no topic rooms yet |
| chat moderation | **pending** | report button, slow mode, escalation path, volunteer moderators; required before opening |
| cool stuff feed | decided (v1.2) | not specified |
| guest curators | decided (v2) | proposal: try a few "guest pick" cards earlier |

## 6. technology and operations

| item | status | note |
|---|---|---|
| tech stack | **pending** | not discussed |
| backend needs | **pending** | accounts, streaks, crews, scoring, re-quiz scheduling, push notifications |
| analytics plan | **pending** | day-1, day-7 and day-30 retention, quiz completion, check-in rate |
| push infrastructure | **pending** | |
| cost and team | **pending** | writer, editor, designer, engineer, moderator |

## 7. validation and business

| item | status | note |
|---|---|---|
| 2-week concierge test | **pending** | skipped for now by choice; channel still unchosen |
| success and kill thresholds | **pending** | proposed: under about 25% still engaged at day 10 means rethink; 40%+ at day 14 means build |
| weakest assumption | **pending** | will people return daily without a visible payoff; needs evidence |
| business model | **pending** | free core; monthly curated lists as a future paid tier |
| distribution | **pending** | how the existing 9,000-person community becomes first users |
| name and positioning check | **pending** | "make me cool" is catchy but self-conscious; "duolingo for being interesting" is the line the spec leans on |
