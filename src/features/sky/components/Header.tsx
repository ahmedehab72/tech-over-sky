import { useEffect, useState } from "react";

import { Brand } from "./Brand";
const links = [
  ["Studio", "studio"],
  ["Services", "services"],
  ["Work", "work"],
  ["Process", "process"],
];
export function Header() {
  const [open, menu] = useState(false),
    [hidden, hide] = useState(false);
  useEffect(() => {
    let last = scrollY;
    const move = () => {
      if (Math.abs(scrollY - last) > 6) {
        hide(scrollY > 130 && scrollY > last);
        last = scrollY;
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") menu(false);
    };
    addEventListener("scroll", move, { passive: true });
    addEventListener("keydown", esc);
    return () => {
      removeEventListener("scroll", move);
      removeEventListener("keydown", esc);
    };
  }, []);
  return (
    <header className={"sky-header " + (hidden && !open ? "nav-hidden" : "")}>
      <Brand />
      <nav aria-label="Main navigation" className={open ? "expanded" : ""}>
        {links.map(([label, id]) => (
          <a key={id} href={"#" + id} onClick={() => menu(false)}>
            {label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="nav-cta"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.translate =
            (e.clientX - r.left - r.width / 2) * 0.1 + "px 0";
        }}
        onPointerLeave={(e) => (e.currentTarget.style.translate = "")}
      >
        Let’s talk <span>↗</span>
      </a>
      <button className="menu-toggle" aria-expanded={open} onClick={() => menu(!open)}>
        {open ? "Close" : "Menu"}
      </button>
    </header>
  );
}
