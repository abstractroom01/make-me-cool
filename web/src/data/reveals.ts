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
  hedy: {
    src: "/art/hedy.jpg",
    alt: "A black and white publicity portrait of the actress Hedy Lamarr, with dark wavy hair, looking past the camera",
    caption: "hedy lamarr in a 1944 studio portrait. the patent she filed with george antheil is the other thing she is remembered for.",
    credit: "studio publicity photo, 1944. public domain, via wikimedia commons",
  },
  monalisa: {
    src: "/art/monalisa.jpg",
    alt: "The Mona Lisa, Leonardo da Vinci's portrait of a woman with a faint smile, seated before a hazy landscape",
    caption: "the painting that walked out of the louvre in 1911 and came back two years later.",
    credit: "leonardo da vinci, early 1500s. public domain, via wikimedia commons",
  },
  frankenstein: {
    src: "/art/frankenstein.jpg",
    alt: "The title page of the first edition of Frankenstein, or the Modern Prometheus, printed in London in 1818",
    caption: "the title page of the first edition, london, 1818. it did not carry mary shelley's name.",
    credit: "first edition title page, 1818. public domain, via wikimedia commons",
  },
  vangogh: {
    src: "/art/vangogh.jpg",
    alt: "The Red Vineyard, a van Gogh painting of workers in a vineyard under a low yellow sun, with red and gold leaves",
    caption: "'the red vineyard', the painting usually named as the one he sold in his lifetime.",
    credit: "vincent van gogh, 1888. public domain, via wikimedia commons",
  },
  voynich: {
    src: "/art/voynich.jpg",
    alt: "A page of the Voynich manuscript with a blue and red flowering plant and lines of unreadable handwriting",
    caption: "a page of the voynich manuscript. the plants, and the writing, have never been matched to anything.",
    credit: "voynich manuscript, early 1400s, beinecke library, yale. public domain, via wikimedia commons",
  },
  greatstink: {
    src: "/art/greatstink.jpg",
    alt: "A Punch cartoon of a skeleton in a black hood rowing a boat on a murky river Thames, with London behind him",
    caption: "'the silent highwayman', punch magazine, 1858: death rows down the thames.",
    credit: "punch magazine, 1858. public domain, via wikimedia commons",
  },
  semmelweis: {
    src: "/art/semmelweis.jpg",
    alt: "A painted portrait of the Hungarian doctor Ignaz Semmelweis in a dark coat",
    caption: "ignaz semmelweis, who told doctors to wash their hands in 1847.",
    credit: "portrait by jozsef borsos and albert doctor, 19th century. public domain, via wikimedia commons",
  },
  stendhal: {
    src: "/art/stendhal.jpg",
    alt: "A painted portrait of the French writer Stendhal, a man with sideburns and a high collar",
    caption: "stendhal, who felt dizzy in a florence church in 1817 and gave the syndrome its name.",
    credit: "portrait by olof johan sodermark, 1840. public domain, via wikimedia commons",
  },
  forgetting: {
    src: "/art/forgetting.jpg",
    alt: "A black and white photograph of the German psychologist Hermann Ebbinghaus, bearded, with round glasses",
    caption: "hermann ebbinghaus, who spent years memorising nonsense so we could understand forgetting.",
    credit: "undated photograph. public domain, via wikimedia commons",
  },
};
