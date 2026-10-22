import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "how our stories are made · make me cool",
  description: "who picks the stories, how we check them, and what we do when we get something wrong.",
};

const steps: [string, string][] = [
  ["a person picks it", "every story is chosen by sankalp sharma, the founder of the abstract room, not a feed or a formula. we look for a true story that connects two worlds, like film and food, or music and the brain."],
  ["we write it short", "about nine cards, plain words. any name or term a stranger wouldn't know gets explained on the spot. then four questions, ending with the line you could say out loud."],
  ["we check the facts", "each story lists its sources, and says plainly what is still being checked. we checked each current story against its sources, and each one tells you what is still open."],
  ["we add ways to go further", "after the story, a mix of things to watch, listen to, read and look at. films, podcasts, books and videos, not just articles."],
  ["you tell us how it went", "after every story you can say if you liked it and flag anything wrong or confusing. we read all of it and fix what we get wrong."],
];

export default function Page() {
  return (
    <main className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-8 md:px-8 md:py-12">
        <a className="t-caption underline" href="/">← back to make me cool</a>
        <h1 className="t-headline mt-4">
          how our stories are <span className="accent-on-light">made</span>
        </h1>
        <ol className="mt-6 space-y-6">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep text-lg font-bold text-spark">{i + 1}</span>
              <div>
                <h2 className="display text-xl font-bold">{t}</h2>
                <p className="t-body mt-1 text-deep/85">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="t-body mt-8">
          found a mistake? tap &ldquo;spot a mistake&rdquo; after any story, or write to us at the address in our <a className="underline" href="/privacy">privacy page</a>.
        </p>
      </div>
    </main>
  );
}
