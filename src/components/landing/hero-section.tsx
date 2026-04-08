import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary py-20 md:py-32">
      <div className="container mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        {/* Text */}
        <div className="space-y-6 animate-in fade-in animation-duration-500">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Организуй работу.{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Добивайся результатов.
            </span>
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">
            Управляй проектами и задачами с помощью досок, списков и карточек.
            Простой и мощный инструмент для всей команды.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row animate-in fade-in fill-mode-both delay-200">
            <Button asChild size="lg">
              <a href="/sign-up">Начать бесплатно</a>
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="#features">Узнать больше</a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground animate-in fade-in fill-mode-both delay-300">
            Бесплатно навсегда. Без кредитной карты.
          </p>
        </div>

        {/* Placeholder board illustration */}
        <div className="animate-in slide-in-from-right fade-in animation-duration-500">
          <div className="rounded-xl border bg-card p-4 shadow-2xl">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <div className="h-3 w-3 rounded-full bg-chart-4" />
              <div className="h-3 w-3 rounded-full bg-chart-2" />
              <span className="ml-2 text-xs font-medium text-muted-foreground">Мой проект</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Column 1: To Do */}
              <div className="space-y-2">
                <div className="rounded-md bg-muted px-2 py-1.5 text-xs font-semibold">К выполнению</div>
                <div className="rounded-md border bg-background p-2 text-xs">Дизайн главной страницы</div>
                <div className="rounded-md border bg-background p-2 text-xs">Настроить CI/CD</div>
                <div className="rounded-md border bg-background p-2 text-xs">Написать тесты</div>
              </div>
              {/* Column 2: In Progress */}
              <div className="space-y-2">
                <div className="rounded-md bg-muted px-2 py-1.5 text-xs font-semibold">В работе</div>
                <div className="rounded-md border border-chart-1/30 bg-chart-1/10 p-2 text-xs">Разработка API</div>
                <div className="rounded-md border bg-background p-2 text-xs">Верстка профиля</div>
              </div>
              {/* Column 3: Done */}
              <div className="space-y-2">
                <div className="rounded-md bg-muted px-2 py-1.5 text-xs font-semibold">Готово</div>
                <div className="rounded-md border border-chart-2/30 bg-chart-2/10 p-2 text-xs">Авторизация</div>
                <div className="rounded-md border border-chart-2/30 bg-chart-2/10 p-2 text-xs">База данных</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
