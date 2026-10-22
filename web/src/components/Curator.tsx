/* eslint-disable @next/next/no-img-element */
import { curator } from "@/data/curator";

/** The person who picks the stories: a photo (or initials until there is one) and a name. */
export function CuratorBadge({ size = 40, dark = false }: { size?: number; dark?: boolean }) {
  return curator.photo ? (
    <img src={curator.photo} alt={curator.name} width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
  ) : (
    <span
      className={`display flex shrink-0 items-center justify-center rounded-full font-bold uppercase ${dark ? "bg-spark text-deep" : "bg-deep text-spark"}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {curator.initials}
    </span>
  );
}

/** A short "about" card for the landing page. */
export function CuratorCard() {
  return (
    <div className="flex gap-4 rounded-[14px] border-2 border-line bg-white p-5">
      <CuratorBadge size={64} />
      <div>
        <p className="display text-xl font-bold">{curator.name}</p>
        <p className="t-caption text-deep/70">{curator.role}</p>
        <p className="t-body mt-2 text-deep/90">{curator.bio}</p>
      </div>
    </div>
  );
}
