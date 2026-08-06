"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { works } from "@/lib/data";

export default function WorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".works-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: ".works-heading", start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: {
              trigger: card, start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen px-6 py-32 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="works-heading gsap-pre mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.4em] text-accent">
            <span className="h-px w-8 bg-accent/50" />
            Portfolio
            <span className="h-px w-8 bg-accent/50" />
          </div>
          <h2 className="text-4xl font-light tracking-tight text-fg sm:text-5xl md:text-6xl">
            项目
          </h2>
          <p className="mt-4 text-sm text-muted">精选项目</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => {
            const Wrapper = work.url ? "a" : "div";
            const linkProps = work.url
              ? { href: work.url, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={work.id}
                {...linkProps}
                className="work-card gsap-pre group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 transition-all duration-300 hover:border-accent/40 hover:bg-surface"
              >
                {/* Visual area */}
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-accent/10 to-transparent p-6">
                  <div className="flex h-full flex-col justify-between">
                    <ExternalLink
                      size={18}
                      className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
                    />
                    <span className="font-mono text-5xl font-light text-accent/30">
                      {String(work.id).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-medium tracking-tight text-fg">
                    {work.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    {work.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-bg px-2 py-1 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </Wrapper>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-16 text-center text-xs text-muted/50">
          更多项目即将上线。
        </p>
      </div>
    </section>
  );
}
