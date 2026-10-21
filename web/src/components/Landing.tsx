"use client";

import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { Chip, Spark, WeekStrip } from "./ui";
import { Visual } from "./Visual";
import { stories } from "@/data/stories";

const topics = [
  "cinema",
  "literature",
  "music",
  "culture",
  "language",
  "art and paintings",
  "history",
  "psychology",
  "philosophy",
  "food",
];

const sampleWeek = [
  { key: "a", label: "m", done: true, today: false, weekend: false },
  { key: "b", label: "t", done: true, today: false, weekend: false },
  { key: "c", label: "w", done: true, today: false, weekend: false },
  { key: "d", label: "t", done: false, today: true, weekend: false },
  { key: "e", label: "f", done: false, today: false, weekend: false },
  { key: "f", label: "s", done: false, today: false, weekend: true },
  { key: "g", label: "s", done: false, today: false, weekend: true },
];

function MockToday() {
  return (
    <div className="card-shadow w-full max-w-md rounded-[14px] bg-paper p-5 text-deep" aria-label="a preview of today's screen">
      <div className="flex items-center justify-between">
        <span className="t-caption font-semibold uppercase tracking-widest text-deep/70">today</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-spark px-3 py-1 text-sm font-bold">
          <Spark size={16} /> 3 day streak
        </span>
      </div>
      <div className="mt-4 rounded-[14px] bg-deep p-5 text-paper">
        <div className="flex gap-2">
          <Chip tone="yellow">cinema</Chip>
          <Chip tone="yellow">psychology</Chip>
        </div>
        <p className="display mt-3 text-3xl font-bold leading-tight">the kuleshov effect</p>
        <p className="mt-2 text-paper/80">a film teacher made people cry using soup.</p>
      </div>
      <div className="mt-5">
        <WeekStrip week={sampleWeek} />
      </div>
    </div>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <li className="rounded-[14px] border-2 border-[#cfdcdb] bg-white p-6 shadow-[0_4px_0_#cfdcdb]">
      <span className="display flex h-11 w-11 items-center justify-center rounded-full bg-deep text-xl font-bold text-spark">
        {n}
      </span>
      <h3 className="t-title mt-4">{title}</h3>
      <p className="t-body mt-2 text-deep/80">{text}</p>
    </li>
  );
}

