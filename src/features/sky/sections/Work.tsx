import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
const projects = [
  {
    name: "Forma Index",
    type: "Platforms",
    client: "Architecture archive",
    headline: "An archive built for discovery.",
    story:
      "A searchable visual library for an architecture practice. We paired an editorial index with a lightweight content system so the studio can publish new work in minutes.",
    art: "forma",
  },
  {
    name: "Relay",
    type: "Mobile",
    client: "Mobility app",
    headline: "The city, within reach.",
    story:
      "A mobile companion that brings daily routes, live departures and saved journeys into one clear view. We prototyped the core interactions with commuters before building the app.",
    art: "relay",
  },
  {
    name: "Field Objects",
    type: "Commerce",
    client: "Independent retail",
    headline: "Space for considered objects.",
    story:
      "A tactile storefront for an independent design label. A modular catalogue and fast checkout help the small retail team move from seasonal drops to year-round sales.",
    art: "field",
  },
];
type Project = (typeof projects)[number];
function Artwork({ project: p }: { project: Project }) {
  return (
    <div aria-hidden="true" className={"project-art " + p.art}>
      <div className="art-sheet">
        <small>{p.client}</small>
        <strong>{p.name}</strong>
        <div className="art-object">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <span>
          {p.art === "forma"
            ? "INDEX OF STRUCTURES"
            : p.art === "relay"
              ? "UPCOMING JOURNEY"
              : "COLLECTION 001"}
        </span>
      </div>
    </div>
  );
}
export function Work() {
  const [filter, choose] = useState("All"),
    [project, open] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (project) dialog.current?.showModal();
  }, [project]);
  return (
    <section id="work" className="work cream">
      <p className="chapter">
        <i />
        Chapter 05 <b>/</b> Portfolio
      </p>
      <h2>Selected work.</h2>
      <svg width="0" height="0" aria-hidden="true">
        <filter id="paper-ripple">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".014 .04"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </svg>
      <div className="filters" aria-label="Filter projects">
        {["All", "Platforms", "Mobile", "Commerce"].map((f) => (
          <button key={f} onClick={() => choose(f)} aria-pressed={f === filter}>
            {f}
          </button>
        ))}
      </div>
      <div className="works-grid">
        <AnimatePresence mode="popLayout">
          {projects
            .filter((p) => filter === "All" || p.type === filter)
            .map((p) => (
              <motion.button
                layout={!reduced}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={p.name}
                onClick={() => open(p)}
                className="project"
              >
                <Artwork project={p} />
                <small>{p.type}</small>
                <h3>{p.name} ↗</h3>
              </motion.button>
            ))}
        </AnimatePresence>
      </div>
      <dialog aria-label={project?.name} ref={dialog} onClose={() => open(null)}>
        {project && (
          <>
            <button
              autoFocus
              className="dialog-close"
              onClick={() => dialog.current?.close()}
            >
              Close ×
            </button>
            <Artwork project={project} />
            <div className="dialog-copy">
              <small>
                {project.name} / {project.type}
              </small>
              <h3>{project.headline}</h3>
              <p>{project.story}</p>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
