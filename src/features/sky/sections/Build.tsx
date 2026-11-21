import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Headphones,
  Laptop,
  Smartphone,
  Watch,
  Keyboard,
  Monitor,
  Drone,
} from "lucide-react";

import { reduced } from "../hooks/useFlightMotion";
const stages = [
  [
    "Design",
    "Draw the blueprint.",
    "Every build starts with a clear plan. We map the experience before the first component lands.",
  ],
  [
    "Development",
    "Set the foundations.",
    "A resilient architecture gives every product room to grow.",
  ],
  [
    "Development",
    "Shape the storefront.",
    "Interfaces turn the structure into a place people want to explore.",
  ],
  [
    "Integration",
    "Stock the shelves.",
    "We connect the tools, products and services behind the experience.",
  ],
  [
    "Launch",
    "Open the doors.",
    "Testing, release and monitoring bring the store to life.",
  ],
  ["Growth", "See the whole picture.", "Real customer signals guide each new iteration."],
];
function Store() {
  return (
    <svg
      className="store"
      role="img"
      aria-label="Architectural cutaway of the Tech Over Sky store"
      viewBox="0 0 690 340"
    >
      <defs>
        <pattern
          id="grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          patternTransform="matrix(1 .28 -1 .4 330 150)"
        >
          <path d="M24 0H0v24" fill="none" stroke="#ab827a" strokeWidth="1.4" />
        </pattern>
      </defs>
      <g className="store-camera">
        <path
          className="blueprint"
          d="M15 235 351 118 675 215 340 334Z"
          fill="url(#grid)"
          stroke="#946e66"
          strokeDasharray="5 4"
        />
        <g className="walls">
          <path d="m124 206 174-67 248 43-1 65-176 56-245-57Z" fill="#9b746d" />
          <path d="M125 242V110l174-66 4 136Z" fill="#a97073" />
          <path d="m299 44 239 47v139l-239-51Z" fill="#d5b2a5" />
          <path d="m124 242 176-65 238 53-171 59Z" fill="#eedac5" />
        </g>
        <g className="facade">
          <path d="m118 109 180-69 249 49-178 69Z" fill="#582134" />
          <path
            d="m143 106 157-58 218 42-152 59Z"
            fill="#753346"
            stroke="#c29b8a"
            strokeWidth="1"
          />
          <g stroke="#ac7a77" strokeWidth=".8" opacity=".75">
            {Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d={"m" + (163 + i * 27) + " " + (109 + i * 5.2) + " 154-58"}
              />
            ))}
          </g>
          <path d="m118 109 251 49v25l-251-49Z" fill="#741d34" />
          <path d="m369 158 178-69v26l-178 69Z" fill="#50152a" />
          <text
            x="160"
            y="98"
            transform="skewY(11)"
            fill="#f8e8cc"
            fontSize="17"
            fontWeight="bold"
          >
            TECH OVER SKY
          </text>
          <path
            d="M130 137v106m232-58v99m177-165v109"
            fill="none"
            stroke="#822d42"
            strokeWidth="6"
          />
          <path d="m371 185 159-63v103l-159 56Z" fill="#b8d6d0" opacity=".48" />
        </g>
        <g className="shelves" transform="translate(166 159) skewY(11)">
          <path d="M0 29h171M0 65h171" stroke="#743a43" strokeWidth="5" />
          {[Laptop, Smartphone, Headphones, Watch, Keyboard, Monitor, Drone].map(
            (Icon, i) => (
              <g
                className="product"
                key={i}
                transform={"translate(" + (i % 4) * 40 + " " + (i < 4 ? 2 : 38) + ")"}
              >
                <Icon size={26} color="#572536" strokeWidth={1.7} />
              </g>
            ),
          )}
        </g>
        <g className="open-sign">
          <path
            d="m151 140 89 18-8 3-82-17Zm111 22 89 18-8 3-82-17Z"
            fill="#ffe4a9"
            style={{ filter: "drop-shadow(0 1px 4px #ffc56c)" }}
          />
          <rect x="390" y="193" width="48" height="21" rx="3" fill="#6c2035" />
          <text x="396" y="208" fill="#ffd595" fontSize="13">
            OPEN
          </text>
          {[0, 1].map((i) => (
            <g
              key={i}
              transform={"translate(" + (461 + 30 * i) + " " + (231 + i * 9) + ")"}
              stroke="#612e40"
              strokeWidth="5"
            >
              <circle cy="-17" r="4" fill="#cb9f7c" />
              <path d="M0-11v14m0-10-6 6m6-6 5 4M0 2l-4 10m4-10 5 10" />
            </g>
          ))}
        </g>
        <g className="satellites" fill="#a87455">
          <path d="m90 96 6-13 5 13-5 10Zm454-41 6-14 4 14-4 10Z" />
        </g>
      </g>
    </svg>
  );
}
export default function Build() {
  const section = useRef<HTMLElement>(null),
    [step, setStep] = useState(0),
    [progress, setProgress] = useState(0);
  const trigger = useRef<ScrollTrigger>();
  const timeline = useRef<gsap.core.Timeline>();
  useLayoutEffect(() => {
    const node = section.current!;
    const ctx = gsap.context(() => {
      const simple = reduced();
      const state = { value: 0 };
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
        onUpdate() {
          setProgress(Math.round(state.value * 100));
          setStep(Math.min(5, Math.floor(state.value * 6)));
        },
      });
      timeline.current = tl;
      tl.to(state, { value: 1, duration: 6 }, 0)
        .from(".blueprint", { strokeDashoffset: 110, opacity: 0.5, duration: 0.8 }, 0)
        .from(".walls", { scaleY: 0, transformOrigin: "50% 100%", duration: 1 }, 0.85)
        .from(".facade", { y: -35, opacity: 0, duration: 0.85 }, 1.85)
        .from(".shelves", { x: -35, opacity: 0, duration: 0.65 }, 2.85)
        .from(
          ".product",
          {
            scale: 0,
            transformOrigin: "center",
            stagger: 0.09,
            duration: 0.4,
            ease: "back.out(2)",
          },
          3.15,
        )
        .from(".open-sign", { rotationY: 90, opacity: 0, duration: 0.8 }, 4.05)
        .from(".open-sign g", { x: 20, opacity: 0, stagger: 0.18, duration: 0.45 }, 4.36)
        .from(".product svg", { color: "#9b7d75", duration: 0.4 }, 4.16)
        .from(".satellites", { opacity: 0, y: 30, duration: 0.7 }, 5)
        .to(".store-camera", { scale: 0.88, transformOrigin: "center", duration: 1 }, 5)
        .fromTo(".store-camera", { x: 42 }, { x: -24, duration: 6 }, 0);
      for (let i = 1; i < 6; i++) {
        tl.to(
          ".caption-track",
          { xPercent: (-100 * i) / 6, duration: 0.32, ease: "power2.inOut" },
          i - 0.1,
        );
      }
      if (!simple)
        trigger.current = ScrollTrigger.create({
          trigger: node,
          start: "top top",
          end: () => "+=" + Math.max(1850, innerHeight * 3),
          pin: true,
          scrub: 1,
          animation: tl,
          invalidateOnRefresh: true,
        });
    }, node);
    return () => ctx.revert();
  }, []);
  function select(i: number) {
    const p = i === 5 ? 1 : (i + 0.25) / 6;
    if (trigger.current)
      window.scrollTo({
        top: trigger.current.start + p * (trigger.current.end - trigger.current.start),
        behavior: "instant",
      });
    else timeline.current?.progress(p);
  }
  return (
    <section id="construction" ref={section} className="build cream">
      <div className="section-head">
        <div>
          <p className="chapter">
            <i />
            Chapter 02 <b>/</b> The build
          </p>
          <h2>
            Building the Tech Store<span>.</span>
          </h2>
        </div>
        <span className="plate-no">Fig. 02 / 07</span>
      </div>
      <div className="build-stage">
        <div className="caption-window">
          <div className="caption-track">
            {stages.map(([tag, title, desc], i) => (
              <div key={title} className="build-caption">
                <small>
                  0{i + 1} / {tag}
                </small>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <Store />
      </div>
      <div className="build-controls">
        {stages.map(([tag], i) => (
          <button
            key={i}
            className={i === step ? "selected" : ""}
            aria-label={"Stage " + (i + 1) + ": " + tag}
            aria-pressed={i === step}
            onClick={() => select(i)}
          >
            0{i + 1}
          </button>
        ))}
        <span>{progress}% built</span>
      </div>
      <div className="meter">
        <i style={{ width: progress + "%" }} />
      </div>
    </section>
  );
}
