# Cool score and badges (proposed definition)

Checkpoint 4. Builds on `00-decision-log.md` and `03-develop-concepts.md`. Everything here is a **proposal for the founder to confirm**; numbers are hypotheses to calibrate, not facts.

The test for every line below: does it help someone become 1% cooler, and does it push them toward **retelling**, not just showing up?

---

## 1. What I am changing from your brief, and why

You asked for a cool score "as per the 7, 30, 90 or yearly streak", with a moment like **"today you became 33% cooler!"**

Three things need to be settled before it is built.

1. **A streak and a score are different things.** A streak counts consecutive days and **resets to zero when you miss one**. A score that follows the streak will punish a missed day exactly when the user most needs a reason to return. [Rec] The score should be a **rate over a window** (how many of the last 7, 30, 90 or 365 days you were cool), which recovers gently. The streak stays as a separate visible counter and a source of badges.
2. **"33% cooler" needs a real meaning.** An earlier decision rejected a made-up percentage because it reads as fluff. [Rec] Keep your line, but make it **arithmetically true**: it is the change in the 7-day score caused by today's story (section 3). It is honest, and it can be explained in one tap.
3. **A score that only counts finishing contradicts the centre of the product.** If the score is the same whether or not someone ever retells a story, we are rewarding completion. So it must include the retell signal (section 2).

---

## 2. The cool score

### 2.1 Definition (proposed)

For a window of **W days** (7, 30, 90 or 365):

```
cool score (W) = round( 100 × ( 0.7 × finished_days / N  +  0.3 × told_days / N ) )
```

- **finished day:** the user finished that day's story and its quiz before local midnight of the day it was published.
- **told day:** the user answered "yes, I told it to someone" to the next-day question (or tapped it the same day).
- **N** (the denominator) is the number of days in the window, minus:
  - days with no published story (never held against the user),
  - **rest days**: up to one per rolling 7 days, used automatically the first time a day is missed (the "one free miss"),
  - days before the user joined.
- **Minimum denominator:** for the 7-day window, N is never below 7 in a user's first week, so one day does not read as 100 percent.
- **Long windows unlock** once the user has been around that long (30, 90, 365 days). Until then they show "unlocks in X days", which is a free goal-gradient hook.
- **Weights 70 / 30** are a hypothesis. Finishing is the base; telling is the premium. To be calibrated after the closed beta.

### 2.2 "Today you became X% cooler"

```
X = (score_7day_after − score_7day_before) / score_7day_before × 100
```

- Shown on the result screen **only** when the before-score is at least 20 and X is at least 1. A relative percent at a tiny base ("+300%") is silly and dishonest-feeling.
- Otherwise show the absolute move: "Your 7-day cool score: 43 → 57".
- A **"how is this calculated?"** link is always one tap away, with the formula in plain words.
- The 30, 90 and 365-day scores move slowly (one day is about 3, 1 and 0.3 percent of the window). They are shown as **trend lines**, not daily celebrations.

### 2.3 Worked examples (7-day window, rest day not used)

| Situation | Finished | Told | Score | Message |
|---|---|---|---|---|
| Day 1, first story | 1 of 7 (minimum denominator) | 0 | 10 | "Your cool score starts at 10. Tell someone today and it moves." |
| Day 4 after finishing every day, told none | 4 of 7 | 0 | 40 | "40 this week." |
| Day 4 after finishing 4, and told it on 3 | 4 of 7 | 3 | 53 | "Telling counts. 53." |
| Yesterday 3 of 7 finished, none told (score 30). Today finish: 4 of 7 | 4 of 7 | 0 | 40 | "Today you became 33% cooler. (30 → 40)" |
| A bad week, 2 finished, 0 told | 2 of 7 | 0 | 20 | "20. Next week starts on Monday" (no shame copy) |

(All rows are illustrative arithmetic that show how the formula behaves, not user data. Row 4 is deliberately a 30 to 40 move, which is exactly a 33 percent relative rise: (40 − 30) / 30.)

