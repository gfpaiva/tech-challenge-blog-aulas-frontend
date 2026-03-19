---
description: Visual styling rules covering Tailwind CSS v4, DaisyUI v5, and Typography.
---

# 1. Colors & Theming (DaisyUI)
- The brand is heavily focused on Educational content:
  - **Primary Brand Purple:** `#6A1B9A` (Highlights, primary buttons, identity).
  - **Accent Purple:** `#9C47D0` (Hovers, secondary icons).
  - **Light Mode BG:** `#F8F9FA` (Neutral, reduces eye strain).
  - **Main Text:** `#212121` (High contrast reading).
  - **Support Text:** `#757575` (Dates, author meta).
- Do NOT rely on random Tailwind utilities for colors if DaisyUI can handle it via the semantic Native Theme.
- Setup DaisyUI themes to absorb these colors (`primary`, `accent`, `base-100`, `base-content`). 
- Support Dark Mode dynamically using DaisyUI native data-theme toggles.

# 2. TailwindCSS v4 & Class Merging
- Keep in mind spacing and modern utility classes. Avoid cluttering the HTML with massive classes if a simple semantic class from DaisyUI does the trick.
- **Mandatory Class Merging:** ALWAYS use the `cn(...inputs)` utility (`src/common/lib/utils.ts`) to merge Tailwind/DaisyUI classes. Never use manual string concatenation or template literals for complex class merging.

# 3. Typography
- **Google Web Fonts** MUST be used:
  - **UI & Components:** `Inter` (sans-serif) for menus, buttons, forms, comments.
  - **Reading & Titles:** `Merriweather` (serif) for long educational texts to simulate a "book-like" experience.
- Configure tailwind to use `font-sans` for Inter and `font-serif` for Merriweather, explicitly setting them on the respective tags or container classes.

# 4. Pure UI Components & Composition
- Components mapped in `common/components` or `features/[feature]/components` must be "dumb".
- Only pass pure props. They should NEVER invoke `useQuery` or `useStore` directly.
- **DaisyUI Preference:** ALWAYS prioritize the use of [DaisyUI standard components](https://daisyui.com/components/) instead of building full custom Tailwind chunks from scratch. 
- **Composition over Repetition:** Avoid massive repeated Tailwind CSS classes throughout different HTML generic tags. Abstract them into smaller, reusable React components to build screens incrementally.
- **Storybook Strictness:** Ensure EVERY shared visual component or UI element has a co-located `.stories.tsx` file to guarantee it easily fits into Storybook testing in isolation.
- Forms: Use React Hook Form + Zod for validations. Form logic should reside in the ViewModel Hook.
