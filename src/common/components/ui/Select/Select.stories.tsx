import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    disabled: false,
    error: false,
  },
  render: (args) => (
    <Select {...args} defaultValue="">
      <option value="" disabled>
        Selecione uma opção
      </option>
      <option value="1">Opção 1</option>
      <option value="2">Opção 2</option>
    </Select>
  ),
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
