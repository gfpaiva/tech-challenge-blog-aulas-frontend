export const appRoutes = {
  home: {
    path: "/",
    isPrivate: false,
    title: "Blog Aulas",
    description: "Plataforma de ensino e aprendizado.",
  },
  posts: {
    path: "/aulas",
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
    description: "Acesse sua conta para gerenciar aulas e categorias.",
  },
  createPost: {
    path: "/admin/aulas/nova",
    isPrivate: true,
    title: "Nova Aula | Blog Aulas",
    description: "Crie uma nova aula",
  },
  categories: {
    path: "/categorias",
    isPrivate: false,
    title: "Categorias | Blog Aulas",
    description: "Explore as aulas por categorias.",
  },
  // Function to generate dynamic route for specific article
  postDetail: (id: string | number) => ({
    path: `/aulas/${id}`,
    isPrivate: false,
  }),
} as const;
