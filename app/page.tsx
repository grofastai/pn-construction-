"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initLenis, destroyLenis } from "@/lib/lenis";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = initLenis();
    let lenisRaf: ((time: number) => void) | null = null;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      lenisRaf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      destroyLenis();
    };
  }, []);

  return (
    <>
      <Header />
      <main ref={mainRef}>
        <div id="hero-root" style={{ height: "450vh", position: "relative" }}>
          <Hero />
        </div>
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
