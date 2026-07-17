"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const TOTAL_FRAMES = 480;
const FRAME_PATH = "/hero-frames/frame_";
const FRAME_EXT = ".png";

const pad = (n: number) => String(n).padStart(6, "0");
const frameUrl = (i: number) => `${FRAME_PATH}${pad(i)}${FRAME_EXT}`;

const COPY_SEQUENCE = [
  { text: "PN CONSTRUCTION", type: "title" as const, start: 0, end: 15 },
  { text: "Every home starts with a vision.", type: "line" as const, start: 12, end: 26 },
  { text: "We bring it to life, brick by brick.", type: "line" as const, start: 23, end: 36 },
  { text: "Building Homes, Building Trust.", type: "accent" as const, start: 33, end: 46 },
  { text: "Krishnagiri's trusted construction partner.", type: "line" as const, start: 43, end: 58 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrame = useRef(0);
  const [, setLoadProgress] = useState(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = images.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  /* Canvas resize + frame preload */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      drawFrame(currentFrame.current);
    };
    resize();
    /* Defends against a race where window.innerWidth/innerHeight read 0 at the
       exact moment this effect fires, before the browser's first layout pass
       completes — leaves the canvas permanently 0x0 otherwise. */
    const rafId = requestAnimationFrame(resize);
    window.addEventListener("resize", resize);

    let loadedCount = 0;
    let cancelled = false;

    const loadImage = (index: number): Promise<void> =>
      new Promise((resolve) => {
        if (cancelled || images.current[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.onload = () => {
          if (cancelled) {
            resolve();
            return;
          }
          images.current[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (index === currentFrame.current) {
            drawFrame(index);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameUrl(index);
      });

    const indices = (step: number) =>
      Array.from({ length: Math.ceil(TOTAL_FRAMES / step) }, (_, k) => k * step);

    const preload = async () => {
      await loadImage(0);
      drawFrame(0);

      if (cancelled) return;
      await Promise.all(indices(20).map(loadImage));

      if (cancelled) return;
      await Promise.all(indices(10).map(loadImage));

      if (cancelled) return;
      await Promise.all(indices(5).map(loadImage));

      for (let i = 0; i < TOTAL_FRAMES; i += 60) {
        if (cancelled) return;
        await Promise.all(
          Array.from({ length: 30 }, (_, k) => i + k * 2).filter((n) => n < TOTAL_FRAMES).map(loadImage)
        );
      }

      for (let i = 0; i < TOTAL_FRAMES; i += 30) {
        if (cancelled) return;
        await Promise.all(
          Array.from({ length: 30 }, (_, k) => i + k).filter((n) => n < TOTAL_FRAMES).map(loadImage)
        );
      }
    };

    preload();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [drawFrame]);

  /* Scroll-driven animation — uses #hero-root as the scroll canvas */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const wrapper = document.getElementById("hero-root");
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const frameProgress = self.progress;
          const targetIndex = Math.min(
            Math.floor(frameProgress * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          );

          let bestIndex = targetIndex;
          if (!images.current[targetIndex]) {
            bestIndex = 0;
            for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
              const lo = targetIndex - offset;
              const hi = targetIndex + offset;
              if (lo >= 0 && images.current[lo]) {
                bestIndex = lo;
                break;
              }
              if (hi < TOTAL_FRAMES && images.current[hi]) {
                bestIndex = hi;
                break;
              }
            }
          }

          if (bestIndex !== currentFrame.current) {
            currentFrame.current = bestIndex;
            drawFrame(bestIndex);
          }
        },
      });

      if (bloomRef.current) {
        gsap.fromTo(
          bloomRef.current,
          { opacity: 0.05 },
          {
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: "55% bottom",
              scrub: 1,
            },
          }
        );
      }

      if (finalTextRef.current) {
        gsap.fromTo(
          finalTextRef.current,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "75% top",
              end: "95% top",
              scrub: true,
            },
          }
        );
      }

      copyRefs.current.forEach((el, i) => {
        if (!el) return;
        const { start, end } = COPY_SEQUENCE[i];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: `${start}% top`,
            end: `${end}% top`,
            scrub: 1,
          },
        });

        tl.fromTo(
          el,
          { opacity: 0, z: -1500, scale: 0.6, y: 30 },
          { opacity: 1, z: 0, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
        tl.to(el, { opacity: 0, z: 1500, scale: 2.5, duration: 0.6, ease: "power2.in" });
      });
    }, section);

    return () => ctx.revert();
  }, [drawFrame]);

  /* Page load entrance */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({ delay: 0.3 });
    if (overlayRef.current) {
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0);
    }
    if (copyRefs.current[0]) {
      tl.fromTo(
        copyRefs.current[0],
        { opacity: 0, y: 60, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out" },
        0.2
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="sticky top-0 w-full h-screen overflow-hidden"
      style={{
        zIndex: 10,
        background: "linear-gradient(160deg, var(--navy) 0%, var(--navy-light) 55%, var(--blue-dark) 100%)",
      }}
      aria-label="Hero — Scroll to explore"
    >
      {/* Frame canvas — transparent until frames load, so the gradient above always shows through as a graceful fallback */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Cinematic vignette */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: `
            linear-gradient(180deg, rgba(0,20,60,0.35) 0%, rgba(0,20,60,0.0) 30%, rgba(0,20,60,0.0) 60%, rgba(0,20,60,0.5) 100%),
            linear-gradient(90deg, rgba(0,20,60,0.2) 0%, transparent 25%, transparent 75%, rgba(0,20,60,0.2) 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Blue bloom */}
      <div
        ref={bloomRef}
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: "radial-gradient(ellipse 65% 45% at 50% 25%, rgba(46,134,255,0.22) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 3D text (copy sequence) */}
      <div
        className="absolute inset-0 flex items-center justify-center z-[5]"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full max-w-[90vw] text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {COPY_SEQUENCE.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                copyRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
              style={{ backfaceVisibility: "hidden" }}
            >
              {item.type === "title" ? (
                <h1
                  className="font-sans select-none"
                  style={{
                    fontSize: "clamp(3rem, 10vw, 9rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.03em",
                    fontWeight: 700,
                    color: "#ffffff",
                    textShadow: "0 4px 60px rgba(0,0,0,0.45), 0 0 120px rgba(46,134,255,0.2)",
                  }}
                >
                  {item.text}
                </h1>
              ) : item.type === "accent" ? (
                <p
                  className="font-sans select-none"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    fontWeight: 700,
                    color: "#5da2ff",
                    textShadow: "0 4px 40px rgba(0,0,0,0.7), 0 0 80px rgba(46,134,255,0.4)",
                  }}
                >
                  {item.text}
                </p>
              ) : (
                <p
                  className="font-sans select-none max-w-2xl mx-auto"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    lineHeight: 1.4,
                    letterSpacing: "-0.005em",
                    fontWeight: 500,
                    color: "#ffffff",
                    textShadow: "0 4px 30px rgba(0,0,0,0.85), 0 0 60px rgba(0,0,0,0.5)",
                  }}
                >
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final text block */}
      <div
        ref={finalTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[6] opacity-0 pointer-events-none px-6"
      >
        <div className="text-center flex flex-col items-center">
          <h2
            className="font-sans select-none uppercase"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              lineHeight: 0.95,
            }}
          >
            Your Vision,
          </h2>
          <p
            className="font-sans select-none"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#5da2ff",
              lineHeight: 1,
              marginTop: "0.1em",
              marginBottom: "2rem",
            }}
          >
            built to last.
          </p>
          <p
            className="font-sans select-none mx-auto uppercase"
            style={{
              fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "36ch",
              fontWeight: 500,
            }}
          >
            Every home is built on trust, craftsmanship, and care.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-3 opacity-60">
        <span
          className="uppercase font-medium"
          style={{ fontSize: "0.5625rem", letterSpacing: "0.3em", color: "#ffffff" }}
        >
          Scroll to explore
        </span>
        <div className="w-[1px] h-10 relative overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 left-0 w-full h-full bg-white/40"
            style={{ animation: "heroScrollPulse 2.4s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes heroScrollPulse {
          0%, 100% { transform: scaleY(0.2); opacity: 0.2; transform-origin: top; }
          50% { transform: scaleY(1); opacity: 0.6; transform-origin: top; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes heroScrollPulse { 0%, 100% { opacity: 0.4; } }
        }
      `}</style>
    </section>
  );
}
