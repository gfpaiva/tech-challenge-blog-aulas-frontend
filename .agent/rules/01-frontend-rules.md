# Regras Estritas de Implementação

## 1. Temas (DaisyUI)
- O estado inicial do tema deve respeitar a preferência do sistema do usuário, mas permitir toggle manual.
- Use a lógica: `document.documentElement.setAttribute('data-theme', theme)`.

## 2. Rotas Protegidas
- [cite_start]Como não há middleware de servidor, implemente um `ProtectedRoute` component.[cite: 211].

## 3. Mappers com Zod
- Use `.transform()` ou `.parse()` diretamente nas camadas de API para garantir que o resto da app receba objetos higienizados.