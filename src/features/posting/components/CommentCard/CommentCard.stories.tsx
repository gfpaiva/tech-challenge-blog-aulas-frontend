import { Meta, StoryObj } from '@storybook/react';

import { CommentCard } from './CommentCard';

const meta: Meta<typeof CommentCard> = {
  title: 'Features/Posting/CommentCard',
  component: CommentCard,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CommentCard>;

export const Default: Story = {
  args: {
    comment: {
      id: '1',
      authorName: 'João Silva',
      content: 'Esta aula foi incrível! Aprendi muito sobre o tema. Continuem com o excelente trabalho!',
      publishedAt: '15 mar. 2026, 14:30',
    },
  },
};

export const LongComment: Story = {
  args: {
    comment: {
      id: '2',
      authorName: 'Maria Fernanda',
      content:
        'Excelente explicação! Fiquei impressionada com a clareza e profundidade do conteúdo. Tenho algumas dúvidas sobre os conceitos apresentados no final, mas no geral foi uma das melhores aulas que já assisti nesta plataforma.',
      publishedAt: '16 mar. 2026, 09:15',
    },
  },
};
