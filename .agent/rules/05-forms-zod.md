---
description: Form management with React Hook Form and schema validation with Zod.
---

# 1. Form Libraries
- NEVER use controlled standard React state (`useState`) for complex forms. 
- ALWAYS use `react-hook-form` to ensure better performance (uncontrolled inputs).

# 2. Validation
- Bind `react-hook-form` with `@hookform/resolvers/zod`.
- Define the `zod` schema strictly mapping to what the API expects or the Domain Entity.
- Place schemas in `features/[feature]/types/` or `features/[feature]/mappers/` depending on their usage.
- Zod MUST also be used to validate outgoing payloads and incoming payloads from API requests, ensuring Type safety at the boundaries.
- Utilize os métodos de `transform` do Zod nativamente para conversão de valores brutos da API para ViewModels (ex: formatação de datas, parsing de dados associados) de forma declarativa e automática.
