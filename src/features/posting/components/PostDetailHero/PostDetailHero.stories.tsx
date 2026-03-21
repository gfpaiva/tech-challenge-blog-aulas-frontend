import { Meta, StoryObj } from '@storybook/react';

import type { PostDetail } from '../../types/post.type';

import { PostDetailHero } from './PostDetailHero';

const mockPost: PostDetail = {
  id: '123',
  title: 'Introdução à Física Quântica',
  content: 'A física quântica é o estudo da matéria e da energia no nível mais fundamental...',
  summary: 'A física quântica é o estudo da matéria e da energia no nível mais fundamental...',
  category: 'Ciências',
  publishedAt: '15 mar. 2026',
  readTimeMin: 8,
  authorConfig: { name: 'Prof. Maria Silva', role: 'PROFESSOR' },
  thumbnailUrl: 'https://loremflickr.com/1200/600/education?lock=123',
};

const meta: Meta<typeof PostDetailHero> = {
  title: 'Features/Posting/PostDetailHero',
  component: PostDetailHero,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof PostDetailHero>;

export const Default: Story = {
  args: { post: mockPost },
};
