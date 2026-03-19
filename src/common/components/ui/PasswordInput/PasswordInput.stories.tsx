import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Common/UI/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter your password',
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: true,
    defaultValue: 'pass',
  },
};
