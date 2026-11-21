import { useEffect, useState, type FormEvent } from "react";
import gsap from "gsap";

import { reduced } from "../hooks/useFlightMotion";
import { Brand } from "../components/Brand";
export function Contact() {
  const [draft, save] = useState(""),
    [status, setStatus] = useState("");
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  useEffect(() => {
    if (reduced()) return;
    const tween = gsap.from(".contact footer strong", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: { trigger: ".contact footer", start: "top 98%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (endpoint) {
      setStatus("Sending…");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: f,
        });
        if (!response.ok) throw Error();
        setStatus("Message sent. Thanks for getting in touch.");
        form.reset();
      } catch {
        setStatus("Couldn’t send your message. Please try again.");
      }
      return;
    }
    const url =
      "mailto:" +
      (import.meta.env.VITE_CONTACT_EMAIL || "studio@techoversky.example") +
      "?subject=" +
      encodeURIComponent("Project enquiry from " + f.get("name")) +
      "&body=" +
      encodeURIComponent(
        f.get("message") + "\n\n" + f.get("name") + "\n" + f.get("email"),
      );
    save(url);
    location.href = url;
  }
  return (
    <section className="contact night" id="contact">
      <div>
        <p className="chapter">
          <i />
          Chapter 07 <b>/</b> Reach the sky
        </p>
        <h2>Let’s build something above the clouds.</h2>
      </div>
      <form
        onSubmit={submit}
        onChange={() => {
          save("");
          if (status !== "Sending…") setStatus("");
        }}
      >
        <label>
          <input name="name" required placeholder=" " autoComplete="name" />
          <span>Your name</span>
        </label>
        <label>
          <input
            name="email"
            type="email"
            required
            placeholder=" "
            autoComplete="email"
          />
          <span>Email address</span>
        </label>
        <label>
          <textarea name="message" required placeholder=" " rows={3} />
          <span>Tell us about your project</span>
        </label>
        <button className="solid" disabled={status === "Sending…"}>
          {endpoint ? "Send enquiry" : "Prepare email"} ↗
        </button>
        {status && <p role="status">{status}</p>}
        {(draft || status.startsWith("Message sent")) && (
          <p className="success" role="status">
            <span className="confetti" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <i
                  key={i}
                  style={{ left: i * 7 + "%", animationDelay: i * 0.035 + "s" }}
                />
              ))}
            </span>
            {draft && (
              <>
                ✦ Your draft is ready. Send it from your email app.{" "}
                <a href={draft}>Reopen draft</a>
              </>
            )}
          </p>
        )}
      </form>
      <footer>
        <Brand />
        <a href="#ground">Back to top ↑</a>
        {[
          ["LinkedIn", import.meta.env.VITE_LINKEDIN_URL],
          ["Instagram", import.meta.env.VITE_INSTAGRAM_URL],
        ]
          .filter(([, url]) => url)
          .map(([label, url]) => (
            <a key={label} href={url}>
              {label}
            </a>
          ))}
        <a
          href={
            "https://www.linkedin.com/sharing/share-offsite/?url=" +
            encodeURIComponent(location.origin)
          }
          target="_blank"
          rel="noreferrer"
        >
          Share on LinkedIn
        </a>
        <strong>TECH OVER SKY</strong>
      </footer>
    </section>
  );
}
