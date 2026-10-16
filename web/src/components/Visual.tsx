import type { ReactNode } from "react";

// Original illustrations, drawn for this app in the brand colours (no licensed images).
const P = "#FAFCFB"; // paper
const Y = "#FFCC00"; // yellow
const R = "#E8483C"; // red
const D = "#04363A"; // deep teal
const B = "#098B93"; // brand teal
const FRAME = "#0B5C62";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label={label} className="h-auto w-full rounded-[10px]">
      <rect width="320" height="150" fill={FRAME} />
      {children}
    </svg>
  );
}

function Face({ x, y = 78, r = 34, squint = false }: { x: number; y?: number; r?: number; squint?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={P} />
      {squint ? (
        <>
          <path d={`M${x - 16} ${y - 6} l8 3 M${x + 16} ${y - 6} l-8 3`} stroke={D} strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={x - 12} cy={y - 6} r="3.6" fill={D} />
          <circle cx={x + 12} cy={y - 6} r="3.6" fill={D} />
        </>
      )}
      <path d={`M${x - 11} ${y + 14} h22`} stroke={D} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  );
}

function Split({ children, left }: { children: ReactNode; left: ReactNode }) {
  return (
    <>
      {left}
      <line x1="160" y1="14" x2="160" y2="136" stroke={P} strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" />
      {children}
    </>
  );
}

