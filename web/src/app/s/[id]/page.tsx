import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stories } from "@/data/stories";
import { Visual } from "@/components/Visual";
import { PlayLink } from "@/components/PlayLink";

import { isLive } from "@/lib/published";

// rendered per request so a story that is not out yet cannot be opened from a guessed link
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = stories.find((x) => x.id === id);
  if (!s || !isLive(s.publishDate)) return {};
  const title = `${s.title} · make me cool`;
  return {
    title,
    description: s.hook,
    openGraph: { title, description: s.hook, siteName: "make me cool", type: "website", url: `/s/${s.id}` },
    twitter: { card: "summary_large_image", title, description: s.hook },
  };
}

export default async function SharedStory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = stories.find((x) => x.id === id);
  if (!s || !isLive(s.publishDate)) notFound();
  const vis = s.cards.find((c) => c.visual)?.visual;

  return (
    <main className="min-h-dvh bg-deep text-paper">
      <div className="mx-auto max-w-xl px-5 py-8 md:py-14">
        <a href="/" className="flex items-center gap-2" aria-label="make me cool, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/icon-main.png" alt="" className="h-9 w-9" />
          <span className="display text-xl font-bold">make me cool</span>
        </a>

        <p className="t-caption mt-10 font-semibold uppercase tracking-widest text-paper/70">{s.fields.join(" + ")}</p>
        <h1 className="t-headline mt-2">{s.title}</h1>
        <p className="t-body mt-3 text-paper/90">{s.hook}</p>

        {vis && (
          <div className="mt-6 overflow-hidden rounded-[14px]">
            <Visual id={vis} />
          </div>
        )}

        <section className="card-shadow mt-6 rounded-[14px] bg-paper p-6 text-deep">
          <p className="t-caption font-semibold uppercase tracking-widest">the line to say out loud</p>
          <p className="display mt-2 text-3xl font-bold leading-tight">&ldquo;{s.takeaway}&rdquo;</p>
        </section>

        <PlayLink storyId={s.id} className="btn btn-yellow mt-8 w-full">
          play this story. it&apos;s free
        </PlayLink>
        <p className="t-caption mt-3 text-center text-paper/80">about 5 minutes · {s.cards.length} cards · 4 questions · no sign-up needed</p>

        <p className="t-body mt-10 text-paper/85">
          make me cool is a daily workout for your personality: one short story a day, picked by a person, with a line you can actually say at the houseparty.
          from the home of the abstract room.
        </p>
        <p className="t-caption mt-8 text-paper/70">
          <a className="underline" href="/privacy">privacy</a> · <a className="underline" href="/terms">terms</a> · <a className="underline" href="/refunds">refunds</a>
        </p>
      </div>
    </main>
  );
}
