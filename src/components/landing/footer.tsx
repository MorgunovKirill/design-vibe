import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, LayoutDashboard, Linkedin, Twitter } from "lucide-react";

const columns = [
  {
    title: "Продукт",
    links: ["Функции", "Интеграции", "Тарифы", "Обновления"],
  },
  {
    title: "Решения",
    links: ["Для команд", "Удалённая работа", "Управление проектами"],
  },
  {
    title: "Ресурсы",
    links: ["Документация", "Блог", "Поддержка"],
  },
  {
    title: "Компания",
    links: ["О нас", "Карьера", "Конфиденциальность", "Условия"],
  },
];

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-3 flex items-center gap-2 text-lg font-bold">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              Taskflow
            </Link>
            <p className="text-sm text-muted-foreground">
              Простой и мощный инструмент для управления проектами.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Taskflow. Все права защищены.
          </p>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={s.label}
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
