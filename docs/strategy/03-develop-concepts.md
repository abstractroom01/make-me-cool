# Abstract: Develop (diverge, then a recommended convergence)

Checkpoint 3. Builds on `00-decision-log.md`, `01-...` and `02-...`.

Anchor: **the centre of the product is retelling.** The person can say it out loud the same day. Everything below is judged against that.

Labels: [Fact], [Hypothesis], [Rec]. Scores are **my judgement**, not data. They exist to force trade-offs into the open, and they should be argued with.

---

## 1. Fixed constraints (from decisions already made)

- One full-length story every day, seven days a week.
- A real human curator is visible; AI does not pick, verify or sign.
- A five-minute ceiling.
- Android-first [Fact: Android is about 92 to 93 percent of Indian mobile use in recent StatCounter snapshots].
- No pre-build trial; learning comes from interviews, existing data, a copy test and a closed beta.
- A small team, and fact-checking is the content bottleneck.
- No manipulative mechanics: nothing that disorients (Gruen transfer), and no punishing a missed day.

## 2. Outcome and opportunity tree

```
Outcome: more people say something interesting, to a real person, the same day they learn it
├── O1  Make the story easy to retell (compress it into a tellable shape)
│     ├── C-A  Daily deck with a "line to say" step (today's baseline)
│     ├── C-B  Retell-first: a one-tap "tell someone today" and a next-day "did it land?"
│     └── C-C  Voice rehearsal: say it out loud into the phone
├── O2  Meet the moment when the story is actually needed
│     └── C-D  Tonight mode: pick tonight's occasion, get a short repertoire
├── O3  Make the stories last, so they can be reused weeks later
│     └── C-E  Repertoire: your personal collection of stories you can tell
├── O4  Make the human behind it the reason to return
│     └── C-F  Curator-led daily dispatch
├── O5  Give people someone to tell
│     └── C-G  Pair retell game
└── O6  Meet people where they already are
      └── C-H  Messaging-native delivery, app second
```

---

## 3. The eight concepts

For each: what it is, the mechanism, the bet, the cost, the cheapest way to learn, and the downside.

### C-A. Daily deck with a "line to say" step (the baseline)
- **What:** one story as swipeable cards, a four-question quiz, the last question picking the best line to say. This is what is built today.
- **Mechanism:** structured consumption plus a prompt that models the retell.
- **Bet:** modelling the line is enough to make people retell.
- **Cost:** built. Low.
- **Learn:** closed beta; track how many return the next day.
- **Downside:** completion is not retelling. A user can finish and never say a word to anyone.

### C-B. Retell-first
- **What:** the story ends with "who will you tell this to today?" One tap sends a ready, human-written retell card to a person on WhatsApp. The next day the app asks one question: "did you tell it? how did it land?"
- **Mechanism:** an explicit commitment at the peak, then a follow-up. The follow-up creates the real-world proof of "cool".
- **Bet:** a small commitment device turns knowing into telling. This is the one concept built directly on the centre.
- **Cost:** low to medium. Share cards, a follow-up prompt, one new event type.
- **Learn:** share-tap rate and next-day "told it" rate in the closed beta.
- **Downside:** self-reported; people may say "yes" to please the app. Needs a guard against nagging.

### C-C. Voice rehearsal
- **What:** after the story, say it out loud to the phone for 20 seconds. Private; nothing is shared. A short playback, a quiet "you said it" tick. Optionally a human-written model retell to compare with.
- **Mechanism:** practising the act itself lowers the barrier to doing it live.
- **Bet:** rehearsal is where fluency comes from, as in language apps.
- **Cost:** medium. Microphone permission, audio handling, privacy. No AI grading is needed for the first version.
- **Learn:** record-tap rate; interview reaction to saying it aloud.
- **Downside:** many people will not talk to their phone in public. Strong in private, useless on a commute.

### C-D. Tonight mode
- **What:** "I'm going out tonight." Pick the occasion (dinner, date, party, work lunch). Get three short stories chosen for it and a one-line opener for each.
- **Mechanism:** pull, not push, tied to a real moment of need.
- **Bet:** the highest-value moments are specific events, and people would open an app for them.
- **Cost:** medium. Needs tagged stories and an occasion model, plus a library big enough to be useful.
- **Learn:** interview question 1 and 4; fake-door button in the closed beta.
- **Downside:** needs a library before it is useful. A cold-start problem in month one. Also uses stories more than once, which is good but needs a content plan.

### C-E. Repertoire
- **What:** every story you finish goes into "your repertoire", the stories you can tell. Over time you see its size, your range across subjects, and which ones are fading from memory.
- **Mechanism:** collection, progress and mastery. The existing plan's ownership and cool score live here.
- **Bet:** a growing, visible repertoire makes "1% cooler" tangible over weeks.
- **Cost:** medium to high (recall scheduling, scoring).
- **Learn:** whether users open the repertoire at all; day-14 return.
- **Downside:** slow reward, and it risks feeling like homework. Weakest on day one, which is when retention is decided.

### C-F. Curator-led daily dispatch
- **What:** the product is a named person's daily voice. Each story arrives as "today's dispatch from [curator]", with a two-line note on why they picked it and what they could not confirm. Guest curators and the community's own contributors rotate in.
- **Mechanism:** parasocial trust and identity. People return for a person and a taste, not just a fact.
- **Bet:** in a feed of anonymous or AI-generated content, a human with a recognisable taste is the moat.
- **Cost:** low in build, **high in people.** It depends on the curator and the staffing plan.
- **Learn:** the with/without curator copy test and the beta comparison.
- **Downside:** depends on one person; if the curator is unavailable or loses taste, the product weakens.

