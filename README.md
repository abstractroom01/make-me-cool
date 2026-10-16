# make me cool

A daily story and quiz web app by The Abstract Room. One short story a weekday, a four-question quiz, and a streak.

- `web/` the Next.js app (sign-in with Supabase email magic link, profile, story deck, quiz, result, streak)
- `docs/plans/` the product and technical plan
- `docs/content/` brand copy and story packs
- `assets/brand/` logo files

## Run it

```
cd web
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000. Deploy `web/` to Vercel with the two variables from `.env.example`.
