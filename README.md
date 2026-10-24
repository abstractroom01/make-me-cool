# make me cool

A daily story and quiz web app by The Abstract Room. One short story a day, told as swipeable cards, a four-question quiz that ends with the line you would actually say out loud, and a nudge to tell someone. Live at **https://makemecool.me**.

Curator: Sankalp Sharma, founder of The Abstract Room.

## What it does

- **Play without an account.** One story a day plus the last 7 days are free. Progress is kept on the device and merged into the account on sign-in.
- **Story deck.** About nine cards, plain language, every unfamiliar name or term explained on first use. Unconfirmed fun claims stay in, phrased as "some say" or "rumour has it".
- **Quiz.** Multiple choice, a forgiving fill-in, and a "which line would you say at a party" question.
- **Tell someone.** A share card (squares, day number, the line) and a link; the sharer is told when someone plays from their link.
- **Result.** The real artefact behind the story, a calm score (cool score out of 100, streak, badges), go-deeper picks (watch, listen, read, book, film, look), feedback and "spot a mistake".
- **Plus (₹99 for 30 days).** Full archive and "behind the story". One-time pass, no auto-renewal. Razorpay checkout, off until payments go live.
- **Account.** Email link or code sign-in, delete-my-account, and a hidden password sign-in at `/review` for payment-provider review.

## How it is built

- `web/` Next.js (App Router), React, Tailwind 4, Josefin Sans. Mobile first, checked from 320 to 1366 px.
- Supabase: Postgres with row-level security, email auth, Edge Functions (`create-order`, `verify-payment`, `razorpay-webhook`, `delete-account`).
- Razorpay for payments (signature-verified and idempotent), Vercel for hosting (a push to `main` deploys).
- Content lives in `web/src/data/` (stories, reveals, curator).

## Run it

```
cd web
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000. The variables are the Supabase URL and publishable key.

## Docs

- `docs/strategy/` decisions, discovery, concept, score and badges, scope, growth flows, monetisation, the readability and heuristics audit, and the reader test script.
- `docs/plans/` the product and technical plan.
- `docs/content/` brand copy and story packs.

## Status

Live and public. Stories are checked against their sources, and each says what is still open. Payments are built and the website is approved by Razorpay; they stay switched off until the end-to-end test payment is done.
