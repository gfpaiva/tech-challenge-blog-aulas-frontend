import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createComment } from '../api/create-comment.api';
import { getPostComments } from '../api/get-post-comments.api';

import { usePostComments } from './usePostComments';

vi.mock('../api/create-comment.api', () => ({
  createComment: vi.fn(),
}));

vi.mock('../api/get-post-comments.api', () => ({
  getPostComments: vi.fn(),
}));

const { mockSuccess, mockError } = vi.hoisted(() => ({
  mockSuccess: vi.fn(),
  mockError: vi.fn(),
}));

vi.mock('@/infra/store/toast.adapter', () => ({
  useToastStore: () => ({ success: mockSuccess, error: mockError }),
}));

const mockComments = [{ id: 'c1', authorName: 'Test User', content: 'Old comment', publishedAt: '01/01/2023' }];

describe('usePostComments Hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    vi.clearAllMocks();
    vi.mocked(getPostComments).mockResolvedValue(mockComments);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches comments from the API for the given postId', async () => {
    const { result } = renderHook(() => usePostComments('post-1'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.comments).toHaveLength(1);
      expect(result.current.comments[0].content).toBe('Old comment');
    });

    expect(getPostComments).toHaveBeenCalledWith('post-1');
  });

  it('submits new comment and invalidates the query', async () => {
    const newComment = { id: 'c2', authorName: 'New User', content: 'New stuff', publishedAt: '02/01/2023' };
    vi.mocked(createComment).mockResolvedValueOnce(newComment);

    const { result } = renderHook(() => usePostComments('post-1'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    result.current.form.setValue('content', 'New stuff');

    act(() => {
      result.current.onSubmit();
    });

    await waitFor(() => {
      expect(createComment).toHaveBeenCalledWith('post-1', { content: 'New stuff' });
      expect(mockSuccess).toHaveBeenCalledWith('Comentário publicado com sucesso!');
      expect(result.current.form.getValues('content')).toBe('');
    });
  });

  it('handles submission error correctly', async () => {
    vi.mocked(createComment).mockRejectedValueOnce(new Error('Error'));

    const { result } = renderHook(() => usePostComments('post-1'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    result.current.form.setValue('content', 'To crash');

    act(() => {
      result.current.onSubmit();
    });

    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Erro ao publicar comentário. Tente novamente.');
    });
  });
});
