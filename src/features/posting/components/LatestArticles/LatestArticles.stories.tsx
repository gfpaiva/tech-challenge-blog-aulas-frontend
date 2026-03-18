import type { Meta, StoryObj } from '@storybook/react';
import { LatestArticles } from './LatestArticles';

const meta = {
  title: 'Features/Posting/LatestArticles',
  component: LatestArticles,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LatestArticles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
