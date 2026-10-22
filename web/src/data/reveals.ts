// The real thing behind a story: a free-licensed or public-domain artefact shown after the quiz.
// light: the picture is a diagram or script on a transparent background, so show it on paper, not the dark screen.
export type Reveal = { src: string; alt: string; caption: string; credit: string; light?: boolean };

export const reveals: Record<string, Reveal> = {
  kuleshov: {
    src: "/art/kuleshov.jpg",
    alt: "A black and white studio portrait of the russian actor Ivan Mozzhukhin, with a calm, neutral face",
    caption: "ivan mozzhukhin, the actor usually named as the face in the experiment. the original film is lost, so the story rests on later accounts.",
    credit: "portrait by adolf gornstein, 1920s. public domain, via wikimedia commons",
  },
  tikka: {
    src: "/art/tikka.jpg",
    alt: "A bowl of chicken tikka masala, chunks of grilled chicken in an orange, creamy sauce",
    caption: "the dish itself: grilled chicken in a creamy, spiced tomato sauce.",
    credit: "photo by andy li. cc0, via wikimedia commons",
  },
  klingon: {
    src: "/art/klingon.png",
    alt: "The klingon writing system pIqaD: curved, spiky letters, each shown above its latin letter",
    caption: "pIqaD, the writing system made for klingon. each shape is a letter.",
    credit: "chart by user:lieven. public domain, via wikimedia commons",
    light: true,
  },
  mozart: {
    src: "/art/mozart.jpg",
    alt: "A painted portrait of Mozart as an adult, from a family portrait of about 1780",
    caption: "mozart himself, painted around 1780. no babies in the study, and none in this picture either.",
    credit: "attributed to johann nepomuk della croce, c. 1780. public domain, via wikimedia commons",
  },
  trolley: {
    src: "/art/trolley.png",
    alt: "Five simple track diagrams of the trolley problem and its variants: the switch, the fat man, the fat villain, the loop and the man in the yard",
    caption: "the famous versions, drawn as track diagrams. the switch is philippa foot's original from 1967.",
    credit: "diagram by jonas kubilius. cc0, via wikimedia commons",
    light: true,
  },
  wave: {
    src: "/art/wave.jpg",
    alt: "The Great Wave off Kanagawa, a woodblock print by Hokusai, showing a huge curling wave with Mount Fuji small in the distance",
    caption: "the real print. look for fuji, tiny and calm, inside the wave's curl.",
    credit: "hokusai, c. 1831. public domain, via wikimedia commons",
  },
  yosegaki: {
    src: "/art/yosegaki.jpg",
    alt: "A japanese flag with a red sun in the middle, covered in handwritten messages in black ink",
    caption: "a real yosegaki hinomaru: the red circle in the middle, with good-luck messages from friends and family around it.",
    credit: "us air force isr agency photo. public domain, via wikimedia commons",
  },
};
