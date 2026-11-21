import { lazy, Suspense, useSyncExternalStore, useRef, useState } from "react";

import { FlightPlate } from "../three/FlightPlate";
const fullScene = matchMedia("(prefers-reduced-motion: no-preference)");
const subscribe = (notify: () => void) => {
  fullScene.addEventListener("change", notify);
  return () => fullScene.removeEventListener("change", notify);
};
const FlightScene = lazy(() => import("../three/FlightScene"));
export function Hero() {
  const enhanced = useSyncExternalStore(subscribe, () => fullScene.matches);
  const control = useRef({ yaw: 0, pitch: 0, paused: false, dragging: false });
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <section id="ground" className="hero night">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="chapter">
            <i />
            Chapter 01 <b>/</b> The ground
          </p>
          <h1>
            {["We build", "technology that", "rises above."].map((line) => (
              <span key={line}>
                <em>{line}</em>
              </span>
            ))}
          </h1>
          <p className="lede">
            An independent technology studio turning bold ideas into digital products
            built to go further.
          </p>
          <a className="solid" href="#work">
            Explore our work <span>&#8599;</span>
          </a>
        </div>
        <div
          className="atlas interactive-flight"
          tabIndex={0}
          role="group"
          aria-label="Paper aircraft. Drag to rotate 360 degrees or use arrow keys. Home resets view."
          onPointerDown={(e) => {
            if (e.button !== 0) return;
            drag.current = {
              x: e.clientX,
              y: e.clientY,
              yaw: control.current.yaw,
              pitch: control.current.pitch,
            };
            control.current.dragging = true;
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            control.current.yaw =
              drag.current.yaw +
              ((e.clientX - drag.current.x) / e.currentTarget.clientWidth) * Math.PI * 2;
            control.current.pitch =
              drag.current.pitch +
              ((e.clientY - drag.current.y) / e.currentTarget.clientHeight) * Math.PI * 2;
          }}
          onPointerUp={() => {
            drag.current = null;
            control.current.dragging = false;
          }}
          onPointerCancel={() => {
            drag.current = null;
            control.current.dragging = false;
          }}
          onKeyDown={(e) => {
            if (
              !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(e.key)
            )
              return;
            e.preventDefault();
            if (e.key === "Home") {
              control.current.yaw = 0;
              control.current.pitch = 0;
            } else if (e.key === "ArrowLeft" || e.key === "ArrowRight")
              control.current.yaw += e.key === "ArrowLeft" ? -0.2 : 0.2;
            else control.current.pitch += e.key === "ArrowUp" ? -0.2 : 0.2;
          }}
        >
          <FlightPlate />
          {enhanced && (
            <Suspense fallback={null}>
              <FlightScene control={control} />
            </Suspense>
          )}
        </div>
      </div>
      <div className="flight-interaction">
        <span>Drag to rotate � 360�</span>
        <button
          onClick={() => {
            control.current.paused = !paused;
            setPaused(!paused);
          }}
          aria-pressed={paused}
        >
          {paused ? "Resume motion" : "Pause motion"}
        </button>
        <button
          onClick={() => {
            control.current.yaw = 0;
            control.current.pitch = 0;
          }}
        >
          Reset view
        </button>
      </div>
      <div className="hero-rail">
        <a href="#construction">
          <span className="scroll-arrow">&#8595;</span> Scroll to ascend
        </a>
        <span className="rail-rule" />
        <span>
          01 <b>/</b> 07
        </span>
      </div>
    </section>
  );
}
