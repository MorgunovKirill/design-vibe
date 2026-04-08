"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md animate-in slide-in-from-top animation-duration-300">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          Taskflow
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Функции
          </a>
          <a href="#solutions" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Решения
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Тарифы
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" asChild size="sm">
            <a href="/sign-in">Войти</a>
          </Button>
          <Button asChild size="sm">
            <a href="/sign-up">Начать бесплатно</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t bg-background px-4 pb-4 md:hidden animate-in fade-in animation-duration-200">
          <nav className="flex flex-col gap-3 pt-3">
            <a href="#features" className="text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>
              Функции
            </a>
            <a href="#solutions" className="text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>
              Решения
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>
              Тарифы
            </a>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" asChild size="sm" className="flex-1">
                <a href="/sign-in">Войти</a>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <a href="/sign-up">Начать бесплатно</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
