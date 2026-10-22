// The real thing behind a story: a public-domain artefact shown after the quiz.
export type Reveal = { src: string; alt: string; caption: string; credit: string };

export const reveals: Record<string, Reveal> = {
  wave: {
    src: "/art/wave.jpg",
    alt: "The Great Wave off Kanagawa, a woodblock print by Hokusai, showing a huge curling wave with Mount Fuji small in the distance",
    caption: "the real print. look for fuji, tiny and calm, inside the wave's curl.",
    credit: "hokusai, c. 1831. public domain, via wikimedia commons",
  },
  mozart: {
    src: "/art/mozart.jpg",
    alt: "A painted portrait of Mozart as an adult, from a family portrait of about 1780",
    caption: "mozart himself, painted around 1780. no babies in the study, and none in this picture either.",
    credit: "attributed to johann nepomuk della croce, c. 1780. public domain, via wikimedia commons",
  },
};
