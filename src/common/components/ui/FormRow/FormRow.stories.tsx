import type { Meta, StoryObj } from '@storybook/react';
import { FormRow } from './FormRow';
import { Input } from '../Input/Input';

const meta = {
  title: 'Common/UI/FormRow',
  component: FormRow,
  tags: ['autodocs'],
  args: {
    label: 'Username',
    children: <Input placeholder="Type your username" />,
  },
} satisfies Meta<typeof FormRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'This field is required',
    children: <Input error placeholder="Type your username" />,
  },
};
