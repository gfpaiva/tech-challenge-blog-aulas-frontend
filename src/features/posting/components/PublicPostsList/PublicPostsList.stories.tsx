import type { Meta, StoryObj } from '@storybook/react';

import { PublicPostsList } from './PublicPostsList';

const MOCK_POSTS = [
  {
    id: '1',
    title: 'Post 1',
    summary: 'Summary 1',
    category: 'Math',
    publishedAt: '20 Mar 2024',
    readTimeMin: 5,
    authorConfig: { name: 'Author 1' },
    thumbnailUrl: 'https://loremflickr.com/800/600/math?lock=1',
  },
  {
    id: '2',
    title: 'Post 2',
    summary: 'Summary 2',
    category: 'Tech',
    publishedAt: '21 Mar 2024',
    readTimeMin: 3,
    authorConfig: { name: 'Author 2' },
    thumbnailUrl: 'https://loremflickr.com/800/600/tech?lock=2',
  },
];

const meta = {
  title: 'Features/Posting/PublicPostsList',
  component: PublicPostsList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PublicPostsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: MOCK_POSTS,
    hasNextPage: true,
  },
};

export const FetchingMore: Story = {
  args: {
    posts: MOCK_POSTS,
    hasNextPage: true,
    isFetchingNextPage: true,
  },
};

export const NoMorePages: Story = {
  args: {
    posts: MOCK_POSTS,
    hasNextPage: false,
  },
};
