export type CardKind = "scene" | "explain" | "say" | "crew";

export type Card = { kind: CardKind; tag: string; text: string; visual?: string };

export type Question =
  | { type: "mcq"; prompt: string; options: string[]; answer: number; why: string }
  | { type: "fill"; prompt: string; before: string; after: string; answer: string[]; why: string }
  | { type: "line"; prompt: string; options: string[]; answer: number; why: string };

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
      { kind: "scene", tag: "the soup", visual: "kul-soup", text: "a film teacher in russia put his face next to a bowl of soup. audiences said: he looks so hungry." },
      { kind: "scene", tag: "the coffin", visual: "kul-coffin", text: "same face. then a girl in a coffin. audiences said: so sad." },
      { kind: "scene", tag: "the divan", visual: "kul-divan", text: "same face. then a woman on a divan. audiences said: he's in love!" },
      { kind: "scene", tag: "the reveal", visual: "kul-strip", text: "it was the same shot every time! the filmmaker vsevolod pudovkin wrote in 1929 that audiences raved about the acting, even though the face never changed." },
      { kind: "explain", tag: "what it means", text: "this is the kuleshov effect: your brain connects two things shown back to back, and makes up the link. alfred hitchcock showed it in a tv interview: his own squinting face, then a woman with a baby, and he looks like a kind old man.", visual: "kul-baby" },
      { kind: "explain", tag: "why it is about you", text: "you do this every day! the word \"ok\" feels different after a joke than after bad news. same word. different thing next to it." },
      { kind: "say", tag: "say it out loud", text: "put two things side by side and people write the story themselves!" },
      { kind: "crew", tag: "for your crew", text: "when did someone misread your face? what was next to it?" },
    ],
    takeaway: "put two things side by side and people write the story themselves.",
    starter: "when did someone read your silence the wrong way?",
    caveat: "sample story, not yet fact-checked. the exact date and method of the experiment are not known, and accounts differ. a 1992 replication did not find the effect; later studies did.",
    sources: [{ label: "wikipedia: kuleshov effect", url: "https://en.wikipedia.org/wiki/Kuleshov_effect" }],
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
      { kind: "scene", tag: "the dish", visual: "tik-dish", text: "chicken tikka masala was the most popular dish in british curry houses by 2010!" },
      { kind: "scene", tag: "glasgow says", visual: "tik-tin", text: "we made it! chef ali ahmed aslam of the shish mahal said a customer found his chicken tikka too dry, so he poured on a sauce made with a tin of tomato soup." },
      { kind: "scene", tag: "but wait", visual: "tik-chefs", text: "another glasgow chef, sultan ahmed ansari of the taj mahal, said he made it in the 1950s. a food historian says the dish is older than the shish mahal." },
      { kind: "scene", tag: "the twist", visual: "tik-fiction", text: "a london restaurateur, iqbal wahhab, says he and the historian made up the soup detail to amuse journalists. the soup might be fiction!" },
      { kind: "scene", tag: "other claims", visual: "tik-pins", text: "punjab. or bangladeshi chefs in 1960s britain. food historians peter and colleen grove conclude it was most likely invented in britain, probably by a bangladeshi chef." },
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
      { kind: "scene", tag: "the script", visual: "kli-glyphs", text: "this isn't decoration! it's a language with real grammar." },
      { kind: "scene", tag: "1979", visual: "kli-bubbles", text: "for the first star trek film, actor james doohan (scotty) and producer jon povill made up a few sounds and about a dozen words." },
      { kind: "scene", tag: "1984", visual: "kli-clap", text: "for star trek III, director leonard nimoy and writer-producer harve bennett wanted more. they commissioned a linguist, marc okrand." },
      { kind: "scene", tag: "the build", visual: "kli-book", text: "okrand built a full grammar and vocabulary. on purpose, he made it unlike natural languages, especially english!" },
      { kind: "scene", tag: "1985", visual: "kli-books", text: "the klingon dictionary was published. fans took it seriously: there are at least nine published translations of world literature, including hamlet, the epic of gilgamesh and alice in wonderland." },
      { kind: "scene", tag: "who speaks it?", visual: "kli-people", text: "no one as a first language! around a dozen fluent speakers in 1996 (per the klingon language institute's director). estimates, not counts." },
      { kind: "explain", tag: "what it means", text: "a language is rules plus people who use them. even an invented one." },
      { kind: "say", tag: "say it out loud", text: "a language is just rules plus people who use them. klingon has both!" },
      { kind: "crew", tag: "for your crew", text: "what language do you only speak with one person?" },
    ],
    takeaway: "a language is just rules plus people who use them.",
    starter: "what's a language (or slang) you only use with one person?",
    caveat: "sample story, not yet fact-checked. speaker numbers are estimates.",
    sources: [{ label: "wikipedia: klingon language", url: "https://en.wikipedia.org/wiki/Klingon_language" }],
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
      { kind: "scene", tag: "1993", visual: "moz-students", text: "frances rauscher, gordon shaw and catherine ky published a short paper in the journal nature. 36 college students listened to a mozart sonata, a relaxation exercise, or silence." },
      { kind: "scene", tag: "the result", visual: "moz-boost", text: "then they did spatial puzzles from an iq test. after mozart, a small boost! it faded within about 15 minutes. and iq itself was never measured." },
      { kind: "scene", tag: "the headlines", visual: "moz-news", text: "a 1994 new york times column said mozart \"actually makes you smarter.\" a 1997 book stretched it to babies." },
      { kind: "scene", tag: "1998", visual: "moz-cd", text: "georgia's governor zell miller proposed $105,000 a year so every newborn in the state got a classical music cd. he reportedly played \"ode to joy\" for lawmakers and asked if they felt smarter!" },
      { kind: "scene", tag: "later studies", visual: "moz-mixed", text: "mixed. a 2010 review of 39 studies found little evidence, with bigger effects in studies linked to the original researchers, and strong publication bias. other work suggests mood and arousal explain it." },
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
    quiz: [
      { type: "mcq", prompt: "what did the 1993 study test?", options: ["general intelligence", "spatial reasoning tasks", "babies' memory"], answer: 1, why: "it tested spatial puzzles, not general intelligence." },
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
      { kind: "scene", tag: "the switch", visual: "trol-switch", text: "a runaway trolley will hit five people. you can pull a switch so it hits one person instead. what do you do?" },
      { kind: "scene", tag: "most people", text: "most people say: pull the switch." },
      { kind: "scene", tag: "the bridge", visual: "trol-bridge", text: "now: same five people, same trolley. but to stop it you must push a large man off a bridge. most people say: no!" },
      { kind: "scene", tag: "the puzzle", text: "same maths: five lives versus one. different answer! why?" },
      { kind: "scene", tag: "the names", text: "the puzzle was introduced by the philosopher philippa foot in 1967. judith jarvis thomson named it the \"trolley problem\" in 1976." },
      { kind: "scene", tag: "2018", visual: "trol-world", text: "mit's moral machine let people decide who a self-driving car should spare. about 40 million decisions, from 233 countries and territories. people broadly preferred sparing humans over pets, more people over fewer, and younger over older. but the strength of those preferences varied across countries." },
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
    hook: "the most famous wave in art was printed on the cover of a french orchestra score. and it may not be a tsunami.",
    cards: [
      { kind: "scene", tag: "you know this", text: "you know this wave!" },
      { kind: "scene", tag: "the print", visual: "wave-print", text: "it's a japanese woodblock print by hokusai, from around 1830 to 1832. part of a series called thirty-six views of mount fuji." },
      { kind: "scene", tag: "find fuji", visual: "wave-fuji", text: "find fuji! it's the tiny peak in the middle. the wave is the star." },
      { kind: "scene", tag: "tsunami?", text: "people call it a tsunami. writers say it more likely shows a giant ordinary ocean wave." },
      { kind: "scene", tag: "1905, paris", visual: "wave-score", text: "claude debussy's orchestral work la mer premiered on 15 october. the first printed edition's cover used hokusai's wave!" },
      { kind: "explain", tag: "what it means", text: "art travels. a japanese print reached a french composer's cover." },
      { kind: "say", tag: "say it out loud", text: "art doesn't stay in its box. a japanese print ended up on a french score!" },
      { kind: "crew", tag: "for your crew", text: "what book or album cover made you pick it up?" },
    ],
    takeaway: "art doesn't stay in its box.",
    starter: "what book or album cover made you pick it up?",
    caveat: "sample story, not yet fact-checked. \"more likely an ordinary wave\" comes from popular articles; confirm with a museum note. the publisher of the 1905 edition needs checking.",
    sources: [
      { label: "wikipedia: la mer (debussy)", url: "https://en.wikipedia.org/wiki/La_mer_(Debussy)" },
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
      { kind: "scene", tag: "yosegaki", text: "it's called a yosegaki hinomaru: \"yosegaki\" means a collection of writing. friends and family wrote good-luck messages around the red circle before a soldier left." },
      { kind: "scene", tag: "souvenirs", text: "many american soldiers took them home as souvenirs. a flag was easy to carry." },
      { kind: "scene", tag: "1944, saipan", visual: "flag-pin", text: "us marine marvin strombo took one from a fallen soldier. he kept it, and promised to return it." },
      { kind: "scene", tag: "the search", text: "decades later he asked the obon society, a non-profit that returns these flags, for help. they traced it to sadao yasue." },
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
    quiz: [
      { type: "mcq", prompt: "what does \"yosegaki\" mean?", options: ["collection of writing", "good luck", "victory"], answer: 0, why: "a collection of writing, from friends and family." },
      { type: "mcq", prompt: "who returned the flag in 2017?", options: ["marvin strombo", "rex ziak", "a museum"], answer: 0, why: "the marine who had kept it since 1944." },
      { type: "fill", prompt: "finish the line", before: "the flags carried messages of good", after: ".", answer: ["luck"], why: "good-luck messages from loved ones." },
      { type: "line", prompt: "someone says history is just dates. which would you say?", options: ["history matters.", "a us marine kept a dead soldier's flag for 73 years and returned it to the family in 2017. history is also things people carry.", "the war ended in 1945."], answer: 1, why: "it uses the idea and tells a story." },
    ],
  },
];
