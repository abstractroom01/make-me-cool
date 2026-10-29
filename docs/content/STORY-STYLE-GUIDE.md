# story style guide (what every story must be)

Read this before drafting. `npm run check:stories` enforces the mechanical parts.

## voice
- all lowercase. short sentences. warm, a bit smug, never mean. no "hurry", no "don't miss out".
- the `why` starts "i picked this because...". the first-person is sankalp.
- tell it as scenes. the hook is a scene or a surprising claim, never a dry fact.

## shape (checked by the validator)
- 8 to 10 cards: first is a `scene`, one `say`, last is `crew`. under about 450 words in total, no card over 70 words.
- at least two fields. the first field is the primary one for rotation: no primary field repeats within 5 days.
- quiz is exactly: mcq, mcq, fill ("finish the line", echoing the takeaway), line ("which would you say?").
- one takeaway line a person could say out loud, and one conversation starter.
- dates are continuous, one story per day.

## honesty (the brand promise)
- every claim comes from a source you opened. 2+ sources, 3+ resources of mixed types (watch, listen, read, book, film, look).
- the caveat starts "checked on <date> against the sources listed. still open: ..." and says plainly what is disputed.
- contested claims are hedged in the text ("some say", "the story goes", "is quoted as"), not dropped.
- legends are labelled as legends. no invented numbers, no quotes you cannot source.
- avoid medical, legal and financial advice, polarising politics, breaking news.
- only put a url on a resource when the link works. films, books and podcasts can go without one.
- run `npm run check:links`. 403 or 429 means the site blocks bots, so open those by hand.

## pictures
- art reveals come from `data/reveals.ts`, public domain or cc0 only, with a credit. no image is better than a doubtful one.
