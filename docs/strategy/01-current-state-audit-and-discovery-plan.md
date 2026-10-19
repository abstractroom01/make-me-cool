# Abstract: current-state audit, assumptions and discovery plan

Checkpoint 1 of the product lifecycle. Nothing here is a final strategy. It is the evidence base and the order of decisions.

Labels used throughout:
- **[Fact]** observed in files, the live product, or this project's history.
- **[Decision]** the founder has decided it; changeable only by the founder.
- **[Assumption]** believed, never validated.
- **[Hypothesis]** a testable claim with a stated way to prove it wrong.
- **[Rec]** my recommendation, open to challenge.

---

## 0. Directions received today (taken as given, not as proof)

1. [Decision] Remove the "college web slice". The target is a complete app. (Removed from the plan.)
2. [Decision] **One full-length story every day, seven days a week, same unit and same length including weekends.** Recorded 19 Oct 2026. The earlier five-a-week plan is superseded. Staffing consequences are in section 8.
3. [Decision] No time for a WhatsApp trial. The concierge test in 4.3 is **dropped**; section 4.3 is replaced by the plan in section 9.
4. [Decision] Typeface is **Josefin Sans**, not Jost. (Swapped in the app and plan. I flag one readability test in 2.4, not a reversal.)
4. [Decision] A **real human curator must be visible** in the product. AI supports delivery and personalisation; it does not replace the curator.
5. [Decision] The test for every feature: does it make someone **1% cooler every day**, and give them a reason to come back tomorrow?

---

## 1. Current-state audit

