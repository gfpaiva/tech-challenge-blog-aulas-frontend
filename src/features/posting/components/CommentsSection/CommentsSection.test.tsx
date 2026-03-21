import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { usePostComments } from '../../hooks/usePostComments';

import { CommentsSection } from './CommentsSection';

vi.mock('@/infra/store/auth.adapter');
vi.mock('../../hooks/usePostComments');

describe('CommentsSection Component', () => {
  beforeEach(() => {
    vi.mocked(usePostComments).mockReturnValue({
      comments: [{ id: '1', authorName: 'John', content: 'Great!' }],
      onSubmit: vi.fn(),
      isSubmitting: false,
      form: { register: vi.fn(), formState: { errors: {} } },
    } as any);
  });

  it('renders comments and comment form when authenticated', async () => {
    // Authenticated
    vi.mocked(useAuthStoreAdapter).mockReturnValue(true);

    render(<CommentsSection postId="1" initialComments={[]} />);

    // Check for comment
    expect(screen.getByText('Great!')).toBeInTheDocument();

    // Check for form
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Escreva seu comentário...')).toBeInTheDocument();
    });
  });

  it('renders login prompt when unauthenticated', async () => {
    vi.mocked(useAuthStoreAdapter).mockReturnValue(false);

    render(<CommentsSection postId="1" initialComments={[]} />);

    await waitFor(() => {
      expect(screen.getByText('Faça login')).toBeInTheDocument();
    });
  });
});