function Bowl({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 36} ${y} h72 a36 30 0 0 1 -72 0Z`} fill={P} />
      <ellipse cx={x} cy={y} rx="36" ry="7" fill={Y} />
      <path d={`M${x - 14} ${y - 12} q-6 -10 0 -20 M${x + 4} ${y - 12} q-6 -10 0 -20 M${x + 20} ${y - 12} q-6 -10 0 -20`} fill="none" stroke={P} strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Tin({ x, y, mark }: { x: number; y: number; mark?: string }) {
  return (
    <g>
      <rect x={x - 28} y={y - 36} width="56" height="72" rx="6" fill={R} />
      <rect x={x - 28} y={y - 36} width="56" height="9" rx="4" fill={P} fillOpacity="0.8" />
      <rect x={x - 28} y={y + 27} width="56" height="9" rx="4" fill={P} fillOpacity="0.8" />
      <circle cx={x} cy={y} r="16" fill={P} />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="22" fontWeight="700" fill={R} style={{ fontFamily: "var(--font-jost), sans-serif" }}>
        {mark ?? "S"}
      </text>
    </g>
  );
}

function Hat({ x, y = 82 }: { x: number; y?: number }) {
  return (
    <g>
      <path d={`M${x - 26} ${y} a16 16 0 0 1 8 -30 a20 20 0 0 1 36 0 a16 16 0 0 1 8 30Z`} fill={P} />
      <rect x={x - 26} y={y} width="52" height="20" rx="3" fill={P} />
      <rect x={x - 26} y={y + 10} width="52" height="4" fill={Y} />
    </g>
  );
}

function Pin({ x, y, c }: { x: number; y: number; c: string }) {
  return (
    <g>
      <path d={`M${x} ${y + 34} c-18 -22 -22 -28 -22 -38 a22 22 0 0 1 44 0 c0 10 -4 16 -22 38Z`} fill={c} />
      <circle cx={x} cy={y - 4} r="8" fill={P} />
    </g>
  );
}

function Book({ x, y, w = 70, h = 90, c = Y }: { x: number; y: number; w?: number; h?: number; c?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={c} />
      <rect x={x} y={y} width="9" height={h} rx="3" fill={D} fillOpacity="0.35" />
      <path d={`M${x + 22} ${y + 22} h${w - 34} M${x + 22} ${y + 36} h${w - 46}`} stroke={D} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function Visual({ id }: { id: string }) {
  switch (id) {
    case "kul-face":
      return (
        <Frame label="a man's face with no expression">
          <Face x={160} r={46} />
        </Frame>
      );
    case "kul-soup":
      return (
        <Frame label="a blank face beside a bowl of soup">
          <Split left={<Face x={80} />}>
            <Bowl x={240} y={78} />
          </Split>
        </Frame>
      );
    case "kul-coffin":
      return (
        <Frame label="a blank face beside a coffin">
          <Split left={<Face x={80} />}>
            <polygon points="214,24 266,24 282,60 266,128 214,128 198,60" fill={P} />
            <path d="M240 50 v40 M226 64 h28" stroke={D} strokeWidth="5" strokeLinecap="round" />
          </Split>
        </Frame>
      );
    case "kul-divan":
      return (
        <Frame label="a blank face beside a sofa">
          <Split left={<Face x={80} />}>
            <rect x="196" y="60" width="88" height="46" rx="12" fill={R} />
            <rect x="190" y="74" width="22" height="46" rx="10" fill={R} />
            <rect x="268" y="74" width="22" height="46" rx="10" fill={R} />
            <rect x="204" y="46" width="72" height="26" rx="10" fill={Y} />
            <path d="M204 124 v8 M276 124 v8" stroke={P} strokeWidth="5" strokeLinecap="round" />
          </Split>
        </Frame>
      );
    case "kul-strip":
      return (
        <Frame label="three frames with the same face">
          {[58, 160, 262].map((x) => (
            <g key={x}>
              <rect x={x - 46} y="22" width="92" height="106" rx="6" fill={D} fillOpacity="0.5" />
              <Face x={x} y={76} r={28} />
            </g>
          ))}
          <text x="160" y="146" textAnchor="middle" fontSize="11" fill={P} fillOpacity="0.85" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            same face, every time
          </text>
        </Frame>
      );
    case "kul-baby":
      return (
        <Frame label="a squinting man beside a baby">
          <Split left={<Face x={80} squint />}>
            <circle cx="240" cy="82" r="30" fill={P} />
            <path d="M232 52 q8 -14 16 0" fill="none" stroke={P} strokeWidth="4" strokeLinecap="round" />
            <circle cx="229" cy="80" r="3.6" fill={D} />
            <circle cx="251" cy="80" r="3.6" fill={D} />
            <path d="M232 94 q8 8 16 0" fill="none" stroke={D} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="222" cy="92" r="5" fill={R} fillOpacity="0.5" />
            <circle cx="258" cy="92" r="5" fill={R} fillOpacity="0.5" />
          </Split>
        </Frame>
      );
    case "tik-dish":
      return (
        <Frame label="a bowl of curry">
          <path d="M92 76 h136 a68 56 0 0 1 -136 0Z" fill={P} />
          <ellipse cx="160" cy="76" rx="68" ry="12" fill={R} />
          <ellipse cx="160" cy="75" rx="52" ry="7" fill={Y} fillOpacity="0.85" />
          <circle cx="140" cy="74" r="5" fill={P} />
          <circle cx="170" cy="77" r="5" fill={P} />
          <path d="M128 58 q-8 -12 0 -24 M160 56 q-8 -12 0 -24 M192 58 q-8 -12 0 -24" fill="none" stroke={P} strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
        </Frame>
      );
    case "tik-tin":
      return (
        <Frame label="a tin of tomato soup">
          <Tin x={160} y={80} />
        </Frame>
      );
    case "tik-chefs":
      return (
        <Frame label="two chefs, two claims">
          <Hat x={88} />
          <Hat x={232} />
          <text x="160" y="84" textAnchor="middle" fontSize="38" fontWeight="700" fill={Y} style={{ fontFamily: "var(--font-jost), sans-serif" }}>
            vs
          </text>
        </Frame>
      );
    case "tik-fiction":
      return (
        <Frame label="a soup tin with a question mark">
          <Tin x={160} y={80} mark="?" />
          <path d="M104 36 l10 10 M216 36 l-10 10 M96 84 h14 M224 84 h-14" stroke={Y} strokeWidth="4" strokeLinecap="round" />
        </Frame>
      );
    case "tik-pins":
      return (
        <Frame label="three places that all claim it">
          <Pin x={70} y={64} c={Y} />
          <Pin x={160} y={64} c={R} />
          <Pin x={250} y={64} c={P} />
          {["punjab", "glasgow", "britain"].map((t, k) => (
            <text key={t} x={70 + k * 90} y="138" textAnchor="middle" fontSize="12" fill={P} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {t}
            </text>
          ))}
        </Frame>
      );
    case "kli-glyphs":
      return (
        <Frame label="invented angular alien letters">
          {[0, 1, 2, 3].map((k) => (
            <g key={k} transform={`translate(${52 + k * 66} 80)`} stroke={k % 2 ? Y : P} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {k === 0 && <path d="M-16 34 v-46 l16 -22 l16 22 v46 M-16 6 h32" />}
              {k === 1 && <path d="M-18 -34 l36 34 l-36 34 M18 -34 v68" />}
              {k === 2 && <path d="M0 -34 v68 M-18 -12 l18 14 l18 -14 M-18 24 h36" />}
              {k === 3 && <path d="M-18 -34 h36 v30 h-36 M-18 2 l36 32" />}
            </g>
          ))}
        </Frame>
      );
    case "kli-bubbles":
      return (
        <Frame label="people making up sounds and words">
          <path d="M40 40 h110 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 h-70 l-22 18 v-18 h-18 a10 10 0 0 1 -10 -10 v-40 a10 10 0 0 1 10 -10Z" fill={P} />
          <path d="M170 64 h110 a10 10 0 0 1 10 10 v36 a10 10 0 0 1 -10 10 h-18 v18 l-22 -18 h-70 a10 10 0 0 1 -10 -10 v-36 a10 10 0 0 1 10 -10Z" fill={Y} />
          <path d="M58 64 h74 M58 78 h46 M190 88 h80 M190 102 h50" stroke={D} strokeWidth="5" strokeLinecap="round" />
        </Frame>
      );
    case "kli-clap":
      return (
        <Frame label="a film clapperboard">
          <rect x="96" y="62" width="128" height="68" rx="6" fill={P} />
          <path d="M96 62 l-4 -22 l128 -14 l4 22Z" fill={D} />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M${110 + k * 28} 58 l-8 -26 h18 l8 26Z`} fill={Y} />
          ))}
          <path d="M112 88 h96 M112 104 h60" stroke={D} strokeWidth="5" strokeLinecap="round" />
        </Frame>
      );
    case "kli-book":
      return (
        <Frame label="a dictionary">
          <Book x={116} y={26} w={88} h={104} />
          <text x="160" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill={D} style={{ fontFamily: "var(--font-jost), sans-serif" }}>
            1985
          </text>
        </Frame>
      );
    case "kli-books":
      return (
        <Frame label="a shelf of translated classics">
          <Book x={44} y={34} w={56} h={96} c={Y} />
          <Book x={108} y={20} w={60} h={110} c={P} />
          <Book x={176} y={40} w={52} h={90} c={R} />
          <Book x={236} y={28} w={44} h={102} c={B} />
          <rect x="30" y="130" width="260" height="6" rx="3" fill={P} />
        </Frame>
      );
    case "kli-people":
      return (
        <Frame label="about a dozen fluent speakers">
          {Array.from({ length: 12 }).map((_, k) => (
            <circle key={k} cx={52 + (k % 6) * 43} cy={54 + Math.floor(k / 6) * 48} r="15" fill={k === 0 ? Y : P} />
          ))}
          <text x="160" y="146" textAnchor="middle" fontSize="11" fill={P} fillOpacity="0.85" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            about a dozen fluent speakers, once
          </text>
        </Frame>
      );
    default:
      return null;
  }
}
