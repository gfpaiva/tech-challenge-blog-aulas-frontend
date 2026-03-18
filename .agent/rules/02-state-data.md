---
description: Client-side state (Zustand) and Server/Client data fetching (Next SSG + TanStack Query) rules.
---

# 1. Next.js Static Export & Data Fetching
- Focus on Static Site Generation (SSG) for all possible public pages to maintain the educational blog fast.
- Since it uses App Router with `output: 'export'`, Server Components can use `fetch()` at build time to statically generate the pages.
- Dynamic pages (`/post/[id]`) MUST use `generateStaticParams()` to be pre-rendered.
- **TanStack Query** MUST ONLY be used strictly for:
  1. Client-side mutations (likes, comments).
  2. Authenticated user-specific data fetching (dashboard, private profile) taking place AFTER the static shell loads.
  
# 2. Global State & Persistency
- Use `zustand` for global state.
- Keep the store inside `infra/store/[StoreName]Adapter.ts` following Port/Adapter.
- If persisting with `localStorage`, beware of React 19 / Next.js Hydration errors!
- **Hydration Safe Strategy:** Never render user-specific UI directly on the server pass (SSG) that depends on localStorage. Create a `useHydratedStore` generic hook or use standard `useEffect` mount-checking to render dynamic bits only on the client.

# 3. Authentication
- Tokens are managed manually on the client (localStorage / Zustand). 
- Do NOT use Next.js backend/middleware features for Auth since there is no Node.js server.
- Protect routes on the client side inside a nested Layout or Higher Order Component / Hook that mounts and redirects if unauthorized.
