"use client";

import { useInView } from "@/hooks/use-in-view";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className={`container mx-auto max-w-3xl px-4 text-center transition-all duration-600 ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Начни организовывать работу сегодня
        </h2>
        <p className="mb-8 text-lg text-primary-foreground/80">
          Присоединяйся к тысячам команд, которые уже используют Taskflow
        </p>
        <Button asChild size="lg" variant="secondary" className="text-base">
          <a href="/sign-up">Начать бесплатно</a>
        </Button>
        <p className="mt-4 text-sm text-primary-foreground/60">
          Бесплатно навсегда. Без кредитной карты.
        </p>
      </div>
    </section>
  );
}
