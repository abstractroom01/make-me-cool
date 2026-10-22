/* eslint-disable @next/next/no-img-element */
// Real photos from the abstract room's gatherings. Alt text is plain description for screen readers.
const photos = {
  laugh: { src: "/rooms/laugh.jpg", alt: "two friends laughing hard at a gathering" },
  blue: { src: "/rooms/blue.jpg", alt: "two men laughing in front of a blue curtain" },
  circle: { src: "/rooms/circle.jpg", alt: "a crowded room cheering around a screen" },
  crowd: { src: "/rooms/crowd.jpg", alt: "a full room of people posing with an abstract room sign" },
  three: { src: "/rooms/three.jpg", alt: "three friends laughing under warm light" },
  point: { src: "/rooms/point.jpg", alt: "friends in a group pointing and grinning" },
  yellow: { src: "/rooms/yellow.jpg", alt: "a woman in a yellow top singing along with others" },
  pGlasses: { src: "/rooms/p-glasses.jpg", alt: "a man with round glasses giving a thumbs up" },
  pLaugh: { src: "/rooms/p-laugh.jpg", alt: "a man in an olive shirt laughing out loud" },
  pChin: { src: "/rooms/p-chin.jpg", alt: "a woman with glasses smiling, chin on her hand" },
  pSmile: { src: "/rooms/p-smile.jpg", alt: "a woman laughing with her hand raised" },
  cheer: { src: "/rooms/cheer.jpg", alt: "two women cheering with raised fists" },
} as const;

export type RoomPhoto = keyof typeof photos;

export function RoomPhotoImg({ id, className = "" }: { id: RoomPhoto; className?: string }) {
  const p = photos[id];
  return <img src={p.src} alt={p.alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
}

/** A calm three-photo strip with one line of text. */
export function RoomsStrip({ lead, ids = ["pLaugh", "pSmile", "pGlasses"] }: { lead: string; ids?: RoomPhoto[] }) {
  return (
    <section className="mt-6" aria-label="from our rooms">
      <div className="grid grid-cols-3 gap-2">
        {ids.map((id) => (
          <div key={id} className="aspect-[4/5] overflow-hidden rounded-[12px]">
            <RoomPhotoImg id={id} />
          </div>
        ))}
      </div>
      <p className="t-body mt-3 text-paper/85">{lead}</p>
    </section>
  );
}