### 1.1 What Abstract is today
- [Fact] "make me cool" is an app idea from The Abstract Room, a community company (since 2020; 80,000+ community, 700+ events, 7 cities, 9,000+ participants, 15+ countries per the founder's About text).
- [Fact] The promise today: one story a weekday as a swipeable card deck, then a four-question quiz, with a streak, points and a "cool score".
- [Decision] Target user: 23+ working professionals whose conversations "have gone stale".
- [Decision] Demand testing was skipped by the founder. The only demand evidence is founder intuition. [Fact]

### 1.2 What has actually been built
| Item | State | Notes |
|---|---|---|
| Product and technical plan (40 requirements, 16 units) | Written, reviewed 3 times | Describes a full native app. Larger review findings not yet applied. |
| Live web app, makemecool-app-staging.vercel.app | Live, private GitHub repo `make-me-cool` | Landing page, email magic-link sign-in, profile, swipeable story deck, 4-question quiz, result, streak. |
| Content | 3 sample stories, illustrated, **not fact-checked** | A week-1 pack of 7 drafts and a 20-item story bank exist as drafts. |
| Database | Supabase, `profiles` and `completions` tables with row-level security | Scores are calculated on the device, not the server. |
| Existing landing page, `makemecool` repo | Live, separate | Waitlist form (name, email, WhatsApp). Says "15 minutes a day". Signup count unknown to me. |

[Fact] Not built: quests, gems, badges, crews, notifications, recall of old stories, cool score, the Abstract character, library, feed, native app, any analytics.

### 1.3 Evidence from our own testing today
- [Fact] Real sign-in failed on the live site: Supabase's built-in email sender hit "email rate limit exceeded", and an earlier email carried a localhost link that cannot open on a phone.
- [Rec] Treat this as a real product finding, not a bug list item. **Email magic link is the highest-friction possible entry for this audience on a phone** (leave the app, find the email, possibly spam, tap back). It also depends on a fragile email service.

### 1.4 Confirmed decisions that still stand (from the plan)
Lowercase brand voice; palette (deep teal, brand teal, yellow, red, off-white); 18+ minimum age; five-minute session; stories cross at least two fields; no category repeats within five days; quiz of two multiple-choice, one fill-in, one "best line to say" question; one free missed day in a streak; founder verifies facts until an editor is hired; content sourced from existing open sources; launch needs at least 14 fact-checked stories.

### 1.5 Contradictions, gaps, friction and complexity
Ranked by how much they threaten the product, worst first.

1. **Daily every day vs a founder-only content engine.** [Fact] The plan estimates 6 to 10 hours per story, and "five a week" was chosen because seven was unsustainable for one writer. Seven a week is 42 to 70 hours of work, with the founder as the only fact-checker. [Rec] Daily is only viable if "trivia" is a **different, lighter unit** than a "story". See decision D2.
2. **The unit of content is undefined.** The brief says "stories, frameworks, ideas and trivia". The product ships one thing: a 9-card story plus quiz. Nobody has said what a daily trivia is, how long it takes, or how it relates to the story.
3. **The human curator has no home in the plan.** [Fact] No requirement shows who picked the story, why, or who checked it. The plan has a founder-only fact-check *process* but nothing the user can see. The human promise is currently invisible.
4. **No definition of "1% cooler".** The cool score (stories "owned" after two recalls over about a week) takes weeks to move. [Fact] On day one it shows 0. The central promise has no felt, same-day proof. This is the biggest retention risk in the design.
5. **Gamification arrived before the core was proven.** Points, spark, quests, chest, gems, badges, cool score, weekly tally, crews: nine mechanisms around a daily habit nobody has yet shown they want. Risk: reward overpowers learning.
6. **The social loop needs people who don't exist yet.** Crews work only once a user brings friends. A new user has none.
7. **Platform unresolved.** The plan says native (Expo). What exists is a web app. Notifications, the main daily trigger, behave very differently on native, Android web and iOS web. India is Android-heavy [Assumption, to verify with community data].
8. **Sign-in unresolved.** Plan says Google, Apple and phone codes. The live app uses email magic link (see 1.3).
9. **Copy drift.** The old landing page says 15 minutes a day and "weekday" language remains in the new page. These will need reconciling once cadence is decided.
10. **Plan size.** 16 units, 40 requirements, 11 migrations, 7 mascot poses for a team the founder has described as himself. [Rec] The plan is a good *map*, not a build order.

### 1.6 Retain, revise, remove, investigate
| Verdict | Item |
|---|---|
| **Retain** | Five-minute ceiling. Story-as-card-deck. "Best line to say out loud" question (the most original idea in the product). Lowercase voice. Palette and logo. 18+. Fact-check discipline. The community as a distribution asset. |
| **Revise** | Cadence (daily, with a lighter daily unit). Cool score (needs a same-day felt signal). Onboarding (value before sign-in). Sign-in method. Scoring location (move server-side before any competition or reward). Streak rules for a seven-day cadence. |
| **Remove or defer** | Gems, chest, badges, quests (until retention is proven). Combo counters. Theme weeks. Crew chat. Leaderboards. Any feature whose only reason is "Duolingo has it". |
| **Investigate** | Whether recall of old stories improves retention or just adds work. Whether people want a streak at all. Native vs PWA. Whether the "human behind it" claim lifts trust and sign-up. Willingness to pay. |

---

## 2. Missing inputs (I cannot assume these)

I have not seen any of the following and will not invent them. Each is a request to the founder.

1. **Waitlist data** from the live `makemecool` page: number of signups, source, WhatsApp opt-ins. This is the best demand evidence that may already exist.
2. **Community data:** Instagram and WhatsApp audience size and activity, event attendee mix (age, city, role), repeat-attendance rate, top-performing past content.
3. **Any past conversations** with members about curiosity, trivia, or learning (messages, event feedback forms).
4. **Team and time:** who writes, who checks, hours per week available, any budget for tools, an illustrator, or an editor.
5. **Business context:** is this a revenue product, a community-growth product, or a brand product for the events business? This changes everything in section 6.

---

## 3. Assumptions, ranked by risk

Risk = (damage if wrong) × (how little we know). The first three can each kill the product.

| # | Assumption | Type | Evidence today | Cheapest credible test |
|---|---|---|---|---|
| A1 | People will come back **daily** for a five-minute learning habit with no outside payoff | Adoption | None | Closed beta cohort in the real app (section 9) |
| A2 | The target user **feels** their conversations are stale and wants to fix it, enough to act | Problem | Founder intuition | 10 to 12 real interviews with Abstract members |
| A3 | Community members will become app users (community trust transfers) | Adoption | None | Waitlist analysis; opt-in rate on one broadcast |
| A4 | Story-quality content can be produced every day for a year | Feasibility | Estimate of 6 to 10 hours per story | Time-track producing 7 trivia items and 2 stories |
| A5 | A quiz and recall improve retention more than just reading | Solution | General learning-science belief only | Closed beta split: read-only vs read plus quiz |
| A6 | A visible human curator raises trust and return rate | Solution | None | Two waitlist-page versions, with and without the human-curator claim; compare signup rate |
| A7 | Weekend trivia gets used (people have time but different mood) | Adoption | None | Weekend usage in the closed beta |
| A8 | Friends will form crews | Social | None | Defer; test only after A1 holds |
| A9 | Users will pay, and for what | Business | None | Defer until retention is known |
| A10 | The "cool score" motivates | Solution | None | Show a mock score to interviewees; ask what it means to them |

**Riskiest assumption: A1, followed by A2.** If no one returns, nothing else matters. If the problem is felt only by people who already read widely, the market is narrow.

---

## 4. Problem hypotheses and discovery plan

### 4.1 Problem hypotheses (each can be proven wrong)
- **H1.** Working professionals who *want* to be more interesting lack **a low-effort reason and structure** to be curious, not time or access. *Falsified if* interviewees report plenty of curiosity input (reels, podcasts) and no felt gap.
- **H2.** The real pain is **social**: standing in a conversation with nothing to add. The reward is **the moment you say it out loud**, not the learning. *Falsified if* users describe knowledge-for-itself motivations.
- **H3.** People already consume lots of interesting content but **cannot retell it**. The product's job is retelling, not input. *Falsified if* users say they retell things fine.
- **H4.** Trust matters: in an age of AI and viral half-truths, users will value **"a person picked this and checked it"**. *Falsified if* no preference shows up in side-by-side tests.
- **H5.** The habit trigger is a **specific moment** (commute, bed, coffee), not a clock time. *Falsified if* users report no consistent moment.

### 4.2 How Might We (to carry into Develop)
- HMW make someone feel measurably more interesting **today**, not in three weeks?
- HMW make the daily item cost under two minutes so weekends and bad days still work?
- HMW show the human behind each item without it becoming marketing?
- HMW help someone **say** what they learned to a real person within 24 hours?

### 4.3 Discovery plan
Superseded: there is no time for a WhatsApp trial. See section 9 for the revised plan.

---

## 5. The sequence of decisions we need to make (in order)

Each depends on the one before. I want your call or evidence at each, in this order.

| # | Decision | Needs | Why this position |
|---|---|---|---|
| D1 | **Confirm the problem and the first user segment** (who exactly, and which pain) | Interviews, community data | Everything else is built on it |
| D2 | **Define the daily unit** (DECIDED: one full-length story every day, seven days a week); still needed: the measured hours per story and the staffing from section 8 | Seven-story production sprint | The only way daily is sustainable. Blocks cadence, content pipeline, streak rules |
| D3 | **Define the core loop and the "1% cooler" feeling** (what the user feels and can *do* the same day) | D1, D2 | Fixes the day-one-score problem |
| D4 | **Human curation promise and the workflow behind it** (what we claim, what we do, what AI does) | D2, your team capacity | We may only claim what we actually do |
| D5 | **Platform:** native, PWA, or web first, based on how reminders must work | Community device data | Notifications decide retention |
| D6 | **Entry and sign-in:** value before account; phone, Google or email | D5 | Directly affects activation |
| D7 | **Gamification scope:** what survives the cut | D3, retention evidence | Avoids reward overpowering learning |
| D8 | **Social:** crews or share-outward first | D1, A8 | Social must have people to use it |
| D9 | **Business model** | D1, D3 | Decide after value is clear |
| D10 | **Definition of the next coherent release**, its acceptance criteria and its metrics (AARRR) | D1 to D9 | The build contract |
| D11 | **Design, UX and content system** (templates, voice, curator signals) | D10 | Only after the experience is fixed |

[Rec] D1 and D2 are the two that cannot be skipped. With no time for a pre-build trial, the closed beta in section 9 is the test; keep the build to the core loop until it reads out.

---

## 6. What I would stop doing now

- Stop adding mechanics (quests, gems, badges, crews) before A1 is tested.
- Stop treating "weekday vs weekend" as a scheduling detail; it is a content-economics decision (D2).
- Stop shipping screens whose visual polish exceeds the evidence for the idea.
- Stop describing the product as "ready" until real users have returned on day two.

---

## 7. Questions I need answered (only the essential ones)

1. **Daily trivia: is it a lighter unit, separate from the longer story?** My recommendation: yes. A **60 to 90 second daily trivia** (one surprising fact, one question, one line to say), plus a **deeper story on weekdays**. This makes seven days sustainable. Your call.
2. **Can you share the waitlist and community numbers** listed in section 2?
3. **Who produces and checks the content, and how many hours a week?**
4. **Is this a revenue product, or a community and brand product?**

---

## 8. Staffing for one full-length story every day (decision recorded)

[Fact] Decision: every story is the same full length, seven days a week.
[Assumption] Hours per story: 6 to 10 (plan estimate, never measured). A reasonable split to test: research and sourcing 2 to 3, writing the cards 2 to 3, visual 1 to 2, quiz 0.5 to 1, fact-check 1 to 1.5.
[Fact] Seven stories a week is therefore 42 to 70 hours, of which 7 to 10.5 hours is fact-checking.

### What you need

| Role | Time | What they do | Why |
|---|---|---|---|
| **Fact-checker and editor** (first hire) | Part-time, 10 to 15 h/week | Checks every claim against two sources, signs every story, owns corrections. Independent of the writers. | The "real human checked this" claim must be true. This is the trust role. |
| **Writer-researcher** (second hire) | Full-time, about 40 h/week | Researches, drafts and builds the cards and quiz. At 8 hours a story this is about 5 stories a week. | The core production capacity. |
| **Second writer or freelance pool** | About 15 to 25 h/week, or 2 stories a week, paid per story | Covers the rest of the week, and takes weeks off. Community members and guest curators, credited by name. | Without this the full-time writer is a single point of failure, and the week cannot reach seven. |
| **Founder as chief curator** | 3 to 5 h/week | Chooses the themes, writes the curator note, gives final sign-off. No longer writes the bulk. | Keeps the voice and taste, which is the real differentiator. |
| **Engineer or contractor** | Part-time | App, instrumentation, content tooling. | Separate from content. |
| **Illustrator or designer** | A few hours a week, or a batch | Templated card visuals, our own, so no image licensing. | Cuts visual time and rights risk. |

Total content capacity: about 1.75 to 2.25 full-time-equivalents. I have not priced these; get quotes for your market.

### If you cannot hire yet (minimum path)
1. Hire the part-time fact-checker first. Founder plus one freelance writer produces the first stories.
2. Before launch, build a **21-story buffer**. At 6 to 10 hours that is 126 to 210 hours, three to five weeks of one full-time person. This buffer build is itself the first real time-tracking sample.
3. Open the freelance and guest-curator pool early.
4. Do not launch daily until the buffer exists. A daily promise broken in week two destroys the human-curation claim.

### Where AI can help without breaking the human claim
[Assumption] Could cut 25 to 35 percent of hours; measure it.
- AI may: gather and summarise candidate sources, draft quiz wrong-answers, reformat, check consistency, schedule.
- AI may not: choose the topic, verify a claim, or sign a story. A named person does those, and the app should say so.
- If AI reaches six hours a story or less, one full-time writer plus the part-time checker plus the founder can carry seven a week.

---

## 9. Revised discovery plan (no WhatsApp trial)

Fast, cheap, and built from what we already have. About two weeks.

1. **Interviews (days 1 to 7).** 10 to 12 real conversations with Abstract members. I write the guide at the next checkpoint.
2. **Existing data (days 1 to 3).** Waitlist and community numbers from section 2.
3. **Waitlist page copy test (days 2 to 7).** Two versions of the existing landing page: with and without the human-curator claim, and daily-every-day vs weekday wording. Measure signup rate. Cheap, no build.
4. **Seven-story production sprint (days 1 to 14).** Write seven full stories with the stopwatch on. This replaces the 6 to 10 hour guess with a real number and starts the buffer.
5. **Closed beta in the real app (starts when the buffer is ready).** About 100 people from the waitlist, 14 days, weekends included. This is now the test for A1, A5, A6 and A7. Instrument these events first: story started, story finished, quiz finished, day-2 and day-7 return, weekend return.
6. **Decision review.** Thresholds set before the beta starts, labelled as hypotheses.
