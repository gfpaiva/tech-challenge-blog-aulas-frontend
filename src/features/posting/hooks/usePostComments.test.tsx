import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createComment } from '../api/create-comment.api';

import { usePostComments } from './usePostComments';

vi.mock('../api/create-comment.api', () => ({
  createComment: vi.fn(),
}));

const { mockSuccess, mockError } = vi.hoisted(() => ({
  mockSuccess: vi.fn(),
  mockError: vi.fn(),
}));

vi.mock('@/infra/store/toast.adapter', () => ({
  useToastStore: () => ({ success: mockSuccess, error: mockError }),
}));

describe('usePostComments Hook', () => {
  let queryClient: QueryClient;

  const initialComments = [{ id: 'c1', authorName: 'Test User', content: 'Old comment', publishedAt: '01/01/2023' }];

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { mutations: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('initializes with initial comments', () => {
    const { result } = renderHook(() => usePostComments('post-1', initialComments), { wrapper });
    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0].content).toBe('Old comment');
  });

  it('submits new comment and prepends to list', async () => {
    const newComment = { id: 'c2', authorName: 'New User', content: 'New stuff', publishedAt: '02/01/2023' };
    vi.mocked(createComment).mockResolvedValueOnce(newComment);

    const { result } = renderHook(() => usePostComments('post-1', initialComments), { wrapper });

    result.current.form.setValue('content', 'New stuff');

    act(() => {
      result.current.onSubmit();
    });

    await waitFor(() => {
      expect(createComment).toHaveBeenCalledWith('post-1', { content: 'New stuff' });
      expect(result.current.comments).toHaveLength(2);
      expect(result.current.comments[0].content).toBe('New stuff');
      expect(mockSuccess).toHaveBeenCalledWith('Comentário publicado com sucesso!');
      expect(result.current.form.getValues('content')).toBe('');
    });
  });

  it('handles submission error correctly', async () => {
    vi.mocked(createComment).mockRejectedValueOnce(new Error('Error'));

    const { result } = renderHook(() => usePostComments('post-1', initialComments), { wrapper });

    result.current.form.setValue('content', 'To crash');

    act(() => {
      result.current.onSubmit();
    });

    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Erro ao publicar comentário. Tente novamente.');
      // Should not prepend
      expect(result.current.comments).toHaveLength(1);
    });
  });
});
