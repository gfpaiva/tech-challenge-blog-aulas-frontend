import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Confirmar Ação',
    children: <p>Você tem certeza que deseja realizar esta ação?</p>,
    actions: (
      <>
        <Button variant="outline">Cancelar</Button>
        <Button variant="primary">Confirmar</Button>
      </>
    ),
  },
};
