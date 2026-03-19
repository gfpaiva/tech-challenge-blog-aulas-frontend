export const appRoutes = {
  home: {
    path: "/",
    isPrivate: false,
    title: "Blog Aulas",
    description: "Plataforma de ensino e aprendizado.",
  },
  posts: {
    path: "/posts",
    isPrivate: false,
    title: "Aulas Publicadas | Blog Aulas",
    description: "Lista de todas as aulas publicadas pelos professores.",
  },
  adminDashboard: {
    path: "/admin/dashboard",
    isPrivate: true,
    title: "Painel do Professor | Blog Aulas",
    description: "Área administrativa para professores gerenciarem suas aulas.",
  },
  login: {
    path: "/login",
    isPrivate: false,
    title: "Login | Blog Aulas",
    description: "Acesse sua conta para gerenciar aulas e disciplinas.",
  },
  disciplinas: {
    path: "/disciplinas",
    isPrivate: false,
    title: "Disciplinas | Blog Aulas",
    description: "Explore os artigos por disciplinas acadêmicas.",
  },
  // Function to generate dynamic route for specific article
  postDetail: (id: string | number) => ({
    path: `/artigos/${id}`,
    isPrivate: false,
  }),
} as const;
