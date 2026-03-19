# AGENTS.md - Blog Aulas

## 🚀 Visão Geral
Interface Web responsiva construída com Next.js (Static Export) focada em professores e alunos para um Blog Educacional premium. 

## 🛠 Stack Inegociável & Visuals
- **Framework:** Next.js App Router (`output: 'export'` para Full SSG).
- **UI:** Tailwind v4 + DaisyUI v5.
- **Theming:** Temas nativos via data-attribute no DaisyUI (Dark e Light modes).
- **Cores da Marca:** 
  - *Primary (Brand):* `#6A1B9A`
  - *Accent:* `#9C47D0`
  - *Light BG:* `#F8F9FA`
  - *Text:* `#212121` base, `#757575` support.
- **Tipografia:** 
  - *UI (Menus, Forms):* 'Inter'
  - *Leitura (Artigos, Títulos):* 'Merriweather'
- **Estado Global:** Zustand persistido no `localStorage` (com hidratação segura no client).
- **Data Fetching:** Híbrido. React Server Components (`fetch`) no tempo de BUILD (SSG absoluto) e TanStack Query v5 no CLIENT-SIDE para mutações e requests após carregamento da shell estática.
- **Formulários:** React Hook Form + Zod.
- **Testes:** Vitest (e Storybook para validação isolada).

## 🧠 Leis Fundamentais de Arquitetura
1. **Port/Adapter (Hexagonal):** O código de negócio e feature SÓ conhece portas/interfaces (`common/ports/`). A implementação real de bibliotecas (`fetch`, `zustand`, `queries`) fica isolada em `infra/`.
   - *Exceção controlada:* O TanStack Query pode ser usado livremente dentro de Hooks / ViewModels para facilitar manipulação complexa de caching, mas a requisição AJAX em si deve usar o adapter http abstrato.
2. **MVVM (Model-View-ViewModel):** 
   - *View (Componentes):* Componentes são "burros" (Dumb Components). Interagem via props. Não chamam APIs nem leem Zustand diretamente. Isso garante mockabilidade nativa para Testes e Storybook.
   - *ViewModel (Custom Hooks):* Toda a orquestração (estados, fetchs, submits) reside em hooks na pasta da feature (ex: `useCreatePostViewModel`).
3. **Mappers:** Inputs nativos da API não passam pro frontend sujos. Todo e qualquer payload da API deve ser validado/transformado via Zod na criação de Modelos tipados.
4. **Features Slices:** Abandone o modelo de Atomic Design. Siga a estrutura Vertical Slices contidas em `src/features/`.
5. **Componentização e UI Máxima (DaisyUI & Storybook):**
   - Maximize o uso de componentes/classes nativas do DaisyUI (https://daisyui.com/components/) em vez de construir layouts inteiramente "na mão" com Tailwind puro.
   - **Merge de Classes:** O Projeto utiliza a função utilitária `cn` (`src/common/lib/utils.ts`) para realizar o merge inteligente de classes CSS do Tailwind/DaisyUI, evitando conflitos e facilitando a composição.
   - Escreva componentes utilizando **composição** e **evite ao máximo repetição de código**. Mesmo componentes pequenos (ex: botões personalizados, links estilizados, avatares) devem ser isolados em componentes novos para compor a tela e evitar repetição de strings longas de classes CSS.
   - **TODOS** os componentes de UI puros (Dumb Components) **DEVEM** ter o seu respectivo arquivo `.stories.tsx` relativo, permitindo o isolamento da UI e testes individuais no Storybook estrito.

## 🛠 Padrões de Codificação & Tipagem
1. **TypeScript - Type vs Interface:**
   - **Props:** Use `type` para definir as props de componentes React (ex: `type ButtonProps = { ... }`).
   - **Interface:** Reserve o uso de `interface` exclusivamente para contratos que necessitem implementação (`implements`), definições de classes, métodos de portas (Port/Adapter) ou modelos de dados complexos que se beneficiem de *declaration merging*.
2. **Merge de Classes:** Utilize obrigatoriamente a função `cn(...inputs)` para qualquer interpolação ou união de classes Tailwind nos componentes.

## 📁 Arquitetura de Pastas (Bulletproof / Hexagonal)
```text
src/
├── app/                  # Apenas roteamento (Routes/Pages/Layouts)
├── common/               # Compartilhado globalmente
│   ├── components/       # UI Components "Dumb" / Base UI elements
│   ├── ports/            # INTERFACES abstratas (http.port.ts)
│   ├── hooks/            # Hooks globais não atrelados a negócio
│   └── mappers/          # Mappers utilitários globais
├── infra/                # ADAPTERS (Implementação de detalhes)
│   ├── http/             # Ex: fetch.adapter.ts implementando o http.port
│   └── store/            # Ex: zustand.adapter.ts encapsulando a store
└── features/             # Domains / Fatias Verticais de Negócio
    ├── posting/          
    │   ├── api/          # Definições de AJAX requests consumindo infra http
    │   ├── components/   # Views locais da feature
    │   ├── hooks/        # ViewModels gerenciando os dados pros componentes
    │   ├── mappers/      # Zod validation dos payloads da api (DTO -> Entity)
    │   ├── types/        # Modelos typescript puramente locais
    │   └── index.ts      # Public API expondo apenas o necessário
```

## 🚨 Decisões Críticas e Resolução de Ambiguidade
1. **Hydration Mismatch:** O aplicativo Next.js via Export Static rodará numa CDN e o Zustand lerá o localStorage no client. Isso CAUSA bugs de Hydration se renderizado incorretamente no primeiro frame. **Regra:** Usar sempre de um controle de mount side-effect `useEffect` ou hook auxiliar responsável por confirmar que o componente está no client antes de expor os dados hidratados pra UI, garantindo builds previsíveis.
2. **SSG Constante:** Como o app não tem servidor rodando (só HTML exportado), TODAS rotas dinâmicas como `/post/[id]` PRECISAM da declaração explícita de `generateStaticParams`. O conteúdo base textual do post entra no HTML. Comentários ou Likes são requisitados via Client-Side `TanStack Query`. 
3. **Autenticação Desacoplada:** Gerenciamento de tokens via client. Não dependemos de rotas da API nativa do Next.js. O estado de autenticado viverá no Zustand Store, persistido no navegador.
4. **Configuração de Rotas Centralizada:** Todas as utilizações de navegação (`next/link`, `useRouter`), bem como as definições de SEO e metadata (`export const metadata`), DEVEM utilizar estritamente o objeto unificado em `src/common/config/routes/index.ts`. Caminhos "hardcoded" pelo app são estritamente proibidos.

> O desenvolvimento neste repositório será guiado primariamente via **Antigravity** Agent. Leia as diretrizes detalhadas na pasta `.agent/rules/` e considere todas as rules e skills de vercel-react-best-practices em `./agent/skills/vercel-react-best-practices/**/*.*`.