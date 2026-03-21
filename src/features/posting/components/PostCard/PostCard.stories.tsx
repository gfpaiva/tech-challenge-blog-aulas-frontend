import type { Meta, StoryObj } from '@storybook/react';

import { PostCard, PostCardSkeleton } from './PostCard';

const meta = {
  title: 'Features/Posting/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: {
      id: '1',
      title: 'Introdução ao Pensamento Computacional',
      summary:
        'Aprenda os conceitos básicos de como pensar como um programador para resolver problemas complexos no seu dia a dia.',
      category: 'Tecnologia',
      publishedAt: '15 Mar 2024',
      readTimeMin: 5,
      authorConfig: {
        name: 'Prof. Carlos Silva',
        avatarUrl: 'https://i.pravatar.cc/150?u=carlos',
      },
      thumbnailUrl: 'https://loremflickr.com/800/600/education?lock=1',
    },
  },
  decorators: [
    (Story: any) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    post: {} as any,
  },
  render: () => (
    <div className="w-[350px]">
      <PostCardSkeleton />
    </div>
  ),
};
