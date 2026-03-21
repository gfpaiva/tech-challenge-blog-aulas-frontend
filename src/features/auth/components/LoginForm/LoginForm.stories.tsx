import type { Meta, StoryObj } from '@storybook/react';

import { LoginForm } from './LoginForm';

const meta = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[350px] bg-base-100 p-6 rounded-box shadow-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
