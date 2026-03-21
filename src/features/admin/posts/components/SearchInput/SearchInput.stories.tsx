import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SearchInput } from './SearchInput';

const queryClient = new QueryClient();

const withProviders = (Story: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8 bg-base-200">
        <Story />
      </div>
    </QueryClientProvider>
  );
};

const meta: Meta<typeof SearchInput> = {
  title: 'Features/Admin/Posts/SearchInput',
  component: SearchInput,
  decorators: [withProviders],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { q: '' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};
