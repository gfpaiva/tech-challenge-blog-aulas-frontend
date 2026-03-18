import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './ArticleCard';

const meta = {
  title: 'Features/Posting/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: {
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
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};
