import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { Brand } from "./Brand";
import paperUrl from "../assets/paper-texture.svg?no-inline";
import { reduced } from "../hooks/useFlightMotion";
gsap.registerPlugin(MotionPathPlugin);
const Scene = lazy(() => import("../three/FlightScene"));
export function Intro() {
  const [show, setShow] = useState(
      () => !sessionStorage.getItem("tos:intro") && !reduced(),
    ),
    [progress, setProgress] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!show) return;
    // Keep controls behind the intro out of the keyboard and scroll sequence.
    const siblings = Array.from(root.current!.parentElement!.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement && node !== root.current,
    );
    siblings.forEach((node) => (node.inert = true));
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const close = () => {
      sessionStorage.setItem("tos:intro", "1");
      setShow(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", escape);
    let alive = true,
      loaded = 0;
    const timeline = gsap.timeline({ paused: true });
    const status = () => {
      if (alive) setProgress(++loaded * 25);
    };
    const tasks = [
      document.fonts.ready,
      innerWidth > 700 ? import("../three/FlightScene") : Promise.resolve(),
      fetch("/assets/fonts/helvetiker_bold.typeface.json").then((r) => r.json()),
      fetch(paperUrl).then((r) => r.blob()),
    ];
    Promise.allSettled(tasks.map((t) => t.finally(status))).then(() => {
      if (!alive) return;
      const logo = document.querySelector(".brand")!.getBoundingClientRect();
      const word = root.current!.querySelector(".intro-title")!.getBoundingClientRect();
      const dx = logo.x + logo.width / 2 - word.x - word.width / 2,
        dy = logo.y + logo.height / 2 - word.y - word.height / 2;
      timeline
        .to(
          ".intro-title",
          {
            motionPath: {
              path: [
                { x: dx * 0.23, y: dy * 0.69 },
                { x: dx, y: dy },
              ],
              curviness: 1.5,
            },
            scale: logo.width / word.width,
            rotation: 0,
            ease: "power4.inOut",
            duration: 1.1,
          },
          1.5,
        )
        .to(".intro-title", { opacity: 0, duration: 0.18 }, 2.43)
        .to(".intro-dock", { opacity: 1, duration: 0.18 }, 2.43)
        .to(
          root.current,
          { clipPath: "inset(0 0 100% 0)", duration: 0.65, ease: "power3.inOut" },
          2.64,
        )
        .call(() => {
          sessionStorage.setItem("tos:intro", "1");
          setShow(false);
        })
        .play();
    });
    return () => {
      siblings.forEach((node) => (node.inert = false));
      document.documentElement.style.overflow = overflow;
      document.removeEventListener("keydown", escape);
      alive = false;
      timeline.kill();
    };
  }, [show]);
  useEffect(() => {
    if (!show && !reduced()) {
      const t = gsap.fromTo(
        ".hero-copy h1 em",
        { yPercent: 105 },
        { yPercent: 0, duration: 0.7, stagger: 0.09, ease: "power4.out" },
      );
      return () => {
        t.kill();
      };
    }
  }, [show]);
  return show ? (
    <div
      className="intro"
      data-lenis-prevent
      role="dialog"
      aria-label="Studio introduction"
      aria-modal="true"
      ref={root}
    >
      <div className="intro-title">
        <span>TECH OVER SKY</span>
        {innerWidth > 700 && (
          <Suspense fallback={null}>
            <Scene title />
          </Suspense>
        )}
      </div>
      <div className="intro-dock">
        <Brand />
      </div>
      <p className="chapter">Preparing for ascent · {progress}%</p>
      <button
        autoFocus
        onClick={() => {
          sessionStorage.setItem("tos:intro", "1");
          setShow(false);
        }}
      >
        Skip intro
      </button>
    </div>
  ) : null;
}
