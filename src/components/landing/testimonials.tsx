"use client";

import { useInView } from "@/hooks/use-in-view";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Taskflow полностью изменил наш подход к управлению проектами. Теперь вся команда видит прогресс в реальном времени.",
    name: "Анна Петрова",
    role: "Product Manager",
    company: "TechCorp",
    initials: "АП",
  },
  {
    quote: "Простой, интуитивный и мощный. Мы перешли с Jira и ни разу не пожалели. Онбординг новых сотрудников стал в разы быстрее.",
    name: "Дмитрий Козлов",
    role: "Tech Lead",
    company: "DevStudio",
    initials: "ДК",
  },
  {
    quote: "Как дизайнеру, мне важна визуальная организация задач. Taskflow даёт именно это — минимализм и функциональность.",
    name: "Мария Волкова",
    role: "UX Designer",
    company: "MediaFlow",
    initials: "МВ",
  },
];

export function Testimonials() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className={`mb-12 text-center transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Что говорят наши пользователи
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Тысячи команд уже используют Taskflow для организации работы
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className={`transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <CardContent className="pt-6">
                <blockquote className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
