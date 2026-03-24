import type { Meta, StoryObj } from '@storybook/react';

import { NavLink } from './NavLink';

const meta = {
  title: 'UI/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    text: 'Início',
    className: 'link link-hover',
  },
};

export const CustomClass: Story = {
  args: {
    href: '#',
    text: 'Destacado',
    className: 'font-bold text-primary',
  },
};
