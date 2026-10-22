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
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-10">
        <div className="arrive">
          <Chip tone="yellow">last step</Chip>
          <h1 className="t-headline mt-4">
            now say it to <span className="accent-on-light">someone.</span>
          </h1>
          <p className="t-body mt-3 text-deep/85">send this line to one person today. it takes five seconds, and it&apos;s how it sticks.</p>

          <div className="card-shadow mt-6 rounded-[14px] bg-spark p-6 text-deep">
            <p className="display text-2xl font-bold leading-tight md:text-3xl">&ldquo;{story.takeaway}&rdquo;</p>
            <p className="t-body mt-3 text-deep/85">{story.starter}</p>
          </div>

          <a
            className="btn btn-yellow mt-6 w-full"
            href={`https://wa.me/?text=${encodeURIComponent(line)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onShared("whatsapp")}
          >
            send on whatsapp
          </a>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="btn btn-ghost !px-3" onClick={copy}>
              {copied ? "copied!" : "copy the line"}
            </button>
            {canShare ? (
              <button className="btn btn-ghost !px-3" onClick={nativeShare}>
                share another way
              </button>
            ) : (
              <span />
            )}
          </div>

          <button className="t-body mx-auto mt-6 block underline" onClick={onContinue}>
            skip, i&apos;ll say it out loud
          </button>
        </div>
      </div>
    </main>
  );
}
