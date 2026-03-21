![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) ![SonarCloud](https://img.shields.io/badge/SonarCloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white) ![Snyk](https://img.shields.io/badge/Snyk-4C4A73?style=for-the-badge&logo=snyk&logoColor=white) ![New Relic](https://img.shields.io/badge/New_Relic-008C99?style=for-the-badge&logo=newrelic&logoColor=white)

# Tech Challenge: Blog Aulas — Frontend

> Interface Web responsiva construída com **Next.js** do "Blog Aulas", conectando professores e alunos.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura e Padrões](#arquitetura-e-padrões)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Setup Inicial](#setup-inicial)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Comandos Disponíveis](#comandos-disponíveis)
- [Mapa de Rotas](#mapa-de-rotas)
- [Testes](#testes)
- [CI/CD e Deploy](#cicd-e-deploy)
- [Observabilidade](#observabilidade)


---

## Sobre o Projeto

O **Blog Aulas** é uma plataforma educacional que permite a professores publicarem aulas e a alunos consumirem esse conteúdo publicamente. A interface foi construída priorizando performance (SSG/SSR híbrido).

**Papel dos usuários:**

- **PROFESSOR:** Autentica-se, gerencia posts (criar, editar, excluir) via painel administrativo.
- **ALUNO:** Navega e lê posts publicados, pode comentar quando autenticado.

---

## Stack Tecnológica

| Categoria              | Tecnologia                      | Versão   |
| ---------------------- | ------------------------------- | -------- |
| Framework              | Next.js (App Router)            | 16.1.7   |
| Linguagem              | TypeScript                      | ^5       |
| Runtime                | React                           | 19.2.3   |
| Estilização            | Tailwind CSS v4 + DaisyUI v5    | ^4 / ^5  |
| Estado Global          | Zustand                         | ^5.0.12  |
| Data Fetching (Client) | TanStack Query                  | ^5.90.21 |
| Formulários            | React Hook Form + Zod           | ^7 / ^4  |
| Ícones                 | Lucide React                    | ^0.577.0 |
| Merge de Classes       | clsx + tailwind-merge           | ^2 / ^3  |
| Testes                 | Vitest + Storybook addon-vitest | ^4       |
| Documentação de UI     | Storybook                       | ^10      |

---

## Arquitetura e Padrões

Este projeto segue uma arquitetura **Hexagonal (Portas e Adaptadores)** combinada com **Vertical Slices**, resultando numa base de código altamente desacoplada, testável e escalável.

### 1. Visão Geral: Fluxo de Camadas

![Visão Arquitetura](docs/blog-aulas-frontend-arch.png)

### 2. Padrão MVVM

| Camada        | Responsabilidade                                                  | Local                                      |
| ------------- | ----------------------------------------------------------------- | ------------------------------------------ |
| **View**      | Renderizar UI, delegar eventos via props. Zero lógica de negócio. | `features/*/components/`                   |
| **ViewModel** | Orquestrar estado, fetch, formulários e submissões.               | `features/*/hooks/useXxx.ts`               |
| **Model**     | Tipos TypeScript, schemas Zod, mappers.                           | `features/*/types/`, `features/*/mappers/` |

### 3. Port/Adapter (Hexagonal)

O código de negócio nunca depende de implementações concretas. Ele acessa apenas **interfaces** (Ports), enquanto os **Adapters** na camada `infra/` as implementam:

![Visão PortAdapter](docs/blog-aulas-port-adapter.png)

### 4. Mappers e Validação com Zod

Nenhum payload raw da API chega sujo ao frontend. Cada feature define schemas Zod que **validam** e **transformam** a resposta:

![Visão Mappers](docs/blog-aulas-mapper.png)

**Exemplo real (`post.mapper.ts`):** O campo `creationDate` da API chega como string ISO. O `transform` do Zod o converte automaticamente para `"20 mar. 2026"` (pt-BR) antes de entregar para o componente.

### 5. Renderização Híbrida (SSG + Client-Side)

![Visão SSG](docs/blog-aulas-ssg-hibrido.png)

---

## Estrutura de Pastas

```
src/
├── app/                            # Roteamento puro (Next.js App Router)
│   ├── (auth)/                     # Grupo de rotas autenticadas
│   │   └── template.tsx            # Layout do grupo auth
│   ├── (public)/                   # Grupo de rotas públicas
│   │   ├── page.tsx                # Home page
│   │   └── template.tsx            # Layout público (Header/Footer)
│   ├── globals.css                 # Design tokens + DaisyUI themes
│   └── layout.tsx                  # Root layout (Providers, fontes)
│
├── common/                         # Compartilhado globalmente
│   ├── components/                 # Componentes compartilhados globalmente
│   ├── config/
│   │   └── routes/index.ts         # ⭐ Configuração centralizada de rotas
│   ├── hooks/                      # Hooks compartilhados globalmente
│   ├── lib/
│   │   └── utils.ts                # cn() — merge inteligente de classes CSS
│   ├── ports/                      # Interfaces / contratos abstratos
│   └── types/
│
├── infra/                          # Adapters (implementação de detalhes)
│
└── features/                       # Vertical Slices de domínio
```

---

## Pré-requisitos

- **Node.js** v20+
- **pnpm** v10+
- **Backend** rodando em `http://localhost:3000` (ou configure via variáveis de ambiente)

---

## Setup Inicial

### 1. Clone o repositório

```bash
git clone https://github.com/gfpaiva/tech-challenge-blog-aulas-frontend.git
cd tech-challenge-blog-aulas-frontend
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.development .env.local
# Edite .env.local com suas configurações caso necessário
```

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3001](http://localhost:3001) (ou a porta exibida no terminal).

---

## Variáveis de Ambiente

| Variável              | Padrão                  | Descrição                  |
| --------------------- | ----------------------- | -------------------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000` | URL base da API do backend |

> **Prefixo `NEXT_PUBLIC_`:** Obrigatório para variáveis que precisam ser expostas ao bundle do cliente. Variáveis sem este prefixo só existem no servidor de build.

---

## Comandos Disponíveis

| Comando                | Descrição                                                   |
| ---------------------- | ----------------------------------------------------------- |
| `pnpm dev`             | Inicia o servidor de desenvolvimento (Next.js Dev Server)   |
| `pnpm build`           | Gera o export estático completo em `./out/`                 |
| `pnpm start`           | Serve o bundle de produção (requer `pnpm build` antes)      |
| `pnpm test`            | Executa a suite completa de testes via Vitest               |
| `pnpm test:watch`      | Executa os testes em modo interativo (watch mode)           |
| `pnpm test:coverage`   | Gera relatório de cobertura de código (@vitest/coverage-v8) |
| `pnpm lint`            | Executa o ESLint para análise estática de código            |
| `pnpm lint:fix`        | Corrige automaticamente problemas simples de Lint           |
| `pnpm format`          | Formata todo o código fonte utilizando Prettier             |
| `pnpm storybook`       | Inicia o Storybook em `http://localhost:6006`               |
| `pnpm build-storybook` | Gera o build estático do Storybook em `./storybook-static/` |

---

## Mapa de Rotas

![Visão SiteMap](docs/blog-aulas-sitemap.png)

---

## Testes

Suite de testes automatizada utilizando **Vitest** e **React Testing Library**, focada em garantir a confiabilidade da lógica de negócio e dos componentes de UI.

### Estratégia de Testes

| Camada           | Ferramenta   | Foco                                                      |
| ---------------- | ------------ | --------------------------------------------------------- |
| **Unitário**     | Vitest       | Mappers, ViewModels (hooks), utilitários e lógica pura.   |
| **Componente**   | Vitest + RTL | Interações, renderização e estados de componentes "Dumb". |
| **Documentação** | Storybook    | Validação visual isolada e documentação técnica.          |

### Comandos de Teste

```bash
pnpm test                  # Executa todos os testes
pnpm test:watch            # Executa em modo watch (desenvolvimento)
pnpm test:coverage         # Gera relatório detalhado de cobertura (/coverage)
```

---

## Qualidade, Segurança e Padronização

O projeto utiliza um pipeline rigoroso de qualidade local para garantir que nenhum código "sujo" chegue ao repositório remoto.

### 1. Automação com Git Hooks (Husky)

- **Pre-commit:** Ao tentar realizar um commit, o **Husky** dispara o `lint-staged` que:
  - Formata o código com **Prettier**.
  - Executa a correção automática do **ESLint**.
  - Valida tipos com `tsc --noEmit` (apenas nos arquivos modificados).
- **Commit-msg:** Valida se a mensagem do commit segue o padrão **Conventional Commits**.

### 2. Formatação e Linting

- **Prettier:** Mantém o estilo de código consistente (configurável via `.prettierrc`).
- **ESLint v9:** Configurado com flat config (`eslint.config.mjs`) para manter as melhores práticas de Next.js 16 e React 19.

### 3. Padronização de Commits (Commitlint)

Utilizamos **Conventional Commits** para facilitar o versionamento automático e o entendimento do histórico:

- `feat(posting):` Novas funcionalidades.
- `fix(auth):` Correção de bugs.
- `refactor(ui):` Mudança estrutural sem alterar comportamento.
- `chore:` Tarefas de manutenção ou dependências.

### 4. Análise de Qualidade e Segurança (SonarCloud & Snyk)

O projeto integra ferramentas automatizadas para garantir a saúde e segurança do código:

- **SonarCloud:** Realiza análise estática completa para identificar bugs, vulnerabilidades (SAST) e medir a cobertura de testes. Integrado via GitHub Actions no processo de PR.
- **Snyk:** Monitora as dependências do projeto em busca de vulnerabilidades em bibliotecas de terceiros, garantindo a integridade.


---

## CI/CD e Deploy

O projeto conta com automação de ponta a ponta via **GitHub Actions**, cobrindo integração e entrega contínua.

### Pipeline de Integração Contínua (CI) — `pr-validation.yml`

Cada **Pull Request** para a branch `main` dispara automaticamente o workflow `pr-validation.yml`, que executa:

| Etapa      | Comando      | Descrição                                      |
| ---------- | ------------ | ---------------------------------------------- |
| **Lint**   | `pnpm lint`  | Análise estática do código.                    |
| **Testes** | `pnpm test`  | Execução dos testes unitários e de componente. |
| **Build**  | `pnpm build` | Validação do export estático (SSG).            |

### Pipeline de Entrega Contínua (CD) — `cd.yml`

Cada push na branch `main` (ou execução manual via `workflow_dispatch`) aciona o workflow `cd.yml`, composto por dois jobs:

```
push → main
  └── release-please            ← Cria/atualiza PR de release + gera tag e CHANGELOG
        └── deploy               ← Aciona deploy no Render via webhook (somente se houver nova release)
```

### Estratégia de Build e Hospedagem

Como o app utiliza `output: 'export'` do Next.js, o resultado do `pnpm build` é uma pasta `./out/` com HTML/CSS/JS **totalmente estáticos**, hospedada no **Render**.

```
pnpm build
  └── ./out/
        ├── index.html
        ├── aulas/
        │   └── [id]/index.html   ← gerados via generateStaticParams
        └── _next/static/         ← assets JS/CSS
```

**Produção:** [tech-challenge-blog-aulas-frontend.onrender.com](https://tech-challenge-blog-aulas-frontend.onrender.com) (deploy automático via CD pipeline)

---

## Observabilidade

Para monitoramento em tempo real e análise de performance no navegador, utilizamos o **New Relic**.

### New Relic Browser (RUM)

A aplicação está instrumentada com o agente de browser do New Relic para:
- **Core Web Vitals:** Acompanhamento de métricas reais de experiência do usuário (LCP, INP, CLS).
- **Error Tracking:** Captura proativa de erros de JavaScript e falhas de requisição em produção.


---

## Links Úteis

| Recurso                | URL                                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend API (Produção) | [tech-challenge-blog-aulas-backend.onrender.com](https://tech-challenge-blog-aulas-backend.onrender.com)                                                 |
| Repositório Backend    | [github.com/gfpaiva/tech-challenge-blog-aulas-backend](https://github.com/gfpaiva/tech-challenge-blog-aulas-backend)                                     |
| release-please Action  | [github.com/googleapis/release-please-action](https://github.com/googleapis/release-please-action)                                                       |
| DaisyUI Components     | [daisyui.com/components](https://daisyui.com/components/)                                                                                                |
| TanStack Query Docs    | [tanstack.com/query/v5](https://tanstack.com/query/v5)                                                                                                   |
| Next.js Static Export  | [nextjs.org/docs/app/building-your-application/deploying/static-exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) |
| SonarCloud Project     | [sonarcloud.io/summary/new_code?id=gfpaiva_tech-challenge-blog-aulas-frontend](https://sonarcloud.io/summary/new_code?id=gfpaiva_tech-challenge-blog-aulas-frontend) |
| Snyk Safety Search     | [snyk.io/vuln](https://snyk.io/vuln)                                                                                                                     |
| New Relic Dashboard    | [one.newrelic.com](https://one.newrelic.com)                                                                                                             |

