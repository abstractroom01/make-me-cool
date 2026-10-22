"use client";

/** Keeps the sharer's id (?r=) on the way into the app, so they can hear that someone played. */
export function PlayLink({ storyId, className, children }: { storyId: string; className?: string; children: React.ReactNode }) {
  function href() {
    if (typeof window === "undefined") return `/?story=${storyId}`;
    const r = new URLSearchParams(window.location.search).get("r");
    return `/?story=${storyId}${r ? `&r=${encodeURIComponent(r)}` : ""}`;
  }
  return (
    <a
      className={className}
      href={`/?story=${storyId}`}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = href();
      }}
    >
      {children}
    </a>
  );
}
