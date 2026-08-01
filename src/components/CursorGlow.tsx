"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) {
      glow.style.display = "none";
      return;
    }

    gsap.set(glow, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
    });

    // Smooth trailing via gsap.quickTo
    const xTo = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(glow, { opacity: 1, duration: 0.6 });
    };

    const onLeave = () => gsap.to(glow, { opacity: 0, duration: 0.5 });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