### 2.4 Rules that keep it honest and kind
- **No loss framing.** The score is allowed to fall, but copy never says "you lost". A fall shows the path back: "tell today's story and you're back to 50".
- **No farmed points.** "Told it" feeds the score but can never unlock a reward alone; badges for telling require the next-day answer *and* a finished story.
- **The user can hide the score** in settings. Some people hate numbers; the app must work for them.
- **Every number explains itself** (Nielsen: visibility of system status, help and documentation).

---

## 3. Badges

### 3.1 Principles
1. A badge marks something **real the user did**, never just opening the app.
2. Each badge records **what earned it and which story**, so it can be a memory, not a medal.
3. **Nothing is taken away.** No badge expires; streak badges are for reaching the milestone, not for holding it.
4. The set is **small at launch (12)**. A large set dilutes the one that matters (Von Restorff).
5. Badges are awarded at the **end of the session**, after the "tell someone" step, so the high point lands at the end (peak-end).

### 3.2 The launch set (12)

| Group | Badge | Earned by |
|---|---|---|
| Showing up | **a week of cool** | 7 days finished in a row (counted with the one free miss) |
| | **a month of cool** | 30 days |
| | **a quarter of cool** | 90 days |
| | **a year, disgustingly cool** | 365 days |
| Telling | **first told** | first "yes, I told it" |
| | **ten told** | 10 stories told |
| | **fifty told** | 50 stories told |
| Range | **explorer** | finished stories in 5 different subjects |
| | **polymath** | finished stories in all 10 subjects |
| Resilience | **comeback** | finished a story after 3 or more days away |
| Rhythm | **weekend regular** | 8 weekend stories finished |
| Monthly | **cool month** | 7-day-rate average of at least 80 across a calendar month |

[Rec] Names are placeholders for the founder to rewrite in the Abstract voice. Do not use the word "streak" in a way that implies loss.

### 3.3 What I would not do
- Badges for opening the app, sharing, or inviting people. They reward behaviour that is not retelling.
- A leaderboard. Out for now (decision 10).
- Rare or "mystery" badges with random drops. Interesting later; a variable-reward manipulation risk now.

---

## 4. How this serves the centre of the product

| Part of the loop | What the user sees | Why it supports retelling |
|---|---|---|
| End of story | "Tell someone today" with a one-tap share | Commits to telling |
| Result screen | 7-day score, "today you became X% cooler", badges earned | Immediate, honest proof |
| Next day | "Did you tell it? How did it land?" | Closes the loop and feeds the score |
| Over weeks | 30, 90 and 365-day trend lines, badge shelf | A visible record of becoming more interesting |

---

## 5. Metrics (hypotheses; calibrate, don't copy)

| Metric | Definition | How measured | Guardrail |
|---|---|---|---|
| Score seen | Users who viewed the 7-day score at least once / users who finished a story | Event `score_viewed` | Users who hide the score |
| "Cooler" moment effect | Day-2 and day-7 return of users who saw the first "cooler" moment vs those who did not (the moment is shown to a random half in the closed beta) | A/B in the closed beta | Opt-outs |
| Told-it rate | Told days / finished days | `told_it_answered` | Share of "told" with no share tap (possible gaming) |
| Break response | Share of users who return within 3 days of their first missed day | Cohort | Any increase in churn right after a score drop |
| Badge reach | Users with at least one badge by day 14 | `badge_awarded` | Badge farming patterns |
| Explanation use | Taps on "how is this calculated?" | `score_explained_opened` | If very high, the score is confusing |

I have **not** set targets. Calibrate them from the closed beta.

---

## 6. Events to instrument

`story_started`, `story_finished`, `quiz_finished`, `share_tapped`, `told_it_prompt_shown`, `told_it_answered` (yes or no), `rest_day_applied`, `score_viewed` (window), `score_explained_opened`, `badge_awarded` (badge id), `score_hidden_toggled`.

## 7. Open points
1. **Weights 70 / 30**, and whether "told" should count at all in the first two weeks.
2. **Name of the score period labels** ("this week", "this month", "this quarter", "this year").
3. **Does the user see all four windows on day one,** or do 30, 90 and 365 stay hidden until they unlock? (I recommend the hidden-until-unlocked version.)
4. **Plan impact:** this replaces the ownership-based cool score and the gems, quests and badges requirements in the plan (R13 to R16, R32, R33). The plan will be updated once you confirm.
