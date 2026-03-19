import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="w-32 h-32" />,
};

export const TextLine: Story = {
  render: () => <Skeleton className="h-4 w-64" />,
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-52">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  ),
};
