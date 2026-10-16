import type { ReactNode } from "react";

export function Spark({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 1.5c.6 4.9 2.4 7.8 4.6 9.2 1.6 1 3.6 1.1 5.9 1.3-2.3.2-4.3.3-5.9 1.3-2.2 1.4-4 4.3-4.6 9.2-.6-4.9-2.4-7.8-4.6-9.2-1.6-1-3.6-1.1-5.9-1.3 2.3-.2 4.3-.3 5.9-1.3C9.6 9.3 11.4 6.4 12 1.5Z"
        fill="#FFCC00"
        stroke="#04363A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chip({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "yellow" | "deep" }) {
  const cls =
    tone === "yellow"
      ? "bg-spark text-deep"
      : tone === "deep"
        ? "bg-deep text-paper"
        : "bg-mist text-deep";
  return <span className={`t-caption inline-flex items-center rounded-full px-3 py-1 font-medium ${cls}`}>{children}</span>;
}

export function WeekStrip({
  week,
  dark = false,
}: {
  week: { key: string; label: string; done: boolean; today: boolean; weekend: boolean }[];
  dark?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-1.5" role="list" aria-label="this week">
      {week.map((d) => (
        <div key={d.key} role="listitem" className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
              d.done
                ? "border-spark bg-spark text-deep"
                : d.today
                  ? dark
                    ? "border-paper bg-transparent"
                    : "border-deep bg-transparent"
                  : dark
                    ? "border-paper/30"
                    : "border-[#cfdcdb]"
            }`}
          >
            {d.done && <Check />}
          </div>
          <span className={`t-caption ${dark ? "text-paper/80" : "text-deep/70"} ${d.today ? "font-semibold" : ""}`}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}
