/**
 * Abstract hero graphic: a sparse lattice of nodes with a few connected paths that draw in once.
 * Deliberately restrained (no robots, no heavy glow). Decorative only.
 */
const COLS = 9;
const ROWS = 9;
const GAP = 52;
const OFFSET = 30;

const p = (c: number, r: number) => [OFFSET + c * GAP, OFFSET + r * GAP] as const;

// Paths through the lattice: assess → build → integrate → optimize, as orthogonal/diagonal routes.
const routes: [number, number][][] = [
  [[0, 6], [2, 6], [3, 5], [5, 5], [6, 4], [8, 4]],
  [[1, 1], [1, 3], [3, 3], [4, 4], [4, 7], [6, 7]],
  [[7, 0], [7, 2], [5, 2], [5, 5]],
];

const hubs: [number, number][] = [
  [3, 3],
  [5, 5],
  [4, 4],
];

export function LatticeVisual({ className = "" }: { className?: string }) {
  const size = OFFSET * 2 + GAP * (COLS - 1);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="lattice-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="lattice-mask">
          <rect width={size} height={size} fill="url(#lattice-fade)" />
        </mask>
      </defs>
      <g mask="url(#lattice-mask)">
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const [x, y] = p(i % COLS, Math.floor(i / COLS));
          return <circle key={i} cx={x} cy={y} r={1.6} fill="#A9B6C8" opacity={0.35} />;
        })}
        {routes.map((route, i) => (
          <polyline
            key={i}
            className="lattice-path"
            style={{ animationDelay: `${0.3 + i * 0.35}s` }}
            points={route.map(([c, r]) => p(c, r).join(",")).join(" ")}
            fill="none"
            stroke={i === 0 ? "#06C7D9" : "#5B6B80"}
            strokeWidth={i === 0 ? 1.75 : 1.25}
            strokeLinejoin="round"
          />
        ))}
        {hubs.map(([c, r], i) => {
          const [x, y] = p(c, r);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={9} fill="none" stroke="#06C7D9" strokeOpacity={0.35} className="lattice-pulse" style={{ animationDelay: `${i * 0.8}s` }} />
              <circle cx={x} cy={y} r={3.5} fill="#06C7D9" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
