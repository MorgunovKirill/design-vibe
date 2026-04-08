"use client";

import { useInView } from "@/hooks/use-in-view";
import { FileText, Figma, Github, HardDrive, Layers, MessageSquare } from "lucide-react";

const integrations = [
  { icon: MessageSquare, name: "Slack" },
  { icon: Github, name: "GitHub" },
  { icon: HardDrive, name: "Google Drive" },
  { icon: Figma, name: "Figma" },
  { icon: FileText, name: "Notion" },
  { icon: Layers, name: "Jira" },
];

export function Integrations() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="border-y bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className={`mb-12 text-center transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Подключи инструменты, которые уже используешь
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Taskflow интегрируется с популярными сервисами, чтобы всё было в одном месте
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {integrations.map((item, i) => (
            <div
              key={item.name}
              className={`flex flex-col items-center gap-2 rounded-xl border bg-card p-4 transition-all duration-500 hover:shadow-md hover:border-primary ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              <item.icon className="h-8 w-8 text-muted-foreground" />
              <span className="text-xs font-medium">{item.name}</span>
            </div>
          ))}
        </div>

        <div className={`mt-8 text-center transition-all duration-500 delay-700 ${isInView ? "opacity-100" : "opacity-0"}`}>
          <a
            href="#"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Все интеграции &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
