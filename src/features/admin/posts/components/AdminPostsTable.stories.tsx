import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminPostsTable } from './AdminPostsTable';
import { httpAdapter } from '@/infra/http/fetch.adapter';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

// Mock the http adapter to return fake posts directly to bypass backend
const originalGet = httpAdapter.get;

const withMockedApi = (Story: any) => {
  httpAdapter.get = async (url) => {
    if (url.includes('/posts')) {
      return {
        data: [
          { id: '1', title: 'Introdução ao Storybook', subject: 'Português', date: '10/10/2023' },
          { id: '2', title: 'Matemática Avançada', subject: 'Matemática', date: '11/10/2023' },
        ],
        meta: { total: 2, page: 1, lastPage: 1 }
      } as any;
    }
    return originalGet(url);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8 bg-base-200 h-screen">
        <div className="bg-base-100 rounded-box p-4 shadow-sm">
          <Story />
        </div>
      </div>
    </QueryClientProvider>
  );
};

const meta: Meta<typeof AdminPostsTable> = {
  title: 'Features/Admin/Posts/AdminPostsTable',
  component: AdminPostsTable,
  decorators: [withMockedApi],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { page: '1' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AdminPostsTable>;

export const Default: Story = {};
