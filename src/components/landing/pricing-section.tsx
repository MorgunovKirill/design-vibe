"use client";

import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Бесплатно",
    price: "0 ₽",
    period: "навсегда",
    description: "Для личных проектов и небольших команд",
    features: [
      "До 10 досок",
      "Неограниченные карточки",
      "Базовые интеграции",
      "1 ГБ хранилища",
      "До 5 участников",
    ],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Pro",
    price: "490 ₽",
    period: "в месяц",
    description: "Для растущих команд и серьёзных проектов",
    features: [
      "Безлимитные доски",
      "Неограниченные карточки",
      "Все интеграции",
      "50 ГБ хранилища",
      "Неограниченные участники",
      "Приоритетная поддержка",
      "Аналитика и отчёты",
    ],
    cta: "Попробовать Pro",
    popular: true,
  },
];

export function PricingSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="pricing" ref={ref} className="border-y bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className={`mb-12 text-center transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Простые и прозрачные тарифы
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Начни бесплатно — переходи на Pro, когда будешь готов
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <Card
              key={plan.name}
              className={`relative transition-all duration-500 hover:shadow-xl ${
                plan.popular ? "ring-2 ring-primary" : ""
              } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-2.5 right-4">Популярный</Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">/ {plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-chart-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  <a href="/sign-up">{plan.cta}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
