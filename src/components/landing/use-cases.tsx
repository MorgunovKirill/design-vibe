"use client";

import { useInView } from "@/hooks/use-in-view";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Megaphone, Palette, User } from "lucide-react";

const cases = [
  {
    icon: Code2,
    title: "Разработка",
    description: "Спринты, баг-трекинг и управление релизами. Интеграция с GitHub для автоматизации рабочего процесса.",
  },
  {
    icon: Megaphone,
    title: "Маркетинг",
    description: "Планирование кампаний, контент-календарь и отслеживание метрик. Всё в одном месте.",
  },
  {
    icon: Palette,
    title: "Дизайн",
    description: "Управление итерациями дизайна, ревью и обратная связь. Прикрепляй макеты прямо к карточкам.",
  },
  {
    icon: User,
    title: "Личные задачи",
    description: "Организуй повседневные дела, учёбу и личные проекты. Простой и гибкий инструмент для любых целей.",
  },
];

export function UseCases() {
  const { ref, isInView } = useInView();

  return (
    <section id="solutions" ref={ref} className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className={`mb-12 text-center transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Taskflow подходит каждой команде
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            От стартапов до крупных компаний — наши инструменты адаптируются под любой рабочий процесс
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, i) => (
            <Card
              key={c.title}
              className={`group cursor-pointer transition-all duration-500 hover:border-primary hover:shadow-lg ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <CardHeader>
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
