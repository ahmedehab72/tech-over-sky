import { useEffect } from "react";

import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { Hero } from "./sections/Hero";
import Build from "./sections/Build";
import { Studio } from "./sections/Studio";
import { Work } from "./sections/Work";
import { Journey } from "./sections/Journey";
import { Contact } from "./sections/Contact";
import { useFlightMotion } from "./hooks/useFlightMotion";
import "./sky.css";
export default function SkyPage() {
  useFlightMotion();
  useEffect(() => {
    if (
      !matchMedia(
        "(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
      ).matches
    )
      return;
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(ring);
    const move = (e: PointerEvent) => {
      ring.style.left = e.clientX + "px";
      ring.style.top = e.clientY + "px";
      const target = e.target as HTMLElement;
      ring.classList.toggle("over", !!target.closest("a,button"));
      ring.textContent = target.closest(".project") ? "View" : "";
    };
    window.addEventListener("pointermove", move);
    return () => {
      ring.remove();
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return (
    <div className="sky" lang="en" dir="ltr">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content">
        <Hero />
        <Build />
        <Studio />
        <Work />
        <Journey />
        <Contact />
      </main>
      <Intro />
    </div>
  );
}
