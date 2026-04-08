# План: Landing Page — Trello-Style Structure

## Context

Текущий лендинг (`(marketing)/page.tsx`) содержит только Hero + 3 карточки фич. Задача — расширить его до полноценной многосекционной структуры по образцу Trello, добавить анимации через `tw-animate-css` (уже установлен, но не используется), весь текст — на русском языке.

Ответы на Open Questions из спека:
- Скриншоты/изображения: заглушки (градиентные блоки / placeholder div)
- Hero CTA: кнопка-ссылка на `/sign-up`, без email-формы
- Секция Pricing: добавить
- Язык: русский

---

## Шаг 0 — Установить shadcn-компоненты

```bash
npx shadcn@latest add card badge separator tabs
```

Нужны для: карточек (Pricing, Use Cases, Testimonials), разделителей, табов в Features-секции.

---

## Шаг 1 — Подключить tw-animate-css

**Файл:** `src/app/globals.css`

Добавить импорт в начало после `@import "tailwindcss"`:
```css
@import "tw-animate-css";
```

Это даёт классы: `animate-fade-in`, `animate-slide-in-from-bottom`, `animate-slide-in-from-top`, `animate-zoom-in`, `animate-fade-in-up` и т.д.

Также добавить CSS-переменную `--animation-delay` для stagger-эффектов:
```css
@layer utilities {
  .animation-delay-100 { animation-delay: 100ms; }
  .animation-delay-200 { animation-delay: 200ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-400 { animation-delay: 400ms; }
}
```

---

## Шаг 2 — Создать компоненты секций

Все компоненты размещаются в `src/components/landing/`.

### 2.1 `header.tsx` — Sticky Header

- `sticky top-0 z-50` с `backdrop-blur` + лёгкий border снизу
- Слева: логотип «Taskflow» (текст + иконка из lucide-react `LayoutDashboard`)
- Центр/справа: ссылки «Функции», «Решения», «Тарифы» (якорные `#features`, `#pricing`, `#solutions`)
- Кнопки: «Войти» (outline) + «Начать бесплатно» (primary) → `/sign-up`
- Анимация: `animate-slide-in-from-top animate-duration-300`

### 2.2 `hero-section.tsx`

- Левая колонка: H1 + подзаголовок + CTA-кнопка + подпись «Бесплатно. Без карты.»
- Правая колонка: placeholder-div (градиентный блок с имитацией доски — цветные карточки)
- Анимация: заголовок `animate-fade-in`, кнопка `animate-fade-in animation-delay-200`, изображение `animate-slide-in-from-right animate-duration-500`

### 2.3 `logo-bar.tsx`

- Серый фон (`bg-muted/50`)
- Текст «Используют команды по всему миру»
- 5–6 placeholder-логотипов (серые прямоугольники с текстом-названием компании)
- Анимация: `animate-fade-in` при появлении секции

### 2.4 `features-section.tsx` — id="features"

- Заголовок + подзаголовок секции
- Компонент `Tabs` из shadcn: вкладки «Доски», «Списки», «Карточки»
- Каждая вкладка: слева описание + список пунктов (`lucide-react` `Check`), справа placeholder-скриншот
- Анимация контента вкладки: `animate-fade-in animate-duration-300`

### 2.5 `how-it-works.tsx`

- 3 колонки: иконка (lucide-react) + номер шага + заголовок + описание
- Шаги: «Создай доску», «Добавь задачи», «Выполняй и отслеживай»
- Анимация: stagger — каждая карточка `animate-slide-in-from-bottom` с `animation-delay-100/200/300`

### 2.6 `use-cases.tsx` — id="solutions"

- Заголовок «Taskflow подходит каждой команде»
- 4 карточки (`Card` shadcn): Разработка, Маркетинг, Дизайн, Личное
- Иконки из lucide-react: `Code2`, `Megaphone`, `Palette`, `User`
- Ховер-эффект: `hover:border-primary transition-colors`
- Анимация: `animate-fade-in` stagger

### 2.7 `integrations.tsx`

- Заголовок «Подключи инструменты, которые уже используешь»
- Сетка 3×2 или 4×2 — placeholder-карточки с иконкой + названием: Slack, GitHub, Google Drive, Figma, Notion, Jira
- Иконки: lucide-react (`MessageSquare`, `Github`, `HardDrive`, `Figma`, `FileText`, `Layers`)
- CTA-ссылка «Все интеграции →»
- Анимация: `animate-zoom-in` stagger

### 2.8 `testimonials.tsx`

- Заголовок «Что говорят наши пользователи»
- 3 карточки с цитатой, аватар-placeholder (инициалы в круге), именем и должностью
- Статичная сетка 3 колонки
- Анимация: `animate-slide-in-from-bottom` stagger

### 2.9 `pricing-section.tsx` — id="pricing"

- Заголовок «Простые и прозрачные тарифы»
- 2 карточки: **Бесплатно** (outline) и **Pro** (primary, выделена `ring-2 ring-primary`)
  - Free: до 10 досок, базовые функции
  - Pro: безлимит, интеграции, приоритетная поддержка — цена заглушка «₽X/мес»
- CTA в каждой карточке → `/sign-up`
- `Badge` «Популярный» на Pro-карточке
- Анимация: `animate-fade-in` + scale на hover

### 2.10 `final-cta.tsx`

- Тёмный блок (`bg-primary text-primary-foreground`) на всю ширину
- H2 «Начни организовывать работу сегодня»
- Кнопка «Начать бесплатно» (белая, variant secondary) → `/sign-up`
- Подпись «Бесплатно навсегда. Без кредитной карты.»
- Анимация: `animate-zoom-in`

### 2.11 `footer.tsx`

- 4 колонки ссылок: Продукт, Решения, Ресурсы, Компания
- Логотип + copyright слева внизу
- Иконки соцсетей (lucide-react `Twitter`, `Linkedin`, `Github`)
- Разделитель через `Separator` shadcn

---

## Шаг 3 — Обновить `(marketing)/page.tsx`

Заменить текущее содержимое на:
```tsx
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
... (все секции по порядку)
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LogoBar />
        <FeaturesSection />
        <HowItWorks />
        <UseCases />
        <Integrations />
        <Testimonials />
        <PricingSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
```

---

## Файлы для создания/изменения

| Действие | Путь |
|----------|------|
| Изменить | `src/app/globals.css` |
| Изменить | `src/app/(marketing)/page.tsx` |
| Создать  | `src/components/landing/header.tsx` |
| Создать  | `src/components/landing/hero-section.tsx` |
| Создать  | `src/components/landing/logo-bar.tsx` |
| Создать  | `src/components/landing/features-section.tsx` |
| Создать  | `src/components/landing/how-it-works.tsx` |
| Создать  | `src/components/landing/use-cases.tsx` |
| Создать  | `src/components/landing/integrations.tsx` |
| Создать  | `src/components/landing/testimonials.tsx` |
| Создать  | `src/components/landing/pricing-section.tsx` |
| Создать  | `src/components/landing/final-cta.tsx` |
| Создать  | `src/components/landing/footer.tsx` |
| Установить | shadcn: card, badge, separator, tabs |

---

## Верификация

1. `npm run dev` — проверить что страница рендерится без ошибок
2. Пройти по всем секциям визуально в браузере
3. Проверить анимации при первой загрузке и при скролле
4. `npm run build` — убедиться что TypeScript-компиляция чистая (strict mode)
5. Проверить адаптивность на мобильных (devtools → 375px)
