"use client";

import { useEffect, useState } from "react";
import { RoomPhotoImg } from "./Rooms";
import { CuratorBadge, CuratorCard } from "./Curator";
import { SignInForm } from "./SignInForm";
import { Chip, Spark } from "./ui";
import { Visual } from "./Visual";
import { stories, type Story } from "@/data/stories";
import { storyForToday } from "@/lib/schedule";
import { PLUS_PRICE } from "@/lib/pricing";

function MockToday() {
  // the date is read on the device, so this is filled in after the page loads
  const [story, setStory] = useState<Story | null>(null);
  useEffect(() => setStory(storyForToday().story), []);
  return (
    <div className="card-shadow w-full max-w-md rounded-[14px] bg-paper p-5 text-deep" aria-label="a preview of today's screen">
      <div className="flex items-center justify-between">
        <span className="t-caption font-semibold uppercase tracking-widest text-deep/70">preview</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-spark px-3 py-1 text-sm font-bold">
          <Spark size={16} /> day 1
        </span>
      </div>
      <div className="mt-4 rounded-[14px] bg-deep p-5 text-paper">
        <div className="flex flex-wrap gap-2">
          {(story?.fields ?? ["a new story"]).map((f) => (
            <Chip key={f} tone="yellow">
              {f}
            </Chip>
          ))}
        </div>
        <p className="display mt-3 text-3xl font-bold leading-tight">{story?.title ?? "today's story"}</p>
        <p className="mt-2 text-paper/80">{story?.hook ?? "one short story, every day."}</p>
      </div>
    </div>
  );
}