export function Landing({ onPlay }: { onPlay: () => void }) {
  const [more, setMore] = useState(false);
  const [signIn, setSignIn] = useState(false);

  return (
    <div>
      {/* hero: full-bleed photo under a deep teal scrim */}
      <section className="relative isolate overflow-hidden bg-deep text-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/about-photo.webp"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_20%]"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(180deg, rgba(4,54,58,0.3) 0%, rgba(4,54,58,0.62) 38%, #04363a 92%)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 hidden lg:block"
          style={{ background: "linear-gradient(90deg, rgba(4,54,58,0.88) 0%, rgba(4,54,58,0.5) 50%, rgba(4,54,58,0) 100%)" }}
        />
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 md:px-8">
          <span className="display text-xl font-bold md:text-2xl">make me cool</span>
          <span className="flex items-center gap-2 text-sm text-paper/90">
            by
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-main.png" alt="the abstract room" className="h-9 w-auto md:h-11" />
          </span>
        </header>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="on-deep">
            <h1 className="t-display">
              knowing stuff is <span className="accent-on-deep">sexy</span>
            </h1>
            <p className="t-title mt-6 font-semibold">a daily workout for your personality</p>
            <ul className="t-body mt-3 space-y-1 text-paper/90">
              <li>five minutes a day</li>
              <li>one interesting thing</li>
              <li>something to actually say at the houseparty</li>
            </ul>
            <div className="mt-8 max-w-xl">
              <button className="btn btn-yellow w-full sm:w-auto" onClick={onPlay}>
                play today&apos;s story
              </button>
              <p className="t-caption mt-3 text-paper/80">free. no account needed. we&apos;ll ask you to save your score after.</p>
              <button className="t-caption mt-3 underline text-paper/90" onClick={() => setSignIn(!signIn)}>
                {signIn ? "hide sign in" : "already playing? sign in"}
              </button>
              {signIn && (
                <div className="arrive mt-3">
                  <SignInForm id="hero" />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <MockToday />
          </div>
        </div>
      </section>

      {/* topics */}
      <section className="bg-paper px-5 pb-6 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="t-headline max-w-3xl">
            what you&apos;ll <span className="accent-on-light">learn about</span>
          </h2>
          <p className="t-body mt-4 max-w-2xl text-deep/85">
            ten subjects to start with. most stories mix two of them, because the best things to talk about sit between subjects.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {topics.map((t, k) => (
              <li
                key={t}
                className={`display rounded-full px-5 py-2.5 text-lg font-semibold ${
                  ["bg-deep text-paper", "bg-spark text-deep", "bg-mist text-deep", "border-2 border-deep text-deep"][k % 4]
                }`}
              >
                {t}
              </li>
            ))}
          </ul>

          <h3 className="t-title mt-14">the first stories</h3>
          <ul className="mt-5 grid gap-5 md:grid-cols-3">
            {[
              ["kuleshov", "kul-soup"],
              ["tikka", "tik-tin"],
              ["klingon", "kli-bubbles"],
            ].map(([id, vis]) => {
              const s = stories.find((x) => x.id === id)!;
              return (
                <li key={id} className="overflow-hidden rounded-[14px] border-2 border-[#cfdcdb] bg-white shadow-[0_4px_0_#cfdcdb]">
                  <Visual id={vis} />
                  <div className="p-5">
                    <p className="t-caption font-semibold uppercase tracking-widest text-brand">{s.fields.join(" + ")}</p>
                    <h4 className="display mt-1 text-xl font-bold leading-tight">{s.title}</h4>
                    <p className="t-body mt-2 text-deep/80">{s.hook}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* how it works */}
      <section className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="t-headline max-w-3xl">
            become <span className="accent-on-light">disgustingly</span> more cool
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            <Step n="1" title="read one story" text="every day you get one short story. a film trick, a dish everyone argues about, a language made up for aliens. you flip through it like cards." />
            <Step n="2" title="answer four questions" text="nothing scary. the last one asks what you'd actually say about it at a party, and you pick the best line." />
            <Step n="3" title="come back tomorrow" text="finishing a story lights your streak. do it again the next day and it grows. you get one rest day a week, and you keep it." />
          </ol>
        </div>
      </section>

      {/* manifesto */}
      <section className="bg-mist px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="t-headline">we&apos;ve stopped being curious.</h2>
          <div className="t-body space-y-4 text-deep/90">
            <p>
              about concepts, ideas, cinema, literature, philosophy, music, society. somewhere between the job, the
              deadlines and &ldquo;just one more reel,&rdquo; it all got quietly pushed aside. nobody decided it. it just
              happened.
            </p>
            <p>so before the brain completely rots, let&apos;s spare five minutes a day for a small mental workout.</p>
            {more && (
              <div className="arrive space-y-4">
                <p>
                  because let&apos;s be honest, nobody wants to be the one at the party who just nods along when the
                  conversation gets good. you&apos;d rather be the one with a take, a story, a reference nobody saw
                  coming. the one people actually want to hang out with.
                </p>
                <p className="display text-2xl font-bold">basically, cool.</p>
              </div>
            )}
            <button className="btn btn-ghost" onClick={() => setMore(!more)} aria-expanded={more}>
              {more ? "read less" : "read more"}
            </button>
          </div>
        </div>
      </section>

      {/* free and plus */}
      <section className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="t-headline max-w-3xl">
            free for the <span className="accent-on-light">daily story.</span> plus for going deeper.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[14px] border-2 border-[#cfdcdb] bg-white p-6 shadow-[0_4px_0_#cfdcdb]">
              <p className="display text-2xl font-bold">free, always</p>
              <ul className="t-body mt-3 space-y-2 text-deep/85">
                <li>today&apos;s story, picked by a person</li>
                <li>the quiz and the line to say out loud</li>
                <li>your cool score, streak and badges</li>
                <li>the last 7 days of stories</li>
              </ul>
            </div>
            <div className="rounded-[14px] bg-deep p-6 text-paper shadow-[0_4px_0_#021f22]">
              <p className="display text-2xl font-bold">plus</p>
              <ul className="t-body mt-3 space-y-2 text-paper/90">
                <li>the full archive of past stories</li>
                <li>behind the story: sources and what we&apos;re still checking</li>
                <li>7 days of plus free when you sign up</li>
                <li>more to come, only when it exists</li>
              </ul>
              <p className="t-caption mt-4 text-paper/75">pay once for a pass. no auto-renewal. your pass helps pay the people who find and check the stories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* the abstract room */}
      <section className="bg-deep px-5 py-16 text-paper md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="t-caption font-semibold uppercase tracking-widest text-spark">from the home of the abstract room</p>
          <h2 className="t-headline mt-3 max-w-3xl">
            six years of getting people to talk about art. now we&apos;re making it a <span className="accent-on-deep">daily habit.</span>
          </h2>
          <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
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
          <p className="t-body mt-8 max-w-2xl text-paper/80">
            the abstract room is an experiences and media company for india&apos;s most passionate pop-culture lovers.
          </p>
          <div className="mt-10 max-w-xl on-deep">
            <p className="t-title mb-3">still scrolling? that&apos;s literally the problem.</p>
            <button className="btn btn-yellow" onClick={onPlay}>
              play today&apos;s story
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-paper px-5 py-8 text-deep md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm">
          <span className="display font-bold">make me cool</span>
          <span className="flex flex-wrap gap-5">
            <a className="underline" href="/privacy">privacy</a>
            <a className="underline" href="/terms">terms</a>
            <a className="underline" href="/refunds">refunds</a>
            <a className="underline" href="https://theabstractroom.com/" target="_blank" rel="noopener noreferrer">
              theabstractroom.com
            </a>
            <a className="underline" href="https://www.instagram.com/the_abstractroom/" target="_blank" rel="noopener noreferrer">
              instagram
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
