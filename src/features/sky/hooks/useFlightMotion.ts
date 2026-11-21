import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
export const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export function useFlightMotion() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({
      anchors: true,
      duration: 0.85,
      prevent: (node) =>
        node.tagName === "DIALOG" || node.classList.contains("testimonials"),
    });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
