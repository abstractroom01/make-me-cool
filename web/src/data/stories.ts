export type CardKind = "scene" | "explain" | "say" | "crew";

export type Card = { kind: CardKind; tag: string; text: string; visual?: string };

export type Question =
  | { type: "mcq"; prompt: string; options: string[]; answer: number; why: string }
  | { type: "fill"; prompt: string; before: string; after: string; answer: string[]; why: string }
  | { type: "line"; prompt: string; options: string[]; answer: number; why: string };

export type Story = {
  id: string;
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
];
