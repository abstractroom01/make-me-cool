# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-10-29

## Product Overview
**One-liner:** one fascinating story a day, in five minutes, so you always have something cool to say at a houseparty.
**What it does:** a free web app (makemecool.me) that tells one true, fact-checked story a day as nine swipeable cards, then asks four questions. The last question is "which line would you actually say at a party?". Finishing gives you a streak, a cool score, a share card and a few things to watch, listen to or read next. No sign-up needed to play.
**Product category:** a daily learning habit for curious adults. Closest shelf: "daily 5-minute read" (like finshots for culture), plus quiz and streak games (wordle, duolingo).
**Product type:** consumer web app (mobile first, installable as a web page). Freemium.
**Business model and pricing:** free daily story, quiz, score, streak, badges, last 7 days of stories. Plus: ₹99 for 30 days (full archive, "behind the story" sources). One-time pass, no auto-renewal. 7 days of Plus free on sign-up. Payments via Razorpay, currently in test mode.

## Target Audience
**Target people:** working adults, 23 to 35, in India's big metros (mumbai, delhi ncr, bengaluru, pune, hyderabad, kolkata, chennai). Secondary: final-year students and young professionals who love quizzes, cinema, books, music and ideas.
**Decision-makers:** the user decides alone. It is free, so there is no buyer.
**Primary use case:** "i want to walk into any room and have something genuinely interesting to say, without spending hours reading."
**Jobs to be done:**
- functional: learn one real, surprising thing a day in five minutes
- emotional: feel curious again, not "brain rotted" by reels
- social: be the person with a take, a story, a reference nobody saw coming
**Use cases:** a morning coffee ritual; the commute; a break between meetings; getting something to say before a dinner or a date; sending the day's line to a friend.

## Personas
(consumer, so segments instead of buying roles; provisional, built from proxy evidence, see docs/marketing/icp-and-channels.md)
| Persona | Cares about | Challenge | Value we promise |
|---|---|---|---|
| The lapsed curious (25 to 34, metro, desk job) | feeling interesting again | the job and reels ate their curiosity | five minutes a day that count |
| The pop-culture nerd / quizzer (21 to 30) | film, music, books, trivia, being right | endless shallow trivia with no story | stories with a "wait, really?" and a source |
| The social connector (24 to 35) | being fun at gatherings | runs out of things to say | a line to say out loud and a share card |
| The abstract room member (existing community) | belonging to a smart, warm crowd | wants more of it between events | the daily ritual of the same community |

## Problems & Pain Points
**Core problem:** curiosity did not die, it lost its structure. "somewhere between the job, the deadlines and just one more reel, it all got quietly pushed aside."
**Why alternatives fall short:**
- reels and trivia pages are fast but forgettable, and often wrong
- long reads and podcasts need time people do not have
- learning apps teach skills, not conversation
- newsletters are one-way, nothing makes you retell it
**What it costs them:** conversations that go stale, nodding along at parties, a feeling of getting duller.
**Emotional tension:** quiet shame about not being the interesting one; fear of being "the person who just nods along when the conversation gets good."

## Competitive Landscape
**Direct:** finshots and similar daily 5-minute newsletters (daily, short, story-led, but about money or news, no quiz or retelling). Bournvita-style quiz pages and trivia apps (facts without a story).
**Secondary:** instagram and youtube "did you know" pages and reels (fast, free, unsourced, forgettable); blinkist and headway (book summaries, paid, solo); duolingo and wordle (streak and share mechanics, but not about culture or conversation).
**Indirect:** doomscrolling; wikipedia rabbit holes; podcasts; doing nothing; the abstract room's own events (offline, occasional).

## Differentiation
**Key differentiators:**
- every story is picked by a named person (sankalp sharma, founder of the abstract room), not a feed
- built around retelling: the quiz ends with the line you would say, and you are nudged to tell one person
- stories connect two subjects (film and psychology, food and history) and explain every unfamiliar term
- honest about what is shaky: unconfirmed claims are kept and labelled "some say" or "rumour has it", with sources
- no sign-up to play, mobile first, five minutes, free
- from the home of the abstract room (six years, 700+ events)
**How we do it differently:** a story plus a line to say out loud, from a real person, with the receipts.
**Why that is better:** it sticks because you say it to someone; you trust it because it shows its sources and its doubts.
**Why customers choose us:** it is quick, funny, true and makes them look good in conversation.

