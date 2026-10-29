import type { Story } from "../../stories";

// stories published in october 2026 after the first seven (those live in stories.ts)
export const stories: Story[] = [
  {
    id: "frankenstein",
    publishDate: "2026-10-31",
    why: "i picked this because a book we think of as pure horror began as a game on a rainy afternoon, and the weather may have helped.",
    title: "the summer frankenstein was born",
    fields: ["literature", "science", "history"],
    minutes: 5,
    hook: "some say a volcano on the other side of the world is why frankenstein exists.",
    cards: [
      { kind: "scene", tag: "the villa", text: "june 1816. a rented villa by lake geneva, in switzerland. the poet lord byron is there with his doctor john polidori, the poet percy shelley, and shelley's partner mary, who is 18." },
      { kind: "scene", tag: "the rain", text: "it will not stop raining. the summer is cold and dark, so they stay inside and read german ghost stories out loud." },
      { kind: "scene", tag: "the dare", text: "then byron sets a challenge: everyone has to write a ghost story of their own." },
      { kind: "scene", tag: "the stories", text: "mary struggles for days. then she has a waking dream of a scientist kneeling over a body he has made. that becomes frankenstein, published in 1818. polidori writes the vampyre, one of the first modern vampire stories." },
      { kind: "scene", tag: "the volcano", text: "why was the summer so gloomy? in april 1815, mount tambora, a volcano in indonesia, erupted. its ash rose high into the air and cooled the weather around the world. 1816 is often called the year without a summer." },
      { kind: "explain", tag: "what it means", text: "nobody at the villa knew about the volcano. they just knew it was dark and wet, so they stayed in and invented monsters. some say the gloom helped. we can't prove it, but the timing is hard to ignore." },
      { kind: "explain", tag: "why it is about you", text: "your best ideas may need a boring, rainy afternoon and a friend who dares you. the dare matters as much as the weather." },
      { kind: "say", tag: "say it out loud", text: "bad weather is sometimes a writing prompt!" },
      { kind: "crew", tag: "for your crew", text: "what did you make the last time you were stuck inside?" },
    ],
    takeaway: "bad weather is sometimes a writing prompt.",
    starter: "what did you make the last time you were stuck inside?",
    caveat: "checked on 29 oct 2026 against the sources listed. still open: how much the cold weather shaped the books is a popular claim, not proven, and sources differ on how far the world cooled. the waking dream is from mary shelley's own later account.",
    sources: [
      { label: "wikipedia: villa diodati", url: "https://en.wikipedia.org/wiki/Villa_Diodati" },
      { label: "atlas obscura: villa diodati", url: "https://www.atlasobscura.com/places/villa-diodati" },
      { label: "art uk: sparking the gothic imagination", url: "https://artuk.org/discover/stories/sparking-the-gothic-imagination-mary-shelleys-frankenstein-and-polidoris-the-vampyre" },
    ],
    resources: [
      { type: "film", title: "gothic (1986)", by: "ken russell", note: "a wild, dreamlike retelling of that night at the villa. not strictly accurate, but you'll feel the storm." },
      { type: "book", title: "frankenstein; or, the modern prometheus", by: "mary shelley", url: "https://www.gutenberg.org/ebooks/84", note: "the original 1818 book, free online. shorter and stranger than the films." },
      { type: "read", title: "wikipedia: the year without a summer", url: "https://en.wikipedia.org/wiki/Year_Without_a_Summer", note: "what the volcano did to the weather, and to harvests, in 1816." },
    ],
    quiz: [
      { type: "mcq", prompt: "who dared everyone to write a ghost story?", options: ["lord byron", "mary shelley", "john polidori"], answer: 0, why: "byron set the challenge after the group read german ghost stories." },
      { type: "mcq", prompt: "what happened in indonesia in april 1815?", options: ["a war started", "a volcano erupted", "a ship sank"], answer: 1, why: "mount tambora's ash cooled weather around the world." },
      { type: "fill", prompt: "finish the line", before: "bad weather is sometimes a writing", after: ".", answer: ["prompt", "prompts"], why: "the rain kept them indoors, and the dare did the rest." },
      { type: "line", prompt: "a friend says frankenstein is just an old horror book. which would you say?", options: ["it's a classic, you should read it.", "it started as a dare on a rainy night in 1816, in a summer some say a volcano made cold.", "everyone knows that one."], answer: 1, why: "it tells the story instead of just praising the book." },
    ],
  },
];
