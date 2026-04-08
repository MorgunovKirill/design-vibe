"use client";

import { useInView } from "@/hooks/use-in-view";

export function LogoBar() {
  const companies = ["TechCorp", "MediaFlow", "DataSync", "CloudBase", "DevStudio", "AppForge"];
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="border-y bg-muted/50 py-10">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <p className={`mb-6 text-sm font-medium text-muted-foreground transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Используют команды по всему миру
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {companies.map((name, i) => (
            <div
              key={name}
              className={`text-lg font-bold text-muted-foreground/40 transition-all duration-500 hover:text-muted-foreground/70 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
