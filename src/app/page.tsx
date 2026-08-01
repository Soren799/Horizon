"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Clock from "@/components/Clock";
import Greeting from "@/components/Greeting";
import MusicSection from "@/components/MusicSection";
import WorksSection from "@/components/WorksSection";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dateString, setDateString] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const now = new Date();
    setDateString(
      now.toLocaleDateString("zh-CN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setYear(now.getFullYear().toString());

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-clock",
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 }
      )
        .fromTo(
          ".hero-greeting",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-date",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative">
      {/* ══ Fixed Leo brand — top left ══ */}
      <div className="fixed left-6 top-6 z-50 sm:left-8 sm:top-8">
        <a
          href="#home"
          className="group flex items-center gap-2 text-sm font-medium tracking-wide text-fg/80 transition-colors hover:text-accent"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/70 text-xs font-semibold text-accent backdrop-blur-md transition-colors group-hover:bg-accent/10">
            L
          </span>
          <span className="hidden sm:inline">Leo</span>
        </a>
      </div>

      {/* ═══════════════ SECTION 1: HERO ═══════════════ */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center px-6"
      >
        {/* Ambient gold glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.07) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Clock */}
          <div className="hero-clock gsap-pre mb-6">
            <Clock />
          </div>

          {/* Greeting */}
          <div className="hero-greeting gsap-pre mb-3">
            <Greeting />
          </div>

          {/* Date */}
          <p className="hero-date gsap-pre text-sm font-mono tracking-wider text-muted">
            {dateString}
          </p>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll gsap-pre absolute bottom-10 flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted/40">
            Scroll
          </span>
          <div className="scroll-hint h-8 w-px bg-gradient-to-b from-muted/60 to-transparent" />
        </div>
      </section>

      {/* ═══════════════ SECTION 2: MUSIC ═══════════════ */}
      <MusicSection />

      {/* ═══════════════ SECTION 3: WORKS ═══════════════ */}
      <WorksSection />

      {/* ═══════════════ FOOTER ═══════════════ */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-border to-transparent" />
      <footer className="py-10 text-center">
        <p className="text-xs font-mono tracking-widest text-muted/40">
          LEO · {year}
        </p>
      </footer>
    </main>
  );
}