const steps: [string, string][] = [
  ["set us up for the morning", "add a daily reminder to your calendar in one tap, so a story is waiting for you every morning."],
  ["explore a crazy story", "an insane piece of trivia, told as short swipeable cards. about three minutes."],
  ["take a quick quiz", "four questions to lock it in. the last one: which line would you really say at a party?"],
  ["share it with someone", "send the line to a friend. saying it out loud is how it sticks."],
  ["keep your streak, get cooler", "every day you finish adds to your cool score. watch yourself get a few percent cooler each day."],
  ["go deeper", "pick a film, podcast, book or video to dive further into. it isn't just articles."],
];

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Landing({ onPlay, onPlus }: { onPlay: () => void; onPlus: () => void }) {
  const [signIn, setSignIn] = useState(false);
  const [bar, setBar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 700;
      setBar(y > 700 && !nearEnd);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openSignIn() {
    setSignIn(true);
    setTimeout(() => document.getElementById("hero-signin")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  return (
    <div>
      {/* hero: a joyful photo under a deep teal scrim */}
      <section className="relative isolate overflow-hidden bg-deep text-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rooms/hero-portrait.jpg" alt="" className="absolute inset-x-0 top-0 -z-20 h-[360px] w-full object-cover object-[50%_8%] lg:hidden" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rooms/hero-wide.jpg" alt="" className="absolute inset-0 -z-20 hidden h-full w-full object-cover object-[60%_20%] lg:block" />
        {/* phones: bright photo up top, fading to deep teal under the text */}
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[360px] lg:hidden"
          style={{ background: "linear-gradient(180deg, rgba(4,54,58,0.55) 0%, rgba(4,54,58,0.05) 28%, rgba(4,54,58,0.1) 55%, #04363a 100%)" }}
        />
        {/* wide screens: text side dark, photo side bright */}
        <div
          className="absolute inset-0 -z-10 hidden lg:block"
          style={{ background: "linear-gradient(90deg, rgba(4,54,58,0.94) 0%, rgba(4,54,58,0.7) 38%, rgba(4,54,58,0.05) 72%), linear-gradient(180deg, rgba(4,54,58,0.35) 0%, rgba(4,54,58,0) 20%, rgba(4,54,58,0) 80%, #04363a 100%)" }}
        />
        <header className="mx-auto flex max-w-6xl items-start justify-between px-5 pt-6 md:px-8">
          <div>
            <span className="display text-xl font-bold md:text-2xl">make me cool</span>
            <span className="mt-1 flex items-center gap-2 text-sm text-paper/90">
              by
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-main.png" alt="the abstract room" className="h-8 w-auto md:h-9" />
            </span>
          </div>
          <button
            className="display rounded-full border-2 border-paper/80 px-5 py-2.5 text-base font-bold text-paper hover:bg-paper/10"
            onClick={openSignIn}
          >
            sign in
          </button>
        </header>

        <div className="mx-auto mt-44 grid max-w-6xl items-center gap-10 px-5 pb-14 pt-8 lg:mt-0 lg:pt-12 md:px-8 md:pb-24 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="on-deep">
            <h1 className="t-display">
              knowing stuff is <span className="accent-on-deep">sexy</span>
            </h1>
            <p className="t-title mt-5 max-w-xl font-semibold">learn one fascinating story about the world every day.</p>
            <p className="t-body mt-3 max-w-md text-paper/90">five minutes a day, and you&apos;ll always have something cool to say at a houseparty.</p>
            <div className="mt-7 max-w-xl">
              <button className="btn btn-yellow w-full sm:w-auto" onClick={onPlay}>
                play today&apos;s story
              </button>
              <p className="t-body mt-3 font-semibold text-spark">free. no sign-up needed.</p>
              <p className="t-caption mt-1 text-paper/85">about 5 minutes · 9 cards · 4 questions</p>
              <p className="mt-4 flex items-center gap-2.5 text-sm text-paper/90">
                <CuratorBadge size={32} dark />
                <span>picked by sankalp, founder of the abstract room</span>
              </p>
              <button
                className="btn btn-ghost mt-5 w-full !bg-transparent !text-paper !border-paper/70 !shadow-none sm:w-auto"
                onClick={() => (signIn ? setSignIn(false) : openSignIn())}
              >
                {signIn ? "hide sign in" : "i already have an account"}
              </button>
              {signIn && (
                <div id="hero-signin" className="arrive mt-3">
                  <SignInForm id="hero" stacked />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center lg:items-end lg:justify-end lg:self-end">
            <MockToday />
          </div>
        </div>
      </section>

      {/* how a day works */}
      <section className="bg-paper px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="t-headline max-w-3xl">
            how a day <span className="accent-on-light">works</span>
          </h2>
          <ol className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex items-start gap-4">
                <span className="display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-deep text-xl font-bold text-spark">{i + 1}</span>
                <div>
                  <h3 className="display text-xl font-bold">{t}</h3>
                  <p className="t-body mt-1 text-deep/80">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* the first stories */}
      <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="t-headline max-w-3xl">
            a taste of the <span className="accent-on-light">first stories</span>
          </h2>
          <p className="t-body mt-3 max-w-2xl text-deep/85">film, food, language, art, history and more. most stories mix two, because the best things to talk about sit between subjects.</p>
          <ul className="-mx-5 mt-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {[
              ["kuleshov", "kul-soup"],
              ["tikka", "tik-tin"],
              ["klingon", "kli-bubbles"],
            ].map(([id, vis]) => {
              const s = stories.find((x) => x.id === id)!;
              return (
                <li key={id} className="w-[78%] shrink-0 snap-start overflow-hidden rounded-[14px] border-2 border-line bg-white shadow-[0_4px_0_var(--line)] sm:w-[46%] md:w-auto">
                  <Visual id={vis} />
                  <div className="p-4">
                    <p className="t-caption font-semibold uppercase tracking-widest text-brand-ink">{s.fields.join(" + ")}</p>
                    <h4 className="display mt-1 text-lg font-bold leading-tight">{s.title}</h4>
                    <p className="t-caption mt-1 text-deep/80">{s.hook}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* the human behind it */}
      <section className="bg-paper px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <h2 className="t-headline">
              a real person picks <span className="accent-on-light">every story.</span>
            </h2>
            <p className="t-body mt-4 text-deep/85">not an algorithm, and not a content farm. AI only helps polish the language and keep it short. it never chooses a story or signs one off.</p>
          </div>
          <div className="space-y-5">
            <CuratorCard />
            <figure className="rounded-[14px] bg-deep p-6 text-paper">
              <p className="t-caption font-semibold uppercase tracking-widest text-spark">why this is worth five minutes</p>
              <blockquote className="display mt-3 text-xl font-semibold leading-snug md:text-2xl">
                &ldquo;the more you know about the world, the cooler you get, and people want to be around you. every story you pick up is one more pixel. the more pixels you have, the clearer the picture of the world gets. it really doesn&apos;t take much: a little time, every day.&rdquo;
              </blockquote>
              <figcaption className="t-caption mt-3 text-paper/80">sankalp</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* free and plus */}
      <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="t-headline max-w-3xl">
            free for the <span className="accent-on-light">daily story.</span> plus for going deeper.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[14px] border-2 border-line bg-white p-6 shadow-[0_4px_0_var(--line)]">
              <p className="display text-2xl font-bold">free, always</p>
              <ul className="t-body mt-3 space-y-2 text-deep/85">
                <li>today&apos;s story, picked by sankalp</li>
                <li>the quiz and the line to say out loud</li>
                <li>go-deeper picks: films, podcasts, books</li>
                <li>your cool score, streak and badges</li>
                <li>the last 7 days of stories</li>
              </ul>
              <button className="btn btn-yellow mt-5 w-full" onClick={openSignIn}>
                sign in for free access
              </button>
            </div>
            <div className="rounded-[14px] bg-deep p-6 text-paper shadow-[0_4px_0_#021f22]">
              <p className="display text-2xl font-bold">
                plus <span className="text-spark">· {PLUS_PRICE} for 30 days</span>
              </p>
              <ul className="t-body mt-3 space-y-2 text-paper/90">
                <li>the full archive of past stories</li>
                <li>behind the story: sources and what we&apos;re still checking</li>
                <li>
                  <strong className="text-spark">7 days free when you sign up</strong>
                </li>
              </ul>
              <button className="btn btn-yellow mt-5 w-full" onClick={onPlus}>
                commit to become cool · {PLUS_PRICE}
              </button>
              <p className="t-caption mt-4 text-paper/80">pay once. no auto-renewal. your pass helps pay the people who find and check the stories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* the abstract room */}
      <section className="bg-deep px-5 py-12 text-paper md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="t-caption font-semibold uppercase tracking-widest text-spark">from the home of the abstract room</p>
          <h2 className="t-headline mt-3 max-w-3xl">
            six years of getting people to talk about art. now we&apos;re making it a <span className="accent-on-deep">daily habit.</span>
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              ["80,000+", "community"],
              ["700+", "events"],
              ["7", "cities"],
              ["15+", "countries"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="display text-4xl font-bold text-spark md:text-5xl">{n}</dt>
                <dd className="t-body text-paper/80">{l}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4">
            <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-[14px] md:row-span-2 md:aspect-auto">
              <RoomPhotoImg id="point" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[14px]">
              <RoomPhotoImg id="blue" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[14px]">
              <RoomPhotoImg id="yellow" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[14px]">
              <RoomPhotoImg id="cheer" />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[14px]">
              <RoomPhotoImg id="three" />
            </div>
          </div>
          <p className="t-body mt-6 max-w-2xl text-paper/90">
            somewhere between the job, the deadlines and &ldquo;just one more reel,&rdquo; we stopped being curious. so before the brain completely rots, let&apos;s spare five minutes a day for a small mental workout. basically, cool.
          </p>
          <div className="mt-8 max-w-xl on-deep">
            <p className="t-title mb-3">still scrolling? that&apos;s literally the problem.</p>
            <button className="btn btn-yellow" onClick={onPlay}>
              play today&apos;s story
            </button>
          </div>
        </div>
      </section>

      {/* find us */}
      <section className="bg-paper px-5 py-10 text-deep md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className="btn btn-ghost sm:w-auto" href="/how">
            how our stories are made
          </a>
          <a className="btn btn-ghost gap-2 sm:w-auto" href="https://theabstractroom.com/" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/icon-main.png" alt="" className="h-6 w-6" />
            theabstractroom.com
          </a>
          <a className="btn btn-ghost gap-2 sm:w-auto" href="https://www.instagram.com/the_abstractroom/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            @the_abstractroom
          </a>
        </div>
      </section>

      <footer className="bg-paper px-5 pb-24 pt-2 text-deep md:px-8 md:pb-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm">
          <span className="display font-bold">make me cool</span>
          <span className="flex flex-wrap gap-x-2">
            <a className="inline-flex min-h-11 items-center px-2 underline" href="/privacy">privacy</a>
            <a className="inline-flex min-h-11 items-center px-2 underline" href="/terms">terms</a>
            <a className="inline-flex min-h-11 items-center px-2 underline" href="/refunds">refunds</a>
          </span>
        </div>
      </footer>

      {/* a button that follows you on phones, once you've scrolled past the top */}
      {bar && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-deep/10 bg-paper/95 px-4 py-3 backdrop-blur md:hidden">
          <button className="btn btn-yellow w-full" onClick={onPlay}>
            play today&apos;s story
          </button>
        </div>
      )}
    </div>
  );
}
