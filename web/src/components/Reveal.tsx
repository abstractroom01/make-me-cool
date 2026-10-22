import { reveals } from "@/data/reveals";

/** "the real thing": archival art shown once the story is done. Renders nothing if a story has none. */
export function Reveal({ storyId }: { storyId: string }) {
  const r = reveals[storyId];
  if (!r) return null;
  return (
    <figure className="mt-6 overflow-hidden rounded-[14px] border-2 border-paper/25">
      <p className="t-caption px-5 pt-4 font-semibold uppercase tracking-widest text-spark">the real thing</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={r.src} alt={r.alt} className="mt-3 max-h-[26rem] w-full object-cover" loading="lazy" />
      <figcaption className="px-5 py-4">
        <p className="t-body text-paper/90">{r.caption}</p>
        <p className="t-caption mt-1 text-paper/60">{r.credit}</p>
      </figcaption>
    </figure>
  );
}
