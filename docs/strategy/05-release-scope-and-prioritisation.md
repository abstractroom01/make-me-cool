# Abstract: the next coherent release, MoSCoW and acceptance criteria

> **Update 2026-10-19 (see `07-monetisation-and-public-launch.md`):** Release 1 is now a **staged public launch**, not a closed beta, and it **includes payments** (a freemium paid layer). Where this document says "closed beta" or lists payments as "won't now", document 07 wins.


Checkpoint 5 (Deliver, part 1). Builds on `00-decision-log.md` to `04-cool-score-and-badges.md`.

Labels: [Fact] sourced or observed. [Decision] founder decided. [Hypothesis] untested. [Rec] my recommendation.

---

## 1. The release in one paragraph

**Release 1, "tell it":** a person signs up in under a minute, gets one full-length story a day (seven days a week) from a named curator, finishes it in five minutes, commits to telling someone, sees an honest cool score and a badge when earned, and is asked the next day whether they told it. It is a closed beta of about 100 people from the waitlist, not a public launch.

[Rec] This is the smallest release that delivers the promise ("say it out loud today") and lets us measure whether it works. Anything that does not serve that, or is not needed to measure it, is out.

---

## 2. Platform decision (D5): recommendation

[Fact] Android is about 92 to 93 percent of Indian mobile OS share in recent StatCounter snapshots (see checkpoint 2). [Fact] On iOS 16.4 and later, web push works only for web apps the user has added to the home screen, needs a web app manifest, and the permission request must follow a user tap ([Notificare](https://notificare.com/blog/2024/09/16/web-push-in-ios-add-to-home-screen/), [OneSignal docs](https://documentation.onesignal.com/docs/web-push-for-ios)). Some developers report iOS web push occasionally stopping ([GoodBarber](https://goodbarber.com/blog/ios-16-4-and-web-push-notifications-a1240) and the OneSignal notes). I did **not** verify Android Chrome push requirements in this session; I believe it is broadly supported, to confirm.

| Option | Pros | Cons |
|---|---|---|
| **Installable web app (PWA) first** | Builds on the web app that already exists. No store review. Fast to iterate. Good fit for Android-first. Share links work natively. | iOS push needs home-screen install, which most people will not do. Weaker presence on the phone. |
| Native (Expo) first | Best notifications and presence. App store credibility. | Slowest. Store review, two platforms, the plan's 16 units. Least compatible with "no time". |
| Messaging-native (WhatsApp) | No install | Per-message costs and rule risk (below). Loses control of the experience. |

[Rec] **PWA first, designed to be wrapped as a native app later** if the closed beta shows people return. Treat reminders as a **must**, delivered by whichever channel works: web push (Android and installed iOS), email as a fallback, and WhatsApp only if the numbers justify it.

**WhatsApp cost, with a warning.** [Fact] Meta now charges per message, with some service-window messages free; third-party guides put India marketing messages at about ₹0.78 to ₹1.10 each and utility messages around ₹0.11 to ₹0.25, but they disagree, and one source claims further changes from October 2026 that I could not confirm ([Meta pricing page](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing), [AiSensy note](https://m.aisensy.com/blog/whatsapp-pricing-update-october-2026/)). Illustrative arithmetic, not a quote: at ₹1 a message, a daily reminder to 1,000 people is about ₹30,000 a month. Check Meta's India rate card before relying on it.

---

## 3. Product-level MoSCoW

| Priority | What | Why |
|---|---|---|
| **Must** | One full-length story a day, seven days a week, in a swipeable deck with the five-minute ceiling | The core promise |
| **Must** | The quiz, ending in the "best line to say" question | Models the retell |
| **Must** | Retell-first: "tell someone today" one-tap share, and the next-day "did it land?" | The centre of the product |
| **Must** | Named curator dispatch: curator name, why picked, what could not be confirmed | The human differentiator; costs minutes per story |
| **Must** | Cool score (7, 30, 90, 365-day rate) and the "today you became X% cooler" moment | Founder decision 10 and 11 |
| **Must** | Streak counter with one rest day a week; 12 badges | Founder decision 10 |
| **Must** | Sign-in and a minimal account (name, handle, 18+ confirmation, timezone) | Needed to count anything per person |
| **Must** | A daily reminder at a time the user picks, over a channel that works | The daily trigger |
| **Must** | Landing and first-run that show value before sign-in | Activation |
| **Must** | Privacy notice, consent, account deletion | Legal baseline (legal review advised) |
| **Must** | Analytics events and a simple metrics view (checkpoint 6, section 8) | Without it we cannot learn |
| **Must** | A content pipeline that produces and checks 21 stories before the beta | The daily promise needs a buffer |
| **Should** | "Moment of the day" picker (commute, meal, bed) tied to the reminder | Stronger habit cue, hypothesis H5 |
| **Should** | Rabbit-hole links after a story | Depth for the curious; cheap |
| **Should** | A light library of past stories (no scoring effect) | Needed once there are more than a few stories |
| **Should** | Hide-the-score setting and a plain "how is this calculated?" page | Respect and trust |
| **Could** | Tonight mode | Second hook, once there is a library |
| **Could** | Voice rehearsal | Optional private mode |
| **Could** | A light repertoire ("stories you can tell"), no score | Long-term memory |
| **Could** | A curated quote bank on the result screen | Delight; needs rewriting and credit rules |
| **Won't now** | Gems, quests, chest, leaderboards | Decision 10; reward without proof of value |
| **Won't now** | Crews, nudges, pair retell game, chat, community feed | Cold start and moderation load |
| **Won't now** | Recall of old stories and ownership scoring | Deferred, costs content and build |
| **Won't now** | Animated character, theme weeks | Polish before proof |
| **Won't now** | Subscription or any payment | Value and willingness to pay unknown |
| **Won't now** | Native store apps | PWA first (section 2) |

---

## 4. Feature-level analysis (Musts and the main Shoulds)

Columns: problem it solves; value (user and business); evidence; dependencies; build and operating cost; risks; success metric (hypothesis); priority and why.

| Feature | Problem solved | Value | Evidence | Dependencies | Build / ops cost | Risks | Success metric (hypothesis) | Priority |
|---|---|---|---|---|---|---|---|---|
| Daily story deck (7 days) | Nothing interesting and tellable to say | User: a story each day. Business: the daily habit | [Hypothesis] founder intuition; built and working | Content pipeline | Build: built. Ops: **high** (42 to 70 h a week at plan estimates) | Content burnout, quality drop | Day-2 and day-7 return | Must |
| Best-line quiz question | Knowing but not being able to say it | Models the retell, the product's most original step | [Hypothesis] | Story content | Low | Feels like a test | Share who pick the "uses the idea" option; retell rate | Must |
| Retell-first (share + next-day question) | Learning is never used | The centre of the product; gives real-world proof | [Hypothesis] | Share card, scheduler, event tracking | Low to medium | Self-report bias; feels like nagging; spammy share | Share tap rate; told-it rate; day-7 return for tellers vs non-tellers (correlation caveat) | Must |
| Curator dispatch | "Is this real? Who picked it?" in an AI-flooded feed | Trust; the human differentiator | [Hypothesis]; to test with the waitlist copy test and beta split | Founder time; fact-check workflow | Low build; **ops depends on the founder** | Single point of failure; over-claiming | Trust question in interviews; retention with vs without note | Must |
| Cool score (4 windows) | "Am I getting anywhere?" | Visible progress that recovers | [Hypothesis] | Score engine, events | Medium (server-side compute) | Gaming told-it; confusing maths; guilt | Score viewed; return after a score drop | Must |
| "Today you became X% cooler" | Needs a felt same-day payoff | Peak moment | [Hypothesis] | Score engine | Low | Silly numbers at low base (guarded) | Day-2 return, shown to a random half in the beta | Must |
| Streak + rest day | Habit scaffolding | Cue and commitment | Secondary sources: Duolingo-style streak effects are correlational ([growth write-up](https://marishalakhiani.substack.com/p/breaking-down-duolingos-growth-model)) | Event log | Low | Guilt on break | Return within 3 days of a first miss | Must |
| 12 badges | A tangible record | Memory; delight | [Hypothesis] | Events | Low | Badge farming; clutter | Users with a badge by day 14 | Must |
| Daily reminder | No trigger | The daily cue | [Fact] push constraints on iOS; Android to verify | PWA manifest, push service | Medium | Low iOS opt-in; notification fatigue | Reminder opt-in; reminder-to-open rate | Must |
| Landing and first-run | People don't know why to start | Activation | [Hypothesis] | Copy | Low | Copy not landing | Visit to signup; signup to first story | Must |
| Sign-in | Identity needed to count anything | Activation | [Fact] email magic link failed in our own test; fallbacks needed | Provider choice (D6) | Low to medium | Friction; email limits | Sign-in completion rate | Must |
| Analytics events | Can't learn without it | Learning | n/a | Event schema | Low to medium | Privacy, over-collection | Events arriving; data quality checks | Must |
| Moment-of-day picker | Reminder at a useless time | Better cue | [Hypothesis H5] | Reminder system | Low | Extra step in first run | Reminder-to-open rate by moment | Should |
| Library | No way back to a good story | Retention; replay | [Hypothesis] | Many stories | Low | Replay inflates the score (guard: replays do not count) | Library visits | Should |

---

## 5. User-testable and later

**Testable in the closed beta:** value of the story and quiz; retell-first (share and told-it); the "cooler" moment; the curator note; reminder timing; the score's clarity; day-2, day-7, day-14 return, weekdays vs weekends.

**Not testable yet (and not claimed):** referral growth, revenue, long-term (90 and 365-day) score behaviour, crews, anything needing a big content library.

---

## 6. Acceptance criteria for Release 1 (the beta)

Each is testable by a person without reading the code.

**Entry and activation**
1. A new person can reach the first story within about a minute of opening the app, with no more than three short screens before it.
2. Sign-in works on an Android phone on mobile data, end to end, without the user leaving and being unable to return.
3. The 18+ confirmation, a consent notice and the privacy link appear before an account is created. A user can delete their account and data from settings.

**The daily loop**
4. A story is available on every day of the week, including weekends, with the curator's name and a short "why I picked this" note.
5. A story takes no more than about five minutes; the deck has a progress indicator and a button alternative to every swipe.
6. The quiz ends with the best-line question and shows a one-line reason after answering.
7. After the quiz the user is asked who they will tell today and can send a share card in one tap.
8. The next day the user is asked once whether they told it and how it landed. It can be dismissed, and it never affects the streak.

**Score, streak, badges**
9. The 7-day cool score is shown after a finished story and equals the formula in `04-cool-score-and-badges.md`. The 30, 90 and 365-day windows are hidden until they unlock.
10. "Today you became X% cooler" appears only when the before-score is at least 20 and X is at least 1; otherwise the plain move is shown.
11. A missed day uses the one free rest day first; a day with no published story never counts against the user.
12. Each of the 12 badges is awarded only on its stated condition, shows what earned it, and is never removed.
13. The score can be hidden in settings, and "how is this calculated?" explains it in plain words.

**Reminders**
14. The user can pick a time (and, if offered, a moment of the day). A reminder arrives at that time on Android; iOS behaviour is documented, including the home-screen requirement.

**Content and the human claim**
15. At least 21 stories are finished and fact-checked before the beta opens.
16. Every story marked "checked" has a named checker and two sources per claim on record. The app makes no claim the workflow does not support.
17. Disputed claims show a visible "contested" note on the card.

**Measurement**
18. Every event in section 8 of checkpoint 6 fires with the right properties, and a simple view reports the AARRR metrics.

**Quality**
19. The app works with the device's reduced-motion setting and a larger text size, and every control is reachable by thumb and meets the minimum touch size.
20. Typeface is Josefin Sans; body text readability is checked at the smallest size used.

---

## 7. Exit criteria for the beta (hypotheses, set now, calibrate after)

The beta is judged **before** it opens, not after. Proposed gates, all hypotheses:
- **Continue** if a meaningful share of beta users return on day 7, and a meaningful share of finishers answer "I told it" yes. What counts as "meaningful" must be set with the founder before the beta, from interviews and any waitlist baseline.
- **Change** if people finish but never tell: the loop teaches but does not change behaviour.
- **Stop and rethink** if day-2 return is very low.

I will not invent thresholds. We calibrate them from the first interviews and the existing waitlist, then freeze them.

---

## 8. What follows after the beta (not now)
Tonight mode; light repertoire; voice rehearsal; native wrap; referral mechanics; crews or pair retell; anything with a payment. Each only if the beta says the core works.
