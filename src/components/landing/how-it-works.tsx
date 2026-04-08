"use client";

import { useInView } from "@/hooks/use-in-view";
import { Columns3, PlusCircle, Rocket } from "lucide-react";

const steps = [
  {
    icon: Columns3,
    step: "01",
    title: "Создай доску",
    description: "Начни с создания доски для проекта или рабочего процесса. Добавь колонки для каждого этапа.",
  },
  {
    icon: PlusCircle,
    step: "02",
    title: "Добавь задачи",
    description: "Создавай карточки для каждой задачи. Назначай ответственных, устанавливай сроки и приоритеты.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Выполняй и отслеживай",
    description: "Перемещай карточки по мере выполнения. Следи за прогрессом всей команды в реальном времени.",
  },
];

export function HowItWorks() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="border-y bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className={`mb-12 text-center transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Три шага к продуктивности
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Начни работать с Taskflow за считанные минуты
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`group relative rounded-xl border bg-card p-6 text-center transition-all duration-500 hover:shadow-lg ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-7 w-7" />
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Шаг {s.step}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
