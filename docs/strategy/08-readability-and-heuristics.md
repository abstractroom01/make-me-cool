# 08 · Readability audit and design heuristics

Status: October 2026. **The ICP walkthroughs below are synthetic**: I (Claude) read each story as if I were that person. They find likely problems; they are not evidence. Real readers come next (see "what to test with real people").

## 1. Measured readability (all 7 sample stories)

Run with `readability.mjs` over the story cards. Reading ease 60–70 is "plain english".

| story | words | avg sentence | reading ease | grade |
|---|---|---|---|---|
| kuleshov | 185 | 8.4 | 88 | 3.1 |
| tikka | 196 | 12.3 | 72 | 6.2 |
| klingon | 203 | 10.7 | 71 | 6.1 |
| mozart | 237 | 10.8 | 72 | 5.9 |
| trolley | 196 | 8.9 | 81 | 4.1 |
| wave | 130 | 8.7 | 83 | 3.9 |
| yosegaki | 165 | 9.2 | 71 | 5.6 |

All sit well under grade 7. Sentence length is fine. The remaining risk is **unexplained names and terms**, which this score cannot see. That is where the rewrite concentrated.

## 2. Synthetic ICP walkthroughs

| reader | what they likely stumble on | change made |
|---|---|---|
| 24, first job, scrolls on a phone | long cards; "what is this for?" | 9 short cards, "about 5 minutes" shown up front |
| 31, ops manager, knows no film theory | "lev kuleshov", "montage", "the cut" | name and term explained in the card where they first appear |
| 28, non-native English reader | idioms, long clauses | shorter sentences; plain words ("a bit like a small tram") |
| 38, parent, skeptical, two minutes at night | "why should i believe this?" | each story says why it was picked and what is still unchecked |
| 26, quiz-averse | fear of being marked wrong | "i'm not sure, show me the answer"; forgiving fill-in matching |
| 35, curious but not a culture person | references like "klingons", "IQ", "trolley problem" | each defined in a short phrase on first use |

Assumptions we found and fixed: klingons, chicken tikka masala, IQ, the trolley problem, "hinomaru", "yosegaki", Hokusai's wave, Mozart's K.448 and "montage".

## 3. "Did you like it?" and resources

- After each story: thumbs up / "not really", optional reason chips, and "spot a mistake or something confusing?". Stored in `story_feedback` (anonymous id for guests).
- Resources are now typed and shown with icons: watch, listen, read, book, film, look. Each story mixes formats, not just articles. Shown on the result screen (top 2) and a "go deeper" page (all).
- Read the feedback weekly. A story with repeated "too hard to follow" or "unexplained terms" gets rewritten before it is reused.

## 4. Nielsen's 10 heuristics applied

1. **Visibility of status** – 3-step progress bar, "card x of 9", streak chip, "about 5 minutes · 9 cards · 4 questions".
2. **Match with the real world** – plain lowercase language; "say it out loud", "go deeper", "rest day".
3. **User control and freedom** – back button follows phone history; leaving the quiz asks first; skip a question; Enter to continue.
4. **Consistency** – one button style, one card style; same words for the same things.
5. **Error prevention** – confirm before leaving the quiz; type "delete" to delete the account.
6. **Recognition over recall** – options shown, not typed from memory; "?" help always in the header.
7. **Flexibility and efficiency** – guest play with no sign-up; Enter key; shareable links per story.
8. **Aesthetic and minimal design** – removed points tiles, curator sign-off line, rabbit-hole duplicate list, repeated explanations.
9. **Help users recover from errors** – close-enough answers still count; clear messages when delete fails (with email fallback).
10. **Help and documentation** – "how it works" page (menu and "?"), "how our stories are made" at /how, "how is the cool score worked out".

## 5. Duolingo patterns borrowed (and not)

Borrowed: short daily session, progress bar, bottom feedback after each answer, a celebratory finish, skip, reminder, streak with a forgiving rest day, a report-a-problem route.
Not borrowed on purpose: hearts or punishment for mistakes, aggressive guilt notifications, leaderboards. Mistakes cost nothing here.

## 6. What to test with real people

- Five people from the ICP, one story each, think-aloud, no help. Note every pause and every question they ask.
- Ask them to retell the story to you. If they cannot, the story failed, not them.
- Compare thumbs-down reasons after the first 50 plays.

Everything above remains a hypothesis until then.

## 7. Tested on the web app (phone size, 375x812)

Checked on the live site and a local build:
- deck: progress bar present, "1 / 9" counter, no horizontal overflow on any card.
- quiz: leaving after picking an answer asks to confirm; "i'm not sure" shows the answer; Enter checks; wrong answers explain why.
- result, "go deeper", help and /how screens: no overflow; feedback saves to the database (test row removed).
- all 23 resource and source links respond; two (Air & Space, the Met) block automated checks but are real pages.

Problems found and fixed:
1. the fill-in box gave no hint what to type: now says "one word".
2. wrong answers could say "close. but no." even when far off: replaced with neutral lines.

Not tested: account deletion on a real account, and email sign-in on this build. Still synthetic: all reader walkthroughs.

## 8. Heuristic evaluation of the running app (22 Oct 2026, 375px phone view)

Walked landing, story deck, quiz, share, result, Today, "go deeper", help and /how. Scored by Nielsen heuristic; severity 1 (cosmetic) to 3 (serious).

| # | heuristic | finding | sev | status |
|---|---|---|---|---|
| 1 | visibility of status | result showed "10 cool score" with no scale | 2 | fixed: now "10/100" |
| 6 | recognition over recall | guest Today had no sign-in near the top; only a card far down | 2 | fixed: "sign in" link in header jumps to it |
| 4 | consistency | header pills wrapped onto two lines on a phone ("plus · 7 days free", "1 day", "sign in") | 2 | fixed: shorter labels, no wrapping |
| 8 | aesthetic design | hero text sat on a busy photo, weak contrast | 2 | fixed: darker overlay |
| 9 | error recovery | fill-in box gave no hint what to type | 2 | fixed earlier: "one word" |
| 9 | error recovery | wrong answers could say "close" | 1 | fixed earlier |
| 2 | real-world match | "wrong, but bold" is flippant for a hard-won wrong answer | 1 | open (brand voice call) |
| 10 | help | "behind the story (plus)" is unclear to a new user | 1 | open |
| 7 | flexibility | no way to resume mid-story after closing it | 2 | open |

Still open ideas: save quiz progress if the phone sleeps; larger card text option; a tiny "what's plus?" line on the paywall.
