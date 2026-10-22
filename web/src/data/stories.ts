export type CardKind = "scene" | "explain" | "say" | "crew";

export type Card = { kind: CardKind; tag: string; text: string; visual?: string };

export type Question =
  | { type: "mcq"; prompt: string; options: string[]; answer: number; why: string }
  | { type: "fill"; prompt: string; before: string; after: string; answer: string[]; why: string }
  | { type: "line"; prompt: string; options: string[]; answer: number; why: string };

export type Resource = {
  type: "watch" | "listen" | "read" | "book" | "film" | "look";
  title: string;
  by?: string;
  url?: string;
  note: string;
};

export type Story = {
  id: string;
  publishDate: string;
  why: string;
  title: string;
  fields: string[];
  minutes: number;
  hook: string;
  cards: Card[];
  takeaway: string;
  starter: string;
  caveat: string;
  resources: Resource[];
  sources: { label: string; url: string }[];
  quiz: Question[];
};

export const stories: Story[] = [
  {
    id: "kuleshov",
    publishDate: "2026-10-19",
    why: "i picked this because it explains something you do every day: reading meaning into whatever sits next to a face or a word.",
    title: "the kuleshov effect",
    fields: ["cinema", "psychology"],
    minutes: 5,
    hook: "a film teacher made people cry using soup.",
    cards: [
      { kind: "scene", tag: "the face", visual: "kul-face", text: "this man is doing nothing! no smile. no frown." },
      { kind: "scene", tag: "the soup", visual: "kul-soup", text: "about a hundred years ago, a film teacher in russia named lev kuleshov put an actor's face next to a bowl of soup. audiences said: he looks so hungry." },
      { kind: "scene", tag: "the coffin", visual: "kul-coffin", text: "same face. then a girl in a coffin. audiences said: so sad." },
      { kind: "scene", tag: "the divan", visual: "kul-divan", text: "same face. then a woman on a divan. audiences said: he's in love!" },
      { kind: "scene", tag: "the reveal", visual: "kul-strip", text: "it was the same clip of the face every time! another russian filmmaker, vsevolod pudovkin, wrote in 1929 that audiences raved about the acting, even though the face never changed." },
      { kind: "explain", tag: "what it means", text: "this is the kuleshov effect: your brain connects two things shown back to back, and makes up the link. the director alfred hitchcock showed it in an interview: his own squinting face, then a woman with a baby, and he looks like a kind old man.", visual: "kul-baby" },
      { kind: "explain", tag: "why it is about you", text: "you do this every day! the word \"ok\" feels different after a joke than after bad news. same word. different thing next to it." },
      { kind: "say", tag: "say it out loud", text: "put two things side by side and people write the story themselves!" },
      { kind: "crew", tag: "for your crew", text: "when did someone misread your face? what was next to it?" },
    ],
    takeaway: "put two things side by side and people write the story themselves.",
    starter: "when did someone read your silence the wrong way?",
    caveat: "sample story, not yet fact-checked. the exact date and method of the experiment are not known, and accounts differ. a 1992 replication did not find the effect; later studies did.",
    sources: [{ label: "wikipedia: kuleshov effect", url: "https://en.wikipedia.org/wiki/Kuleshov_effect" }],
    resources: [
      { type: "watch", title: "hitchcock explains the idea himself", by: "alfred hitchcock", url: "https://www.youtube.com/watch?v=hCAE0t6KwJY", note: "the director describes why cutting between a face and an object makes you read emotion into it." },
      { type: "film", title: "battleship potemkin (1925)", by: "sergei eisenstein", note: "a classic of the russian style of editing that grew out of ideas like this. it's a silent film, so you can follow the cuts without subtitles." },
      { type: "book", title: "art of the cinema", by: "lev kuleshov", note: "kuleshov's own writing about his experiments. for the very curious." },
      { type: "read", title: "wikipedia: kuleshov effect", url: "https://en.wikipedia.org/wiki/Kuleshov_effect", note: "the short version, with the later studies." },
    ],
    quiz: [
      {
        type: "mcq",
        prompt: "a director cuts from a man's blank face to a snowstorm. what will viewers most likely think he feels?",
        options: ["cold", "angry", "nothing"],
        answer: 0,
        why: "viewers invent a link between the two shots.",
      },
      {
        type: "mcq",
        prompt: "in the soup, coffin and divan version, what changed?",
        options: ["the actor's face", "only what the face was cut next to", "the lighting"],
        answer: 1,
        why: "the face never changed. only its neighbour did.",
      },
      {
        type: "fill",
        prompt: "finish the line",
        before: "put two things",
        after: "and people write the story themselves.",
        answer: ["side by side", "side-by-side"],
        why: "two things together make a story.",
      },
      {
        type: "line",
        prompt: "your friend says their boss replied with just \"noted.\" which would you say at dinner?",
        options: [
          "that's the kuleshov effect from some 1920s russian film.",
          "\"noted\" means nothing alone. after a joke it's friendly, after a deadline it's cold. same word, different thing next to it.",
          "people read too much into things.",
        ],
        answer: 1,
        why: "it uses the idea on something real, instead of just naming it.",
      },
    ],
  },
  {
    id: "tikka",
    publishDate: "2026-10-20",
    why: "i picked this because everyone assumes a famous dish has one inventor, and the real story is a better argument.",
    title: "who invented chicken tikka masala?",
    fields: ["food", "history"],
    minutes: 5,
    hook: "nobody agrees who invented britain's favourite curry. one story may be made up.",
    cards: [
      { kind: "scene", tag: "the dish", visual: "tik-dish", text: "chicken tikka masala is grilled chicken in a creamy, spiced tomato sauce. by 2010 it was the most popular dish in british curry houses!" },
      { kind: "scene", tag: "glasgow says", visual: "tik-tin", text: "we made it! chef ali ahmed aslam of the shish mahal said a customer found his chicken tikka too dry, so he poured on a sauce made with a tin of tomato soup." },
      { kind: "scene", tag: "but wait", visual: "tik-chefs", text: "another glasgow chef, sultan ahmed ansari, who ran a restaurant called the taj mahal, said he made it in the 1950s. a food historian says the dish is older than the shish mahal." },
      { kind: "scene", tag: "the twist", visual: "tik-fiction", text: "a london restaurant owner, iqbal wahhab, says he and the historian made up the soup detail to amuse journalists. the soup might be fiction!" },
      { kind: "scene", tag: "other claims", visual: "tik-pins", text: "others say punjab, a region in north india and pakistan. or bangladeshi chefs working in britain in the 1960s. the food historians peter and colleen grove conclude it was most likely invented in britain, probably by a bangladeshi chef." },
      { kind: "explain", tag: "what it means", text: "a dish can belong to a place and still not have one inventor. food travels, changes, and gets a new story at every stop." },
      { kind: "say", tag: "say it out loud", text: "the most famous dishes don't have an inventor. they have a long argument!" },
      { kind: "crew", tag: "for your crew", text: "what dish does your family argue about?" },
    ],
    takeaway: "the most famous dishes don't have an inventor. they have a long argument.",
    starter: "which dish do you think belongs to you, and who else would claim it?",
    caveat: "sample story, not yet fact-checked. the origin is genuinely disputed, and so is the soup detail.",
    sources: [
      { label: "wikipedia: chicken tikka masala", url: "https://en.wikipedia.org/wiki/Chicken_tikka_masala" },
      { label: "npr: ali ahmed aslam", url: "https://www.npr.org/2022/12/23/1145119758/chicken-tikka-masala-ali-ahmed-aslam-shish-mahal" },
    ],
    resources: [
      { type: "listen", title: "the history of tikka masala", by: "footnoting history (podcast)", url: "https://www.footnotinghistory.com/home/the-history-of-tikka-masala", note: "an episode on who really made it, and whether it began in india or in britain." },
      { type: "read", title: "the chef who said he invented it", by: "npr", url: "https://www.npr.org/2022/12/23/1145119758/chicken-tikka-masala-ali-ahmed-aslam-shish-mahal", note: "the glasgow story, told when ali ahmed aslam died in 2022." },
      { type: "book", title: "curry: a tale of cooks and conquerors", by: "lizzie collingham", note: "a history of how curry travelled and changed across the world." },
    ],
    quiz: [
      {
        type: "mcq",
        prompt: "which city's chef is most often credited with the dish?",
        options: ["glasgow", "mumbai", "lahore"],
        answer: 0,
        why: "glasgow's shish mahal is the most repeated claim, though it is disputed.",
      },
      {
        type: "mcq",
        prompt: "what do food historians peter and colleen grove conclude?",
        options: ["invented in britain, probably by a bangladeshi chef", "invented by the mughals", "invented by a supermarket"],
        answer: 0,
        why: "that is their reading of the evidence.",
      },
      {
        type: "fill",
        prompt: "finish the line",
        before: "the most famous dishes don't have an",
        after: ". they have a long argument.",
        answer: ["inventor"],
        why: "no single inventor, one long argument.",
      },
      {
        type: "line",
        prompt: "someone at dinner says \"this is a traditional indian dish, obviously.\" which would you say?",
        options: [
          "it was invented in glasgow, full stop.",
          "people argue about that! glasgow, punjab and 1960s bangladeshi chefs in britain all have claims. food travels and gets a new story at each stop.",
          "all food is fusion now.",
        ],
        answer: 1,
        why: "it uses the idea, and it doesn't overclaim.",
      },
    ],
  },
  {
    id: "klingon",
    publishDate: "2026-10-21",
    why: "i picked this because it shows what a language actually is, by looking at one invented for aliens.",
    title: "the klingon language",
    fields: ["language", "cinema"],
    minutes: 5,
    hook: "a linguist was paid to invent a language for aliens. people now translate hamlet into it.",
    cards: [
      { kind: "scene", tag: "the script", visual: "kli-glyphs", text: "klingons are the alien warriors in star trek, and this is their language. it isn't decoration. it has real grammar!" },
      { kind: "scene", tag: "1979", visual: "kli-bubbles", text: "for the first star trek film, james doohan, the actor who played the ship's engineer scotty, and a producer, jon povill, made up a few sounds and about a dozen words." },
      { kind: "scene", tag: "1984", visual: "kli-clap", text: "for star trek III, the director leonard nimoy (who also played spock) and the producer harve bennett wanted more. they hired a linguist, someone who studies how languages work: marc okrand." },
      { kind: "scene", tag: "the build", visual: "kli-book", text: "okrand built a full grammar and vocabulary. on purpose, he made it unlike natural languages, especially english!" },
      { kind: "scene", tag: "1985", visual: "kli-books", text: "the klingon dictionary was published. fans took it seriously. at least nine works of world literature have been translated into klingon, including hamlet, alice in wonderland and the epic of gilgamesh, one of the oldest stories ever written." },
      { kind: "scene", tag: "who speaks it?", visual: "kli-people", text: "no one speaks it as a mother tongue. in 1996 the director of the klingon language institute, a fan group, said about a dozen people were fluent. those are estimates, not counts." },
      { kind: "explain", tag: "what it means", text: "a language is rules plus people who use them. even an invented one." },
      { kind: "say", tag: "say it out loud", text: "a language is just rules plus people who use them. klingon has both!" },
      { kind: "crew", tag: "for your crew", text: "what language do you only speak with one person?" },
    ],
    takeaway: "a language is just rules plus people who use them.",
    starter: "what's a language (or slang) you only use with one person?",
    caveat: "sample story, not yet fact-checked. speaker numbers are estimates.",
    sources: [{ label: "wikipedia: klingon language", url: "https://en.wikipedia.org/wiki/Klingon_language" }],
    resources: [
      { type: "read", title: "the man who taught mr. spock to speak vulcan", by: "air & space magazine", url: "https://www.airspacemag.com/as-interview/say-what-linguist-elaborates-180960198", note: "an interview with marc okrand, who answers some questions in klingon (with english translations)." },
      { type: "book", title: "the klingon dictionary", by: "marc okrand", note: "the 1985 book that made klingon a real language you can learn." },
      { type: "film", title: "conlanging: the art of crafting tongues (2017)", note: "a documentary about people who invent languages. marc okrand worked on it as an associate producer." },
      { type: "read", title: "wikipedia: klingon language", url: "https://en.wikipedia.org/wiki/Klingon_language", note: "the grammar, the sounds and the fan community." },
    ],
    quiz: [
      {
        type: "mcq",
        prompt: "who first made up klingon sounds and words for the films?",
        options: ["james doohan and jon povill", "marc okrand", "gene roddenberry"],
        answer: 0,
        why: "they made up a few sounds and about a dozen words in 1979.",
      },
      {
        type: "mcq",
        prompt: "who was hired to build a full language for star trek III?",
        options: ["marc okrand", "leonard nimoy", "harve bennett"],
        answer: 0,
        why: "okrand is the linguist who built the grammar and vocabulary.",
      },
      {
        type: "fill",
        prompt: "finish the line",
        before: "okrand designed klingon to be unlike natural languages, especially",
        after: ".",
        answer: ["english"],
        why: "he made it deliberately unlike english.",
      },
      {
        type: "line",
        prompt: "someone says invented languages are a joke. which would you say?",
        options: [
          "klingon was made by marc okrand.",
          "a language is rules plus people who use them. klingon has a grammar, a dictionary since 1985, and hamlet translated into it.",
          "people love weird things.",
        ],
        answer: 1,
        why: "it uses the idea, not just a fact.",
      },
    ],
  },

  {
    id: "mozart",
    publishDate: "2026-10-22",
    why: "i picked this because everyone repeats it and almost nobody has seen the study.",
    title: "the mozart effect",
    fields: ["psychology", "music"],
    minutes: 5,
    hook: "playing mozart to your baby won't make them smarter. the study never involved babies.",
    cards: [
      { kind: "scene", tag: "you've heard it", visual: "moz-phones", text: "\"mozart makes you smarter.\" you've heard it. here's what actually happened!" },
      { kind: "scene", tag: "1993", visual: "moz-students", text: "frances rauscher and two colleagues published a short paper in nature, one of the world's top science journals. 36 college students listened to a piece by mozart, a relaxation recording, or silence." },
      { kind: "scene", tag: "the result", visual: "moz-boost", text: "then they did puzzles about picturing shapes folding and turning, taken from an iq test (iq is a score from intelligence tests). after mozart, a small boost! it faded in about 15 minutes. and nobody's iq was ever actually measured." },
      { kind: "scene", tag: "the headlines", visual: "moz-news", text: "a 1994 new york times column said mozart \"actually makes you smarter.\" a 1997 book stretched it to babies." },
      { kind: "scene", tag: "1998", visual: "moz-cd", text: "in 1998 the governor of georgia, a us state, proposed spending $105,000 a year so every newborn got a classical music cd. he reportedly played \"ode to joy\" for lawmakers and asked if they felt smarter!" },
      { kind: "scene", tag: "later studies", visual: "moz-mixed", text: "later studies were mixed. a 2010 review, which pools many studies together, looked at 39 of them and found little evidence. the bigger effects came from studies linked to the original researchers. and studies that find nothing often never get published, which skews the picture. other work suggests the music just puts people in a better mood or makes them more alert." },
      { kind: "explain", tag: "what it means", text: "a small, specific result got repeated until it became a big, general claim. the study was real. the claim wasn't." },
      { kind: "say", tag: "say it out loud", text: "a headline is a story about a study. it is not the study!" },
      { kind: "crew", tag: "for your crew", text: "what \"fact\" did you believe that turned out to be a headline?" },
    ],
    takeaway: "a headline is a story about a study, not the study.",
    starter: "what's something you \"know\" that you've never actually checked?",
    caveat: "sample story, not yet fact-checked. the sample size, the sonata and the fading effect come from a summary of the paper; check the paper itself. the georgia proposal date and amount need a news record.",
    sources: [
      { label: "wikipedia: mozart effect", url: "https://en.wikipedia.org/wiki/Mozart_effect" },
      { label: "npr transcript", url: "https://www.npr.org/transcripts/128104580" },
    ],
    resources: [
      { type: "listen", title: "mozart effect, schmozart effect: science misinterpreted", by: "npr", url: "https://www.npr.org/transcripts/128104580", note: "how one small experiment turned into a craze. audio, with a transcript." },
      { type: "listen", title: "mozart: sonata for two pianos in d major, k. 448", note: "the kind of music from the study. this sonata is the piece usually named as the one used." },
      { type: "read", title: "a 1999 attempt to repeat the experiment", by: "psychological science", url: "https://www.psychologicalscience.org/journals/psychological-science/1467-9280.00169/", note: "researchers followed the original method and did not see the effect. a short, technical paper." },
      { type: "read", title: "psychologists debunk mozart myth", by: "swissinfo", url: "https://www.swissinfo.ch/eng/culture/psychologists-debunk-mozart-myth/4665832", note: "a news report on a study of how the media spread the myth." },
    ],
    quiz: [
      { type: "mcq", prompt: "what did the 1993 study test?", options: ["general intelligence (iq)", "puzzles about shapes (spatial reasoning)", "babies' memory"], answer: 1, why: "it tested spatial puzzles, not general intelligence." },
      { type: "mcq", prompt: "how long did the boost last?", options: ["a lifetime", "about 15 minutes at most", "one week"], answer: 1, why: "the effect faded within minutes." },
      { type: "fill", prompt: "finish the line", before: "the study never measured", after: ".", answer: ["iq"], why: "it measured a spatial task, not iq." },
      { type: "line", prompt: "a coworker says \"play mozart to the baby, it boosts iq.\" which would you say?", options: ["that's been debunked.", "the original study had college students, a short spatial test, and the effect faded in minutes. the baby part came from headlines.", "science changes all the time."], answer: 1, why: "it uses the idea, instead of just dismissing." },
    ],
  },
  {
    id: "trolley",
    publishDate: "2026-10-23",
    why: "i picked this because it turns an old philosophy puzzle into something you can argue about at dinner.",
    title: "the trolley problem and 40 million decisions",
    fields: ["philosophy", "psychology", "technology"],
    minutes: 5,
    hook: "40 million decisions were collected on who a self-driving car should hit. the answers changed by country.",
    cards: [
      { kind: "scene", tag: "the switch", visual: "trol-switch", text: "a runaway trolley (a rail cart, a bit like a small tram) is heading for five people. you can pull a lever to switch it onto another track, where it will hit one person instead. what do you do?" },
      { kind: "scene", tag: "most people", text: "most people say: pull the switch." },
      { kind: "scene", tag: "the bridge", visual: "trol-bridge", text: "now: same five people, same trolley. but to stop it you must push a large man off a bridge. most people say: no!" },
      { kind: "scene", tag: "the puzzle", text: "same maths: five lives versus one. different answer! why?" },
      { kind: "scene", tag: "the names", text: "a philosopher, philippa foot, first posed the puzzle in 1967. another, judith jarvis thomson, gave it the name \"the trolley problem\" in 1976." },
      { kind: "scene", tag: "2018", visual: "trol-world", text: "in 2018, mit, a us university, ran the moral machine: an online game where you choose who a self-driving car should spare in a crash. about 40 million decisions came in from 233 countries and territories. people broadly preferred sparing humans over pets, more people over fewer, and younger over older. but how strongly they felt varied by country." },
      { kind: "explain", tag: "what it means", text: "gut reactions aren't one rulebook. \"right\" can change with how the question is asked, and with where you grew up." },
      { kind: "say", tag: "say it out loud", text: "same maths, different feeling. that's why ethics is hard!" },
      { kind: "crew", tag: "for your crew", text: "would you push the man? what changed between the switch and the bridge?" },
    ],
    takeaway: "same maths, different feeling. that's why ethics is hard.",
    starter: "would you pull the switch? would you push the man? what's different?",
    caveat: "sample story, not yet fact-checked. this is a hypothetical about death, so keep the tone calm. check the exact counts against the nature paper.",
    sources: [
      { label: "wikipedia: trolley problem", url: "https://en.wikipedia.org/wiki/Trolley_problem" },
      { label: "mit: the moral machine experiment", url: "https://www.media.mit.edu/publications/the-moral-machine-experiment" },
    ],
    resources: [
      { type: "watch", title: "the good place, season 2, episode 5: \"the trolley problem\"", note: "a comedy series that turns the dilemma into an episode. funny, and surprisingly thoughtful." },
      { type: "listen", title: "david edmonds on the trolley problem", by: "new books network (podcast)", url: "https://newbooksnetwork.com/david-edmonds-would-you-kill-the-fat-man-princeton-up-2014-3", note: "the author of a whole book about the puzzle, talking it through." },
      { type: "book", title: "would you kill the fat man?", by: "david edmonds", note: "a readable history of the trolley problem and what our answers say about us." },
      { type: "read", title: "the moral machine experiment", by: "mit media lab", url: "https://www.media.mit.edu/publications/the-moral-machine-experiment", note: "the 2018 study behind the 40 million decisions." },
    ],
    quiz: [
      { type: "mcq", prompt: "who named it the \"trolley problem\"?", options: ["philippa foot", "judith jarvis thomson", "plato"], answer: 1, why: "foot introduced the puzzle in 1967; thomson named it in 1976." },
      { type: "mcq", prompt: "what was the moral machine?", options: ["an mit online experiment on self-driving car dilemmas", "a car brand", "a film"], answer: 0, why: "it collected about 40 million decisions online." },
      { type: "fill", prompt: "finish the line", before: "most people approve of pulling the switch but not of", after: "the man.", answer: ["pushing"], why: "same maths, different feeling." },
      { type: "line", prompt: "your friend asks how a self-driving car should choose who to save. which would you say?", options: ["it should save the most people. simple.", "people say \"pull the switch\" but not \"push the man\", even with the same maths. and a 40-million-decision study found the answers vary by country. so there isn't one obvious rule.", "that's too dark to think about."], answer: 1, why: "it uses the idea and respects the complexity." },
    ],
  },
  {
    id: "wave",
    publishDate: "2026-10-24",
    why: "i picked this because the most famous wave in art took a surprising trip onto a french music score.",
    title: "the wave on debussy's cover",
    fields: ["art", "music", "nature"],
    minutes: 5,
    hook: "the most famous wave in art was printed on the cover of a french piece of music. and it may not be a tsunami.",
    cards: [
      { kind: "scene", tag: "you know this", text: "you know this wave!" },
      { kind: "scene", tag: "the print", visual: "wave-print", text: "it's a japanese woodblock print (an image printed from carved wooden blocks) by an artist named hokusai, made around 1830 to 1832. it's part of a series called thirty-six views of mount fuji." },
      { kind: "scene", tag: "find fuji", visual: "wave-fuji", text: "find fuji! it's the tiny peak in the middle. the wave is the star." },
      { kind: "scene", tag: "tsunami?", text: "people call it a tsunami. writers say it more likely shows a giant ordinary ocean wave." },
      { kind: "scene", tag: "1905, paris", visual: "wave-score", text: "claude debussy, a french composer, premiered a piece for a full orchestra called la mer, which means \"the sea\". the cover of its first printed sheet music used hokusai's wave!" },
      { kind: "explain", tag: "what it means", text: "art travels. a japanese print reached a french composer's cover." },
      { kind: "say", tag: "say it out loud", text: "art doesn't stay in its box. a japanese print ended up on a french score!" },
      { kind: "crew", tag: "for your crew", text: "what book or album cover made you pick it up?" },
    ],
    takeaway: "art doesn't stay in its box.",
    starter: "what book or album cover made you pick it up?",
    caveat: "sample story, not yet fact-checked. \"more likely an ordinary wave\" comes from popular articles; confirm with a museum note. the met museum says the print is \"said to have inspired\" la mer, so the cover detail needs confirming too. the publisher of the 1905 edition needs checking.",
    sources: [
      { label: "wikipedia: la mer (debussy)", url: "https://en.wikipedia.org/wiki/La_mer_(Debussy)" },
    ],
    resources: [
      { type: "look", title: "under the wave off kanagawa", by: "the metropolitan museum of art", url: "https://www.metmuseum.org/art/collection/search/45434", note: "see the print up close, from the museum's collection." },
      { type: "listen", title: "debussy: la mer", note: "hear the music the wave is on the cover of. start with the first part, \"from dawn to noon on the sea\"." },
      { type: "read", title: "on hokusai's \"great wave\"", by: "art history news", url: "https://www.arthistorynews.com/articles/4676_On_Hokusais_Great_Wave", note: "a short read on what the print is really showing." },
    ],
    quiz: [
      { type: "mcq", prompt: "who made the print?", options: ["hokusai", "van gogh", "monet"], answer: 0, why: "katsushika hokusai, around 1830 to 1832." },
      { type: "mcq", prompt: "which french work's first edition used it on the cover?", options: ["la mer", "boléro", "clair de lune"], answer: 0, why: "debussy's la mer." },
      { type: "fill", prompt: "finish the line", before: "la mer premiered in", after: "in 1905.", answer: ["paris"], why: "it premiered in paris on 15 october 1905." },
      { type: "line", prompt: "a friend at a gallery says \"that's the tsunami painting.\" which would you say?", options: ["it's by hokusai.", "it's actually a woodblock print, and it's more likely a giant ordinary wave than a tsunami. it was even on the cover of debussy's la mer.", "i love japanese art."], answer: 1, why: "it uses the idea, not just a name." },
    ],
  },
  {
    id: "yosegaki",
    publishDate: "2026-10-25",
    why: "i picked this because a small object holds a big human story. handle with care.",
    title: "the flag that went home",
    fields: ["history", "culture", "language"],
    minutes: 5,
    hook: "a us marine took a flag from a fallen japanese soldier. 73 years later he did this.",
    cards: [
      { kind: "scene", tag: "the flag", visual: "flag-flag", text: "this is a japanese flag. look at the writing." },
      { kind: "scene", tag: "yosegaki", text: "it's called a yosegaki hinomaru. hinomaru means \"the red circle\", the japanese flag. yosegaki means a collection of writing. before a soldier left for war, friends and family wrote good-luck messages around the red circle." },
      { kind: "scene", tag: "souvenirs", text: "during world war II, many american soldiers took these flags home as souvenirs. a flag was easy to carry." },
      { kind: "scene", tag: "1944, saipan", visual: "flag-pin", text: "in 1944, on saipan, a pacific island, us marine marvin strombo took one from a japanese soldier who had died. he kept it, and promised to return it." },
      { kind: "scene", tag: "the search", text: "decades later he asked the obon society, a small non-profit that returns these flags to families in japan, for help. they traced it to sadao yasue." },
      { kind: "scene", tag: "2017", visual: "flag-home", text: "strombo, then 93, flew to japan and handed the flag to yasue's surviving family." },
      { kind: "explain", tag: "what it means", text: "an object can carry a person. a name written in ink can wait 73 years for someone to read it." },
      { kind: "say", tag: "say it out loud", text: "some wars end in 1945. for some families, one ended in 2017." },
      { kind: "crew", tag: "for your crew", text: "what object at home holds someone's handwriting?" },
    ],
    takeaway: "an object can carry a person.",
    starter: "what object in your home holds someone's handwriting?",
    caveat: "sample story, not yet fact-checked. this is a story about war and loss: review the tone. sources differ on yasue's rank, so it is left out.",
    sources: [
      { label: "wikipedia: good luck flag", url: "https://en.wikipedia.org/wiki/Good_Luck_Flag" },
      { label: "knkx: wwii vet returns flag", url: "https://www.knkx.org/news/2017-08-16/wwii-vet-returns-flag-taken-from-fallen-japanese-soldier-in-1944" },
    ],
    resources: [
      { type: "watch", title: "the flag is handed back (2017)", url: "https://youtu.be/9KL9If-okeU", note: "a video of marvin strombo giving the flag to the soldier's family in japan." },
      { type: "watch", title: "73 years later, a veteran returns a keepsake", by: "pbs newshour", url: "https://www.pbs.org/newshour/show/73-years-later-wwii-veteran-returns-fallen-soldiers-family-keepsake", note: "a news segment on the story, with the people in it." },
      { type: "read", title: "the obon society", url: "https://obonsociety.org/", note: "the small non-profit that returns these flags to families in japan." },
      { type: "read", title: "a veteran completes a 73-year mission", by: "sbs", url: "https://sbs.com.au/voices/article/wwii-veteran-completes-73-year-mission-to-return-dead-japanese-soldiers-flag/zsk3biuf5", note: "a longer article on the return." },
    ],
    quiz: [
      { type: "mcq", prompt: "what does \"yosegaki\" mean?", options: ["collection of writing", "good luck", "victory"], answer: 0, why: "a collection of writing, from friends and family." },
      { type: "mcq", prompt: "who returned the flag in 2017?", options: ["marvin strombo", "rex ziak", "a museum"], answer: 0, why: "the marine who had kept it since 1944." },
      { type: "fill", prompt: "finish the line", before: "the flags carried messages of good", after: ".", answer: ["luck"], why: "good-luck messages from loved ones." },
      { type: "line", prompt: "someone says history is just dates. which would you say?", options: ["history matters.", "a us marine kept a dead soldier's flag for 73 years and returned it to the family in 2017. history is also things people carry.", "the war ended in 1945."], answer: 1, why: "it uses the idea and tells a story." },
    ],
  },
];
