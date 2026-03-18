---
description: Front-end architecture patterns, features slicing, MVVM and Ports/Adapters.
---

# 1. Architecture: Port and Adapters (Hexagonal)
- Business logic (`features/`) MUST NOT import external heavy libraries directly (like Axios, Zustand store core implementation). 
- Interfaces (Ports) MUST be defined in `src/common/ports/`.
- External library actual implementations MUST reside strictly inside `src/infra/`.

# 2. Project Structure (Features Slice)
- `src/features/[featureName]/`: Vertical slice. Everything related to a slice (components, hooks, mappers, types) goes here.
- `src/app/`: ONLY handles routing and imports features from the slices. No business logic here.
- DO NOT use Atomic Design. Use a composition pattern grouped by features instead.

# 3. MVVM inside React (Custom Hooks as ViewModels)
- Visual components MUST remain "dumb" (View).
- Every business state, interaction, API calling handling MUST live in a Custom Hook (`src/features/[featureName]/hooks/use[Topic]ViewModel.ts`).
- Complex libraries like `TanStack Query` are allowed to be used directly inside these ViewModels because writing generic adapters around everything Query does is counter-productive, BUT the HTTP fetching action itself still goes through an injected `http.port`, not directly `axios.get`.

# 4. Mappers and Zod
- Every external API response MUST be mapped/transformed coming in.
- Use `zod` to validate the payload inside `src/features/[featureName]/mappers/`.
- The frontend state uses the *Mapped* type, never the raw backend DTO if it differs.
