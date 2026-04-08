# Spec for Landing Page — Trello-Style Structure

figma_component (if used): N/A

## Summary

Текущий лендинг (`(marketing)/page.tsx`) содержит только Hero-секцию и три feature-карточки. Цель — переработать его в многосекционную структуру, аналогичную лендингу Trello, чтобы он профессионально презентовал продукт Taskflow и конвертировал посетителей в регистрации.

---

## Функциональные требования

### 1. Header / Navigation (фиксированный)

- Логотип «Taskflow» слева
- Навигационные ссылки по центру/справа: Features, Solutions, Plans
- Кнопки справа: «Log in» (outline) + «Get Taskflow for free» (primary, синяя)
- На мобильных — hamburger-меню, которое раскрывает те же пункты
- Header прилипает к верху при скролле

---

### 2. Hero Section

- Большой заголовок (H1): короткий, ёмкий слоган — например, _"Organize work. Ship faster."_
- Подзаголовок (1–2 строки): описание ценности продукта
- CTA-блок:
  - Поле email (placeholder: «Enter email») + кнопка «Sign up — it's free!»
  - Или просто кнопка «Get started for free» → `/sign-up`
  - Подпись под кнопкой: «No credit card required.»
- Hero-изображение / скриншот интерфейса Taskflow (доска с карточками) справа или снизу

---

### 3. Social Proof / Logo Bar

- Заголовок: «Trusted by teams around the world»
- Горизонтальная полоса с логотипами известных компаний (можно использовать placeholder-логотипы)
- Фон слегка отличается от Hero (светло-серый или слабый градиент)

---

### 4. Features / Views Section (с табами)

Аналог секции Trello «A productivity powerhouse» с переключаемыми вкладками.

- Заголовок секции: «Everything your team needs to get work done»
- Подзаголовок: 1–2 строки описания
- Вкладки (горизонтальный список):
  - **Boards** — канбан-доска
  - **Lists** — упорядоченные списки задач
  - **Cards** — детали карточки (назначение, дедлайн, чеклисты)
  - **Timeline** _(опционально, future feature)_
- При выборе вкладки — слева описание + список пунктов, справа — изображение/скриншот фичи

---

### 5. How It Works / Steps Section

Простая секция «3 шага к продуктивности»:

1. **Create a board** — создай доску под проект или workflow
2. **Add cards** — добавь задачи, назначь ответственных
3. **Track & ship** — следи за прогрессом и выполняй задачи

Каждый шаг — иконка + заголовок + короткое описание.

---

### 6. Use Cases / Teams Section

- Заголовок: «Taskflow works for every team»
- Карточки-сценарии (3–4 штуки):
  - **Engineering** — спринты, баг-трекинг
  - **Marketing** — кампании, контент-план
  - **Design** — ревью, итерации
  - **Personal** — личные задачи, учёба
- Каждая карточка: иконка + название команды + 1–2 строки описания + ссылка «Learn more»

---

### 7. Integrations Section

- Заголовок: «Connect the tools you already use»
- Подзаголовок: краткое описание
- Сетка иконок популярных интеграций (Slack, GitHub, Google Drive, Figma и т.п.) — можно placeholder
- CTA-ссылка: «See all integrations»

---

### 8. Testimonials / Quotes Section

- Заголовок: «What our users say»
- 2–3 цитаты пользователей с аватаром, именем, должностью и компанией
- Карусель или статичная сетка

---

### 9. Pricing Teaser Section

- Заголовок: «Simple, transparent pricing»
- 2 тарифных карточки:
  - **Free** — основные функции, до N проектов
  - **Pro** — безлимит + интеграции + приоритетная поддержка
- CTA-кнопка на каждой карточке
- Ссылка «Compare all plans»

---

### 10. Final CTA Section

- Большой блок с контрастным фоном (primary color или тёмный)
- Заголовок: «Start organizing your work today»
- CTA-кнопка: «Get started for free»
- Подпись: «Free forever. No credit card needed.»

---

### 11. Footer

- Колонки ссылок (4 шт.):
  - **Product**: Features, Integrations, Pricing, Changelog
  - **Solutions**: Teams, Remote work, Project management
  - **Resources**: Docs, Blog, Support
  - **Company**: About, Careers, Privacy, Terms
- Логотип + copyright слева внизу
- Иконки соцсетей (Twitter/X, LinkedIn, GitHub)

---

## Figma Design Reference (only if referenced)

- File: N/A
- Component name: N/A
- Key visual points:
  - Цветовая палитра: использовать существующие CSS-переменные проекта (OKLCH токены)
  - Стиль кнопок: существующий shadcn/ui Button (New York style)
  - Типографика: Geist Sans

---

## Possible Edge Cases

- **Мобильный Header**: навигация скрывается за hamburger; нет shadcn-компонента Sheet — нужно добавить или реализовать через details/summary
- **Изображения / скриншоты**: если реальных скриншотов нет, использовать заглушки (placeholder.svg или градиентные блоки)
- **Timeline-таб**: фича не реализована — таб можно показать как «Coming Soon» или вовсе скрыть
- **Карусель отзывов**: нет карусельного компонента в shadcn; использовать простую статичную сетку или установить Embla carousel (`npx shadcn@latest add carousel`)
- **SEO**: добавить метаданные через Next.js Metadata API в `(marketing)/layout.tsx`

---

## Acceptance Criteria

- [ ] Header зафиксирован вверху страницы и содержит логотип + навигацию + CTA-кнопки
- [ ] Hero-секция содержит заголовок, подзаголовок и форму/кнопку для регистрации
- [ ] Присутствует минимум 4 секции после Hero: Features, How It Works, Use Cases, Final CTA
- [ ] Footer содержит колонки ссылок и информацию об авторских правах
- [ ] Страница полностью адаптивна (mobile-first)
- [ ] Все CTA-кнопки ведут на `/sign-up` или `/sign-in`
- [ ] Нет сломанных ссылок и placeholder-текста «Lorem ipsum»

---

## Open Questions

1. Есть ли у нас реальные скриншоты интерфейса для Hero и Features-секций, или нужны заглушки? Пока нет, используй заглушки
2. Нужна ли реальная форма с полем email в Hero (потребует API-endpoint) или достаточно кнопки-ссылки? кнопка-ссылка
3. Добавлять ли секцию Pricing сейчас или оставить на потом (когда будет реализована логика тарифов)? Добавь
4. Какой язык интерфейса приоритетен — английский или планируется i18n? Русский
