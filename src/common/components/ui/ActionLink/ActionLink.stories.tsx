import type { Meta, StoryObj } from '@storybook/react';
import { ActionLink } from './ActionLink';

const meta = {
  title: 'Common/UI/ActionLink',
  component: ActionLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    text: 'Ver todos',
  },
};

export const CustomText: Story = {
  args: {
    href: '#',
    text: 'Acessar área do docente',
  },
};
