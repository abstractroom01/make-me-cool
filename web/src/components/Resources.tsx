import type { ReactNode } from "react";
import type { Resource } from "@/data/stories";

const names: Record<Resource["type"], string> = {
  watch: "watch",
  listen: "listen",
  read: "read",
  book: "book",
  film: "film",
  look: "look",
};

const hints: Partial<Record<Resource["type"], string>> = {
  book: "find it at a library or bookshop",
  film: "find it on a streaming service or at a library",
  listen: "search for it on your music or podcast app",
  watch: "search for it on youtube or a streaming service",
};

function Icon({ type }: { type: Resource["type"] }): ReactNode {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (type) {
    case "watch":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" />
        </svg>
      );
    case "listen":
      return (
        <svg {...common}>
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <rect x="3" y="14" width="4" height="6" rx="1.5" />
          <rect x="17" y="14" width="4" height="6" rx="1.5" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
          <path d="M5 17a3 3 0 0 1 3-3h10" />
        </svg>
      );
    case "film":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="12" rx="2" />
          <path d="M3 8l2-4h4l-2 4M10 8l2-4h4l-2 4M17 8l2-4" />
        </svg>
      );
    case "look":
      return (
        <svg {...common}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M9 12h7M9 16h7M9 8h3" />
        </svg>
      );
  }
}

export function ResourceList({ items, dark = false }: { items: Resource[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((r) => {
        const body = (
          <>
            <span className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[12px] ${dark ? "bg-spark text-deep" : "bg-deep text-spark"}`}>
              <Icon type={r.type} />
            </span>
            <span className="min-w-0">
              <span className="t-caption block font-semibold uppercase tracking-widest opacity-70">{names[r.type]}</span>
              <span className="display block text-lg font-semibold leading-snug">{r.title}</span>
              {r.by && <span className="t-caption block opacity-75">{r.by}</span>}
              <span className="t-body mt-1 block opacity-90">{r.note}</span>
              {!r.url && hints[r.type] && <span className="t-caption mt-1 block opacity-65">{hints[r.type]}</span>}
            </span>
          </>
        );
        const base = `flex gap-3 rounded-[14px] border-2 p-3 ${dark ? "border-paper/25" : "border-line bg-white"}`;
        return (
          <li key={r.title}>
            {r.url ? (
              <a href={r.url} target="_blank" rel="noopener noreferrer" className={`${base} transition-transform active:translate-y-0.5`}>
                {body}
              </a>
            ) : (
              <div className={base}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
