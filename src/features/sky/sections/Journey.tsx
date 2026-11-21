import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { reduced } from "../hooks/useFlightMotion";
gsap.registerPlugin(MotionPathPlugin);
const steps = [
  ["Discover", "Interviews, workshops and a shared definition of success."],
  ["Design", "A tangible prototype to test the idea with real people."],
  ["Develop", "Small releases, clear code and a close feedback loop."],
  ["Deploy", "A measured rollout with monitoring from day one."],
  ["Scale", "Product decisions grounded in how people actually use it."],
];
const quotes = [
  [
    "They brought the same care to our back office as they did to the storefront. Our team feels the difference every day.",
    "Mara Ellis",
    "Founder, Field Objects",
  ],
  [
    "The prototype helped us make decisions in a week that we’d been circling for months.",
    "Sam Porter",
    "Product lead, Relay",
  ],
  [
    "We finally have an archive that our editors love using as much as our readers.",
    "Nina Chen",
    "Director, Forma Index",
  ],
];
export function Journey() {
  const root = useRef<HTMLDivElement>(null),
    carousel = useRef<HTMLDivElement>(null);
  const [index, select] = useState(0);
  useLayoutEffect(() => {
    if (reduced()) return;
    const c = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".steps",
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      });
      tl.fromTo(
        ".route-drawn",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: "none" },
        0,
      ).to(
        ".route-plane",
        {
          motionPath: { path: ".route-drawn", align: ".route-drawn", autoRotate: 90 },
          ease: "none",
        },
        0,
      );
      const loop = gsap.to(".tech-strip", {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
      });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const dir = self.direction;
          gsap.to(loop, {
            timeScale: dir * (1 + Math.min(3, Math.abs(self.getVelocity()) / 700)),
            overwrite: true,
            duration: 0.2,
            onComplete: () => {
              gsap.to(loop, { timeScale: dir, duration: 0.5 });
            },
          });
        },
      });
    }, root);
    return () => c.revert();
  }, []);
  const drag = useRef<{ x: number; left: number } | null>(null);
  return (
    <div ref={root}>
      <section id="process" className="journey cream">
        <p className="chapter">
          <i />
          Chapter 06 <b>/</b> Process
        </p>
        <h2>The journey up.</h2>
        <div className="steps">
          <svg viewBox="0 0 100 500" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M25 12C98 73 3 115 45 175S87 285 40 333 55 419 45 481"
              className="route-base"
            />
            <path
              pathLength="1"
              strokeDasharray="1"
              className="route-drawn"
              d="M25 12C98 73 3 115 45 175S87 285 40 333 55 419 45 481"
            />
            <path className="route-plane" d="m0-8 5 13-5-3-5 3z" />
          </svg>
          {steps.map(([title, desc], i) => (
            <article key={title}>
              <small>0{i + 1}</small>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="marquee" aria-label="Technologies we work with">
        <div className="tech-strip">
          {[0, 1].map((i) => (
            <div key={i} aria-hidden={i === 1}>
              {[
                ["React", "react"],
                ["Node.js", "nodejs"],
                ["Three.js", "threejs"],
                ["Flutter", "flutter"],
                ["AWS", "amazonwebservices"],
                ["Figma", "figma"],
              ].map(([name, icon]) => (
                <span key={name}>
                  <img src={"/assets/icons/" + icon + ".svg"} alt="" loading="lazy" />
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className="voices night">
        <p className="chapter">
          <i />
          Client perspectives
        </p>
        <h2>From our partners.</h2>
        <div
          ref={carousel}
          className="testimonials"
          onScroll={(e) =>
            select(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))
          }
          onPointerDown={(e) => {
            if (e.pointerType === "mouse") {
              drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
              e.currentTarget.setPointerCapture(e.pointerId);
            }
          }}
          onPointerMove={(e) => {
            if (drag.current)
              e.currentTarget.scrollLeft = drag.current.left + drag.current.x - e.clientX;
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
        >
          {quotes.map(([q, name, role]) => (
            <figure key={name}>
              <blockquote>“{q}”</blockquote>
              <figcaption>
                {name} <span>{role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="quote-nav">
          {quotes.map((q, i) => (
            <button
              key={q[1]}
              aria-pressed={index === i}
              aria-label={"Read testimonial " + (i + 1)}
              onClick={() =>
                carousel.current?.scrollTo({
                  left: i * carousel.current.clientWidth,
                  behavior: reduced() ? "instant" : "smooth",
                })
              }
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
