"use client";

import { useState } from "react";
import type { Story } from "@/data/stories";
import { Chip } from "./ui";

export function Tell({
  story,
  onShared,
  onContinue,
}: {
  story: Story;
  onShared: (channel: string) => void;
  onContinue: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const line = `${story.takeaway}\n\n${story.hook}\n\nfrom make me cool, by the abstract room. ${url}`;
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function nativeShare() {
    try {
      await navigator.share({ title: story.title, text: line });
      onShared("native");
    } catch {
      /* cancelled */
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(line);
      setCopied(true);
      onShared("copy");
    } catch {
      /* ignore */
    }
  }

  return (
    <main className="min-h-dvh bg-paper">
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-10 md:max-w-2xl">
        <div className="arrive">
          <Chip tone="yellow">the point of all this</Chip>
          <h1 className="t-headline mt-4">
            who will you <span className="accent-on-light">tell</span> today?
          </h1>
          <p className="t-body mt-3 text-deep/85">
            knowing it is half. saying it is the other half. send the line to one person, or just plan to say it out loud.
          </p>

          <div className="card-shadow mt-6 rounded-[14px] bg-spark p-6 text-deep">
            <p className="t-caption font-semibold uppercase tracking-widest">your line</p>
            <p className="display mt-2 text-2xl font-bold leading-tight md:text-3xl">&ldquo;{story.takeaway}&rdquo;</p>
            <p className="t-body mt-3 text-deep/85">{story.starter}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              className="btn btn-yellow"
              href={`https://wa.me/?text=${encodeURIComponent(line)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onShared("whatsapp")}
            >
              send on whatsapp
            </a>
            {canShare && (
              <button className="btn btn-ghost" onClick={nativeShare}>
                share another way
              </button>
            )}
            <button className="btn btn-ghost" onClick={copy}>
              {copied ? "copied!" : "copy the line"}
            </button>
            <button className="btn btn-deep" onClick={onContinue}>
              i&apos;ll say it out loud. continue
            </button>
          </div>
          <p className="t-caption mt-4 text-deep/65">tomorrow we&apos;ll ask once how it went. no pressure.</p>
        </div>
      </div>
    </main>
  );
}
