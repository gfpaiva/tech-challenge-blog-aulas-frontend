import type { Meta, StoryObj } from '@storybook/react';
import { PostSearchInput } from './PostSearchInput';

const meta = {
  title: 'Features/Posting/PostSearchInput',
  component: PostSearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostSearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    value: 'Matemática',
    onChange: () => {},
  },
};

export const Loading: Story = {
  args: {
    value: 'História',
    onChange: () => {},
    isLoading: true,
  },
};