### C-G. Pair retell game
- **What:** send the story to one friend. They retell it back in their own words within 24 hours. Both see a small "you both got it" moment.
- **Mechanism:** social accountability and a real audience for the retell.
- **Bet:** having someone to tell is the missing piece.
- **Cost:** medium to high. Invites, matching, notifications.
- **Learn:** invite-send rate and pair completion.
- **Downside:** cold start. A new user has nobody. Works only after trust in the core loop is proven.

### C-H. Messaging-native delivery, app second
- **What:** the daily story is delivered where people already are (WhatsApp, or email). They read, then reply with their retell. The app is the deeper layer.
- **Mechanism:** remove the install and sign-in friction.
- **Bet:** the barrier is the app, not the content.
- **Cost:** low build, but depends on third-party messaging rules, opt-in and sending costs [Hypothesis: to verify; I have not researched WhatsApp business rules].
- **Learn:** opt-in and day-7 read rate. (Note: the founder has ruled out a pre-build trial, so this would be a delivery decision, not a test.)
- **Downside:** we lose control of the experience and the data; delivery rules can change.

---

## 4. Evaluation

Scores 1 to 5, 5 is best. My judgement, to be argued with.

| Criterion | A Deck | B Retell-first | C Voice | D Tonight | E Repertoire | F Curator | G Pair | H Messaging |
|---|---|---|---|---|---|---|---|---|
| Centres on retelling | 3 | **5** | 4 | 4 | 2 | 3 | 5 | 2 |
| Useful the same day | 3 | **5** | 3 | **5** | 1 | 3 | 4 | 3 |
| Habit without manipulation | 3 | 4 | 3 | 2 | 3 | 4 | 3 | 4 |
| Makes the human visible | 2 | 3 | 2 | 3 | 2 | **5** | 2 | 3 |
| Cost to build (5 = cheap) | 5 | 4 | 2 | 3 | 2 | 4 | 2 | 4 |
| Cost to content (5 = cheap) | 3 | 4 | 4 | 2 | 3 | 3 | 4 | 4 |
| Differentiated from reels and microlearning apps | 2 | 4 | 4 | 4 | 2 | 4 | 4 | 2 |
| Works for a new user on day one | 4 | 4 | 3 | 2 | 1 | 4 | 1 | 4 |
| **Total (of 40)** | **25** | **33** | **25** | **25** | **16** | **30** | **25** | **26** |

**Reading it:**
- **B (retell-first) and F (curator-led) lead.** They are the two that attach most directly to the centre and to the human differentiator.
- **E (repertoire)** scores worst because its payoff is slow and the product's first week decides retention. It should be a long-term layer, not the headline.
- **G (pair) and D (tonight)** are strong but depend on things we do not have yet: a library and other people.
- **H (messaging)** is cheap but trades away control. Best treated as an acquisition channel, not the product.

---

## 5. Recommended convergence (draft, for your decision)

[Rec] A **combination, not a single concept**, built in layers:

1. **Core (must):** A + B. The daily story deck, ending in a one-tap "tell someone today" and a next-day "did it land?". The metric of success is **told it**, not completed.
2. **Identity (must):** F. Every story is a named curator's dispatch with a short note on why it was picked and what could not be confirmed. This is where the human is felt, and it costs minutes per story.
3. **Second hook (should, after the core reads out):** D. Tonight mode, once there are enough stories to serve it.
4. **Long-term memory (could):** E in a light form: "stories you can tell", without a score.
5. **Later (could/won't now):** C voice rehearsal as an optional private mode; G pair retell once there is evidence of sharing.
6. **Channel, not product:** H. Use WhatsApp or email for reminders and delivery to the existing community if rules permit.

**What this deliberately leaves out for now:** gems, quests, badges, leaderboards, a cool score, and crews as a launch feature. They do not serve retelling, and our own audit found them premature.

**Why this beats the alternatives**
- It is the only combination that makes the central claim, "you can say it out loud today", something the app can actually measure and celebrate.
- It uses the strongest existing asset (the Abstract community and its human taste) rather than competing on content volume with reels.
- It is cheap to build on what already exists (cards, quiz, share).

---

## 6. Risks to the recommended direction

1. **"Told it" is self-reported.** Mitigation: ask lightly, never reward it with points that can be farmed; treat it as a signal, not a score.
2. **Nagging the next-day question.** Mitigation: one question, once, easy to dismiss, never tied to the streak.
3. **The curator becomes a single point of failure.** Mitigation: guest curators and credited contributors from the start.
4. **Sharing to WhatsApp can feel like spam.** Mitigation: the share card is a human-written retell, not an ad; test in the beta.
5. **Daily seven-day cadence strains the content team** (staffing, see checkpoint 1 section 8).

## 7. What I would measure first (hypotheses, to calibrate)

- Share of finished stories that lead to a share tap.
- Share of share-tappers who answer the next-day question, and what they say.
- Day-2 and day-7 return, split by whether they tapped share.
- With and without a curator note: completion and return.

---

## 8. Decisions needed from you

1. **Approve the layered direction** in section 5, or tell me which concept you want to promote or drop.
2. **Is the curator the founder, a hired writer, or a rotation?** This shapes concept F and the brand voice.
3. **Next checkpoint (Deliver and flows):** I will define the next coherent release, its acceptance criteria, the full user flow charts, the AARRR metrics and the Nielsen heuristic review, based on the layered direction.
