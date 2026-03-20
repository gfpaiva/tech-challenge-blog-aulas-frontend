import type { Meta, StoryObj } from '@storybook/react';
import { LatestPosts } from './LatestPosts';
import { Post } from '../../types/post.type';

const MOCK_LATEST_POSTS: Post[] = [
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

const meta = {
  title: 'Features/Posting/LatestPosts',
  component: LatestPosts,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    posts: MOCK_LATEST_POSTS
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LatestPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
