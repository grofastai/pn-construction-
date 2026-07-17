"use client";

import { useState, useEffect } from "react";
import Reveal from "./ui/Reveal";

const HERO_VIDEO_SRC = "/videos/hero-construction.mp4";

export default function Hero() {
  const [videoAvailable, setVideoAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(HERO_VIDEO_SRC, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setVideoAvailable(true);
      })
      .catch(() => {
        /* network error — leave videoAvailable false, gradient stays */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background: "linear-gradient(160deg, var(--navy) 0%, var(--navy-light) 55%, var(--blue-dark) 100%)",
      }}
      aria-label="Hero"
    >
      {/* Background video — only rendered once a HEAD check confirms the file exists;
          the gradient above shows on its own until then, or if the file is never added. */}
      {videoAvailable && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}

      {/* Dark overlay for text legibility over the video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,40,104,0.82) 0%, rgba(0,40,104,0.55) 55%, rgba(0,45,144,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(46,134,255,0.5) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <span className="mb-6 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
            Krishnagiri, Tamil Nadu
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
            PN CONSTRUCTION
          </h1>
          <p className="mt-3 text-base font-medium uppercase tracking-[0.3em] text-white/70 md:text-lg">
            Building Homes, Building Trust
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg">
            PN Construction Builders brings modern design and quality craftsmanship to
            every home we build in Krishnagiri and beyond.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-blue px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-dark"
            >
              Get a Free Consultation
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              View Our Style
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
