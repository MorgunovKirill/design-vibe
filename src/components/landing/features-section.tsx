"use client";

import { useInView } from "@/hooks/use-in-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Columns3, CreditCard, List } from "lucide-react";

const features = [
  {
    value: "boards",
    label: "Доски",
    icon: Columns3,
    title: "Визуализируй свой рабочий процесс",
    description: "Канбан-доски дают полную картину проекта. Перетаскивай карточки между колонками и следи за прогрессом в реальном времени.",
    points: [
      "Неограниченное количество колонок",
      "Перетаскивание карточек (drag & drop)",
      "Настраиваемые статусы и фильтры",
      "Командное взаимодействие в реальном времени",
    ],
    placeholderColor: "bg-chart-1/10 border-chart-1/30",
  },
  {
    value: "lists",
    label: "Списки",
    icon: List,
    title: "Структурируй задачи по этапам",
    description: "Разбей проект на логические этапы. Каждый список — это шаг в твоём рабочем процессе, от идеи до завершения.",
    points: [
      "Гибкая организация задач",
      "Приоритизация внутри списка",
      "Быстрое перемещение между списками",
      "Шаблоны для повторяющихся процессов",
    ],
    placeholderColor: "bg-chart-2/10 border-chart-2/30",
  },
  {
    value: "cards",
    label: "Карточки",
    icon: CreditCard,
    title: "Все детали задачи в одном месте",
    description: "Карточка — это единица работы. Назначай ответственных, устанавливай дедлайны, добавляй чеклисты и комментарии.",
    points: [
      "Назначение участников",
      "Дедлайны и напоминания",
      "Чеклисты и вложения",
      "Метки и приоритеты",
    ],
    placeholderColor: "bg-chart-4/10 border-chart-4/30",
  },
];

export function FeaturesSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="features" ref={ref} className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className={`mb-12 text-center transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Всё, что нужно команде для работы
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Доски, списки и карточки — три простых инструмента, которые помогут организовать любой проект
          </p>
        </div>

        <div className={`transition-all duration-600 delay-200 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Tabs defaultValue="boards" className="space-y-8">
            <TabsList className="mx-auto flex w-fit">
              {features.map((f) => (
                <TabsTrigger key={f.value} value={f.value} className="gap-2">
                  <f.icon className="h-4 w-4" />
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {features.map((f) => (
              <TabsContent
                key={f.value}
                value={f.value}
                className="animate-in fade-in animation-duration-300"
              >
                <div className="grid items-center gap-10 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">{f.title}</h3>
                    <p className="text-muted-foreground">{f.description}</p>
                    <ul className="space-y-2">
                      {f.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-chart-2" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`rounded-xl border ${f.placeholderColor} p-8`}>
                    <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-muted-foreground/30">
                      <f.icon className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
