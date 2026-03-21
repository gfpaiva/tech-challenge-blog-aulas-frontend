import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

import { httpAdapter } from '@/infra/http/fetch.adapter';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { AdminDashboardView } from './AdminDashboardView';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const originalGet = httpAdapter.get;

const WithProviders = (Story: any) => {
  useEffect(() => {
    useAuthStoreAdapter.setState({
      token: 'fake-jwt-token',
      isAuthenticated: true,
      user: { id: '1', name: 'Admin Dashboard', email: 'admin@dashboard.com', role: 'PROFESSOR' },
    });

    httpAdapter.get = async (url) => {
      if (url.includes('/posts')) {
        return {
          data: [{ id: '1', title: 'Aula Completa Storybook', subject: 'Português', date: '10/10/2023' }],
          meta: { total: 1, page: 1, lastPage: 1 },
        } as any;
      }
      return originalGet(url);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};

const meta: Meta<typeof AdminDashboardView> = {
  title: 'Features/Admin/Posts/AdminDashboardView',
  component: AdminDashboardView,
  decorators: [WithProviders],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { page: '1' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AdminDashboardView>;

export const Default: Story = {};
