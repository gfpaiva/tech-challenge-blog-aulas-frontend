import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreatePostForm } from './CreatePostForm';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';
import { useEffect } from 'react';

// Setup isolated QueryClient for Storybook
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const withProviders = (Story: any) => {
  useEffect(() => {
    useAuthStoreAdapter.setState({ 
      token: 'fake-jwt-token',
      isAuthenticated: true,
      user: { id: '1', name: 'Professor Teste', email: 'prof@test.com', role: 'PROFESSOR' }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center p-10 bg-base-200 min-h-screen">
        <Story />
      </div>
    </QueryClientProvider>
  );
};

const meta: Meta<typeof CreatePostForm> = {
  title: 'Features/Admin/Posts/CreatePostForm',
  component: CreatePostForm,
  decorators: [withProviders],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/admin/aulas/nova',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreatePostForm>;

export const Default: Story = {};
