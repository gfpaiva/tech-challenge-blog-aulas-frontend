import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { AdminHeader } from './AdminHeader';

const WithAuth = (Story: any) => {
  useEffect(() => {
    useAuthStoreAdapter.setState({
      token: 'fake-jwt-token',
      isAuthenticated: true,
      user: { id: '1', name: 'Professor Storybook', email: 'prof@storybook.com', role: 'PROFESSOR' },
    });
  }, []);

  return (
    <div className="w-full">
      <Story />
    </div>
  );
};

const meta: Meta<typeof AdminHeader> = {
  title: 'Features/Admin/Posts/AdminHeader',
  component: AdminHeader,
  decorators: [WithAuth],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AdminHeader>;

export const Default: Story = {};