## Objections
| Objection | Response |
|---|---|
| "i don't have time" | five minutes, and you can leave and pick up later. |
| "is this just clickbait trivia?" | every story lists its sources and what is still open. we label rumours as rumours. |
| "another app to remember" | it is a web page, no install. one tap adds a daily reminder to your calendar. |
| "why would i pay?" | you don't, the daily story is free. plus (₹99) is for the archive and the sources behind each story. |
**Anti-persona:** people who want exam GK prep (UPSC, banking), under-18s, and people who want long-form academic depth.

## Switching Dynamics
**Push:** doomscrolling guilt; stale conversations; feeling dull.
**Pull:** a small daily ritual that makes you interesting; a share card friends react to.
**Habit:** reels, news apps and the 11 pm scroll.
**Anxiety:** "will it waste my time?", "is it going to spam me?", "is it accurate?"

## Customer Language
(no first-party customer quotes yet; the founder's own words from the landing page are the closest proxy. Replace with real quotes after the first feedback.)
**How they describe the problem:**
- "we've stopped being curious."
- "somewhere between the job, the deadlines and just one more reel."
- "nobody wants to be the one at the party who just nods along."
**How they describe us:** to be collected (feedback and "did you like it" reasons are stored in `story_feedback`).
**Words to use:** story, five minutes, something to say, houseparty, cool, retell, "say it out loud", curious.
**Words to avoid:** hustle, content, learn faster, optimise, brain hack, gamified, "unlock", "level up", AI-powered.
**Glossary:**
| Term | Meaning |
|---|---|
| the line | the one sentence you would say out loud |
| cool score | a number out of 100: share of recent story days you finished and told someone |
| the real thing | the artefact behind a story, shown after the quiz |
| plus | the ₹99 pass for the archive and sources |

## Brand Voice
| Attribute | Means | Doesn't mean | Example line |
|---|---|---|---|
| playfully smug | a show-off friend who knows the film you haven't seen | actually mean | "a film teacher made people cry using soup." |
| plain | short words, lowercase, one idea per sentence | slang for its own sake | "five minutes a day. one interesting thing." |
| honest | says what is shaky | hedging everything | "some say. we couldn't confirm that." |
| warm underneath | drops the act for something moving | saccharine | "an object can carry a person." |
| curious | genuinely interested in odd corners | listicle clickbait | "who invented chicken tikka masala?" |
**Tone by context:**
- support: kind, quick, no jokes about their problem
- launch: confident, a bit cheeky, always with a real story as the hook
- errors: plain and apologetic ("we couldn't delete your account. please email us.")
- sales: barely sells; "pay once, no auto-renewal"
- social: a hook, one fact, a line to say; no hashtags walls
**Terms we own:** "something to say out loud", "the line", "cool score", "a real person picks every story".
**Never use (and why):** "AI-powered" (a real person picks, AI only polishes language); "fact-checked" without sources next to it; fake urgency and "hurry" (against the abstract voice).

## Proof Points
**Metrics:** the abstract room: six years, 700+ gatherings, 7 cities, 15+ countries; "80,000+ community" is the figure on the site (earlier public pages cite about 3,100 members: confirm which is current before using it in outreach). make me cool: 7 stories live, 4-question quiz, 9-card format.
**Customers:** none yet.
**Testimonials:** none yet. Collect from the first 50 players ("did you like it" + one-line reason).
**Value themes:**
| Theme | Proof |
|---|---|
| a real person picks | the curator card and "how our stories are made" page |
| shows its receipts | sources and "what's still being checked" on every story |
| fast | about 5 minutes, 9 cards, 4 questions |
| social | share card with result squares and a link |

## Goals
**Business goal:** 1,000 people who play at least one story within 10 days of the push, with zero paid spend, then a repeat habit (day-7 return) before any monetisation push.
**Conversion action:** play today's story (no sign-up), then sign in to keep the streak.
**Current metrics:** to be measured from `events` (landing_viewed, story_started, story_finished, share_tapped) and Microsoft Clarity.

## Paid Ads (optional)
Not applicable. Zero budget.

## Learnings
*Decisions and tested lessons. Newest first.*
| Date | Learning | Evidence | Applies to | Status |
|---|---|---|---|---|
| 2026-10-29 | A daily product cannot be marketed while its content runs out in 2 days; the content buffer is a launch gate. | stories end 30 Oct | launch timing | active |

## Changelog
*Newest first.*
- v1 (2026-10-29) — Initial context, drafted from the codebase and docs for the 10-day zero-budget launch.
