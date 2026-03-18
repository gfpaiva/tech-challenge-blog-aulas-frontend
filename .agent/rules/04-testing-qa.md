---
description: Automated testing, Component isolation (Storybook) and Linting rules.
---

# 1. Component Testing & Storybook
- Every UI structural component (the "dumb" components) **MUST** possess a relative `.stories.tsx` file for cataloging in Storybook, allowing complete UI isolation and visual validation.
- Storybook works as the visual test and isolation environment. Since components don't fetch data, they are trivial to mock.
- Provide mocked ViewModel data as props to the view component for stories. This allows you to test various component states (e.g. error, loading, empty) independently of full application mounting.

# 2. Unit & Integration Testing (Vitest)
- Use Vitest as the primary test runner.
- Focus tests on the ViewModels (Custom Hooks) and Mappers (Zod transformations).
- UI Components are mostly tested via Storybook/Visual Regression or simple Vitest smoke tests. The heavy logic is in the hooks, test those.
- Mock the `.infra/` adapters (like `http.port` or `store.port`) when testing hooks.

# 3. Linter
- Follow standard ESLint rules configured in the project. DO NOT bypass them. Fix the errors.
