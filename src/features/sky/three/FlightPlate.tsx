// The engraved orbital diagram doubles as the low-power version of the scene.
const seq = (n: number) => Array.from({ length: n }, (_, i) => i);
function torus(u: number, v: number) {
  const r = 156 + 43 * Math.cos(v),
    x = r * Math.cos(u),
    y = r * Math.sin(u),
    z = 43 * Math.sin(v);
  const tilt = y * 0.48 - z * 0.88,
    depth = y * 0.88 + z * 0.48;
  return [310 + x * 0.9 + tilt * 0.435, 277 - x * 0.435 + tilt * 0.9, depth];
}
function curve(f: (t: number) => number[], steps: number) {
  return (
    seq(steps + 1)
      .map((i) => {
        const [x, y] = f((i / steps) * Math.PI * 2);
        return (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      })
      .join(" ") + "Z"
  );
}
const wires = [
  ...seq(92).map((i) => curve((v) => torus((i * Math.PI) / 46, v), 26)),
  ...seq(22).map((i) => curve((u) => torus(u, (i * Math.PI) / 11), 100)),
];
export function FlightPlate({ plane = true }: { plane?: boolean }) {
  return (
    <svg className="flight-plate" viewBox="0 0 620 530" aria-hidden="true">
      <defs>
        <linearGradient id="wire" x2=".75" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#d2a681" />
          <stop offset=".46" stopColor="#a87967" />
          <stop offset="1" stopColor="#f5d5a2" />
        </linearGradient>
        <linearGradient id="paper" x2=".8" y2=".9">
          <stop stopColor="#fff9e9" />
          <stop offset="1" stopColor="#ceac94" />
        </linearGradient>
        <pattern
          id="hatch"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(32)"
        >
          <path d="M0 0v5" stroke="#633b36" strokeWidth=".6" />
        </pattern>
      </defs>
      <g fill="none" stroke="#d5a38d" opacity=".42" strokeWidth=".7">
        <circle cx="312" cy="264" r="211" strokeDasharray="2 7" />
        <ellipse cx="305" cy="277" rx="289" ry="99" transform="rotate(-28 305 277)" />
        <ellipse
          cx="313"
          cy="259"
          rx="108"
          ry="220"
          transform="rotate(36 313 259)"
          strokeDasharray="6 7"
        />
      </g>
      <g fill="none" stroke="url(#wire)" strokeWidth=".64" opacity=".87">
        {wires.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      {plane && (
        <g className="paper-plane">
          <path d="M135 202 507 97 259 260Z" fill="url(#paper)" />
          <path d="m259 260 248-163-193 200-27 43Z" fill="#a17f71" />
          <path d="M287 340 507 97 315 295Z" fill="#573939" />
          <path d="m507 97-159 231-73-68Z" fill="#edddc4" />
          <path d="m507 97-159 231-73-68Z" fill="url(#hatch)" opacity=".65" />
          <path d="m135 202 372-105-159 231" fill="none" stroke="#fff5dc" />
        </g>
      )}
      <g fill="#e9c599">
        <circle cx="61" cy="369" r="3.3" />
        <circle cx="460" cy="100" r="2" />
        <circle cx="502" cy="333" r="3" />
        <path d="M552 181h13m-6.5-6.5v13M93 150h10m-5-5v10" stroke="currentColor" />
      </g>
      <g stroke="#cfa98e" strokeWidth=".7" fill="none">
        <path d="M382 145h51l31-31h102M186 361h-40l-30 31H39" />
        <circle cx="382" cy="145" r="3" />
        <circle cx="186" cy="361" r="3" />
      </g>
      <g fill="#e4bea3" fontSize="10" fontFamily="monospace" letterSpacing="2">
        <text x="470" y="106">
          TOS—01
        </text>
        <text x="37" y="409">
          ORBIT / 01
        </text>
      </g>
    </svg>
  );
}
