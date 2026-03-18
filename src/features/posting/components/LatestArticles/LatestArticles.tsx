import { ArticleCard } from '../ArticleCard/ArticleCard';
import type { Article } from '../../types/article.type';
import { ActionLink } from '@/common/components/ui/ActionLink/ActionLink';

// Mock data based on the screenshot provided
const MOCK_LATEST_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Introdução ao Pensamento Computacional",
    summary: "Aprenda os conceitos básicos de como pensar como um programador para resolver problemas complexos no seu dia a dia.",
    category: "Tecnologia",
    publishedAt: "15 Mar 2024",
    readTimeMin: 5,
    authorConfig: {
      name: "Prof. Carlos Silva",
      avatarUrl: "https://i.pravatar.cc/150?u=carlos"
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "A Evolução da Genética Moderna e CRISPR",
    summary: "Um mergulho profundo em como a edição genética está revolucionando a medicina e os dilemas éticos que acompanham as novas descobertas.",
    category: "Biologia",
    publishedAt: "12 Mar 2024",
    readTimeMin: 8,
    authorConfig: {
      name: "Dra. Mariana Costa",
      avatarUrl: "https://i.pravatar.cc/150?u=mariana"
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Estatística Aplicada à Análise de Dados",
    summary: "Como utilizar conceitos estatísticos fundamentais para interpretar grandes volumes de dados e tomar decisões mais precisas.",
    category: "Matemática",
    publishedAt: "10 Mar 2024",
    readTimeMin: 4,
    authorConfig: {
      name: "Prof. Roberto Alves",
      avatarUrl: "https://i.pravatar.cc/150?u=roberto"
    },
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  }
];

export function LatestArticles() {
  return (
    <section id="artigos" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 border-b border-base-200 pb-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-base-content mb-2 tracking-tight">
              Últimos Artigos
            </h2>
          </div>

          <ActionLink href="/artigos" text="Ver todos" />
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_LATEST_ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

      </div>
    </section>
  );
}
