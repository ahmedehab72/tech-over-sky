import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { AppWindow, Smartphone, Layers3, Cloud, Orbit, ShoppingBag } from "lucide-react";

import { Mark } from "../components/Brand";
import { reduced } from "../hooks/useFlightMotion";
const serviceImages = [
  ["web", "Web developer working on a laptop"],
  ["mobile", "Mobile app interface on a smartphone"],
  ["design", "Visual design layouts and creative tools"],
  ["cloud", "Server racks in a data center"],
  ["ai", "Artificial intelligence technology visualization"],
  ["commerce", "Retail checkout and payment experience"],
];
const services = [
  [
    AppWindow,
    "Web development",
    "Fast, expressive digital platforms with a foundation that scales.",
  ],
  [
    Smartphone,
    "Mobile apps",
    "Native-feeling experiences for the moments people reach for their phone.",
  ],
  [
    Layers3,
    "UI / UX design",
    "Research, prototypes and design systems shaped around real use.",
  ],
  [
    Cloud,
    "Cloud & DevOps",
    "Reliable infrastructure and release pipelines that keep teams moving.",
  ],
  [
    Orbit,
    "AI solutions",
    "Practical intelligence built into the workflows that need it.",
  ],
  [
    ShoppingBag,
    "E-commerce",
    "Storefronts that carry the brand from discovery through checkout.",
  ],
] as const;
export function Studio() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (reduced()) return;
    const c = gsap.context(() => {
      gsap.from(".word", {
        opacity: 0.32,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".statement",
          start: "top 85%",
          end: "bottom 50%",
          scrub: true,
        },
      });
      gsap.to(".studio-mark", {
        rotationY: 170,
        rotationZ: -22,
        scrollTrigger: { trigger: "#studio", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        gsap.from(el, {
          innerText: 0,
          snap: { innerText: 1 },
          duration: 1.3,
          scrollTrigger: { trigger: el, start: "top 95%" },
        });
      });
    }, root);
    return () => c.revert();
  }, []);
  return (
    <div ref={root}>
      <section className="studio cream" id="studio">
        <p className="chapter">
          <i />
          Chapter 03 <b>/</b> Who we are
        </p>
        <div className="statement">
          <h2>
            {"A small studio with a wide horizon.".split(" ").map((w, i) => (
              <span className="word" key={i}>
                {w}{" "}
              </span>
            ))}
          </h2>
          <div className="studio-mark">
            <Mark />
          </div>
        </div>
        <p>
          We’re designers and engineers working side by side. From the first sketch to the
          first thousand users, we stay close to the people we build for.
        </p>
        <div className="stats">
          {[
            [8, "Years in flight"],
            [48, "Projects launched"],
            [32, "Client partners"],
            [12, "Countries reached"],
          ].map(([n, label]) => (
            <div key={label}>
              <strong>
                <span className="count">{n}</span>+
              </strong>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="services night" id="services">
        <p className="chapter">
          <i />
          Chapter 04 <b>/</b> Services
        </p>
        <h2>What we build.</h2>
        <div className="service-stack">
          {services.map(([Icon, title, desc], i) => (
            <article
              key={title}
              style={{ top: 72 + i * 6 }}
              onPointerMove={(e) => {
                if (e.pointerType === "mouse" && !reduced())
                  e.currentTarget.style.transform =
                    "perspective(900px) rotateY(" +
                    (e.clientX / innerWidth - 0.5) * 3 +
                    "deg)";
              }}
              onPointerLeave={(e) => (e.currentTarget.style.transform = "")}
            >
              <div className="service-copy">
                <div className="service-meta">
                  <small>0{i + 1}</small>
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <div className="service-photo">
                <img
                  src={"/assets/images/service-" + serviceImages[i][0] + ".jpg"}
                  alt={serviceImages[i][1]}
                  loading="lazy"
                  width="1000"
                  height="650"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
