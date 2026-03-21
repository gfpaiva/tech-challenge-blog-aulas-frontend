import { Meta, StoryObj } from '@storybook/react';
import { CommentsSection } from './CommentsSection';

const mockComments = [
  {
    id: '1',
    authorName: 'João Silva',
    content: 'Excelente aula! Aprendi muito sobre o tema.',
    publishedAt: '15 mar. 2026, 14:30',
  },
  {
    id: '2',
    authorName: 'Maria Fernanda',
    content: 'Muito bem explicado. Obrigada, professor!',
    publishedAt: '16 mar. 2026, 09:15',
  },
];

const meta: Meta<typeof CommentsSection> = {
  title: 'Features/Posting/CommentsSection',
  component: CommentsSection,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CommentsSection>;

export const WithComments: Story = {
  args: {
    postId: 'post-123',
    initialComments: mockComments,
  },
};

export const Empty: Story = {
  args: {
    postId: 'post-456',
    initialComments: [],
  },
};
