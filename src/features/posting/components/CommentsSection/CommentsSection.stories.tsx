import { Meta, StoryObj } from '@storybook/react';

import { CommentsSection } from './CommentsSection';

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
  },
};

export const Empty: Story = {
  args: {
    postId: 'post-456',
  },
};
