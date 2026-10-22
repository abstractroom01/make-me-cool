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
      <text x={x} y={y + 7} textAnchor="middle" fontSize="22" fontWeight="700" fill={R} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
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
          <text x="160" y="146" textAnchor="middle" fontSize="11" fill={P} fillOpacity="0.85" style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
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
          <text x="160" y="84" textAnchor="middle" fontSize="38" fontWeight="700" fill={Y} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
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
            <text key={t} x={70 + k * 90} y="138" textAnchor="middle" fontSize="12" fill={P} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
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
          <text x="160" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill={D} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
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
          <text x="160" y="146" textAnchor="middle" fontSize="11" fill={P} fillOpacity="0.85" style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
            about a dozen fluent speakers, once
          </text>
        </Frame>
      );
    case "moz-phones":
      return (
        <Frame label="headphones and music notes">
          <path d="M108 96 a52 52 0 0 1 104 0" fill="none" stroke={P} strokeWidth="9" strokeLinecap="round" />
          <rect x="94" y="88" width="26" height="44" rx="10" fill={Y} />
          <rect x="200" y="88" width="26" height="44" rx="10" fill={Y} />
          <circle cx="262" cy="62" r="9" fill={P} />
          <circle cx="286" cy="52" r="9" fill={P} />
          <path d="M271 62 v-36 l24 -8 v36" fill="none" stroke={P} strokeWidth="4" strokeLinejoin="round" />
        </Frame>
      );
    case "moz-students":
      return (
        <Frame label="thirty-six students">
          {Array.from({ length: 36 }).map((_, k) => (
            <circle key={k} cx={70 + (k % 6) * 36} cy={26 + Math.floor(k / 6) * 18} r="6.5" fill={k < 12 ? Y : k < 24 ? P : "#7FD0D5"} />
          ))}
          <text x="160" y="143" textAnchor="middle" fontSize="11" fill={P} fillOpacity="0.85" style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
            36 students · three groups
          </text>
        </Frame>
      );
    case "moz-boost":
      return (
        <Frame label="a small boost that fades back to normal">
          <line x1="30" y1="112" x2="290" y2="112" stroke={P} strokeOpacity="0.45" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M34 112 L96 112 L108 44 C140 46 176 86 232 110 L288 112" fill="none" stroke={Y} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="108" y="34" textAnchor="middle" fontSize="12" fill={P} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
            after mozart
          </text>
          <text x="232" y="132" textAnchor="middle" fontSize="12" fill={P} fillOpacity="0.85" style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
            gone in ~15 min
          </text>
        </Frame>
      );
    case "moz-news":
      return (
        <Frame label="a newspaper headline">
          <rect x="78" y="16" width="164" height="120" rx="4" fill={P} />
          <rect x="92" y="28" width="136" height="14" rx="3" fill={D} />
          <text x="160" y="84" textAnchor="middle" fontSize="34" fontWeight="700" fill={R} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
            smarter!
          </text>
          <path d="M92 100 h60 M92 112 h48 M168 100 h60 M168 112 h50" stroke={D} strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
        </Frame>
      );
    case "moz-cd":
      return (
        <Frame label="a classical music cd">
          <circle cx="160" cy="75" r="54" fill={P} />
          <circle cx="160" cy="75" r="40" fill="none" stroke={Y} strokeWidth="5" strokeDasharray="10 8" />
          <circle cx="160" cy="75" r="14" fill={FRAME} />
          <path d="M120 44 a46 46 0 0 1 28 -16" fill="none" stroke={B} strokeWidth="6" strokeLinecap="round" />
        </Frame>
      );
    case "moz-mixed":
      return (
        <Frame label="mixed results">
          <path d="M70 100 L120 52 L150 84 L190 40 L250 96" fill="none" stroke={P} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="160" y="132" textAnchor="middle" fontSize="38" fontWeight="700" fill={Y} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
            ?
          </text>
        </Frame>
      );
    case "trol-switch":
      return (
        <Frame label="a runaway trolley with a switch">
          <path d="M20 78 H128 L200 40 H300 M128 78 L200 114 H300" fill="none" stroke={P} strokeWidth="6" strokeLinejoin="round" />
          <rect x="40" y="58" width="46" height="26" rx="6" fill={Y} />
          <circle cx="52" cy="90" r="6" fill={P} />
          <circle cx="76" cy="90" r="6" fill={P} />
          <circle cx="128" cy="78" r="9" fill={R} />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={236 + k * 14} cy="26" r="6" fill={P} />
          ))}
          <circle cx="268" cy="132" r="6" fill={P} />
        </Frame>
      );
    case "trol-bridge":
      return (
        <Frame label="a man on a bridge above the track">
          <line x1="40" y1="52" x2="280" y2="52" stroke={P} strokeWidth="8" strokeLinecap="round" />
          <path d="M70 52 v60 M250 52 v60" stroke={P} strokeOpacity="0.5" strokeWidth="6" />
          <circle cx="160" cy="26" r="9" fill={R} />
          <path d="M160 35 v14 M150 42 h20" stroke={R} strokeWidth="5" strokeLinecap="round" />
          <line x1="20" y1="118" x2="300" y2="118" stroke={P} strokeWidth="5" />
          <rect x="60" y="96" width="46" height="22" rx="6" fill={Y} />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={210 + k * 16} cy="108" r="6" fill={P} />
          ))}
        </Frame>
      );
    case "trol-world":
      return (
        <Frame label="decisions from all over the world">
          <circle cx="160" cy="75" r="56" fill="none" stroke={P} strokeWidth="3" />
          <ellipse cx="160" cy="75" rx="24" ry="56" fill="none" stroke={P} strokeOpacity="0.5" strokeWidth="2" />
          <path d="M104 75 h112 M112 52 h96 M112 98 h96" stroke={P} strokeOpacity="0.5" strokeWidth="2" />
          {Array.from({ length: 34 }).map((_, k) => {
            const a = k * 2.399;
            const r = 8 + ((k * 37) % 46);
            return <circle key={k} cx={160 + Math.cos(a) * r} cy={75 + Math.sin(a) * r * 0.9} r="3.6" fill={k % 3 === 0 ? Y : R} />;
          })}
        </Frame>
      );
    case "wave-print":
    case "wave-fuji":
      return (
        <Frame label="a great wave with mount fuji behind it">
          <polygon points="236,112 268,66 300,112" fill={P} fillOpacity="0.95" />
          <polygon points="268,66 257,82 268,77 279,84" fill={D} fillOpacity="0.5" />
          <path d="M0 150 C30 112 70 70 128 56 C178 44 222 66 214 98 C204 78 178 74 164 88 C186 84 206 104 198 126 C190 140 160 140 138 150 Z" fill="#0a6f77" stroke={P} strokeWidth="3" strokeLinejoin="round" />
          <path d="M178 62 c10 4 12 14 2 18 M196 74 c8 4 8 12 0 14" fill="none" stroke={P} strokeWidth="3" strokeLinecap="round" />
          {[[212, 56], [226, 70], [236, 54], [248, 80]].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r="4" fill={P} />
          ))}
          {id === "wave-fuji" && <circle cx="268" cy="92" r="34" fill="none" stroke={Y} strokeWidth="4" strokeDasharray="8 6" />}
          <path d="M0 136 q40 -12 80 0 t80 0 t80 0 t80 0" fill="none" stroke={P} strokeOpacity="0.55" strokeWidth="3" />
        </Frame>
      );
    case "wave-score":
      return (
        <Frame label="the cover of an orchestral score">
          <rect x="104" y="12" width="112" height="128" rx="3" fill={P} />
          <path d="M110 58 C126 30 150 24 176 30 C158 30 150 44 164 52 C148 52 134 60 128 70 Z" fill={B} />
          <text x="160" y="90" textAnchor="middle" fontSize="15" fontWeight="700" fill={D} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
            la mer
          </text>
          {[104, 110, 116, 122, 128].map((y) => (
            <line key={y} x1="116" y1={y} x2="204" y2={y} stroke={D} strokeOpacity="0.55" strokeWidth="1.6" />
          ))}
        </Frame>
      );
    case "flag-flag":
      return (
        <Frame label="a japanese flag covered in handwriting">
          <rect x="74" y="22" width="172" height="106" rx="4" fill={P} />
          <circle cx="160" cy="75" r="30" fill={R} />
          {[
            "M84 38 q6 -7 12 0 t12 0 t12 0 t12 0",
            "M178 38 q6 -7 12 0 t12 0 t12 0 t12 0",
            "M84 116 q6 -7 12 0 t12 0 t12 0 t12 0",
            "M178 116 q6 -7 12 0 t12 0 t12 0 t12 0",
          ].map((d, k) => (
            <path key={k} d={d} fill="none" stroke={D} strokeWidth="2.6" strokeLinecap="round" />
          ))}
          <path d="M84 60 v30 M90 64 v20 M232 58 v34 M226 66 v18" stroke={D} strokeWidth="2.6" strokeLinecap="round" />
        </Frame>
      );
    case "flag-pin":
      return (
        <Frame label="saipan, 1944">
          <ellipse cx="160" cy="116" rx="92" ry="16" fill={P} fillOpacity="0.9" />
          <Pin x={160} y={56} c={Y} />
          <text x="160" y="142" textAnchor="middle" fontSize="12" fill={P} style={{ fontFamily: "var(--font-josefin), sans-serif" }}>
            saipan, 1944
          </text>
        </Frame>
      );
    case "flag-home":
      return (
        <Frame label="a flag travelling home">
          <rect x="40" y="52" width="76" height="52" rx="3" fill={P} />
          <circle cx="78" cy="78" r="14" fill={R} />
          <path d="M132 78 H196" stroke={Y} strokeWidth="6" strokeLinecap="round" />
          <path d="M184 66 L198 78 L184 90" fill="none" stroke={Y} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="248,40 292,76 204,76" fill={Y} transform="translate(0 0)" />
          <rect x="216" y="76" width="64" height="42" rx="2" fill={P} />
          <rect x="240" y="92" width="16" height="26" fill={FRAME} />
        </Frame>
      );
    default:
      return null;

  }
}
