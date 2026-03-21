import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { updatePost } from '../api/update-post.api';

import { useUpdatePost } from './useUpdatePost';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../api/update-post.api', () => ({
  updatePost: vi.fn(),
}));

const { mockSuccess, mockError } = vi.hoisted(() => ({
  mockSuccess: vi.fn(),
  mockError: vi.fn(),
}));

vi.mock('@/infra/store/toast.adapter', () => ({
  useToastStore: (selector: any) => selector({ success: mockSuccess, error: mockError }),
}));

describe('useUpdatePost Hook', () => {
  let queryClient: QueryClient;
  let mockPush: ReturnType<typeof vi.fn>;

  const mockPostDetail = {
    id: 'post-1',
    title: 'Old Title',
    content: 'Old Content',
    category: { id: 2, name: 'Science' },
    author: { id: 'au-1', name: 'Author', role: 'PROF' },
    creationDate: '',
    updateDate: '',
  };

  beforeEach(() => {
    queryClient = new QueryClient();
    mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('initializes form with post detail data', async () => {
    const { result } = renderHook(() => useUpdatePost(mockPostDetail), { wrapper });

    await waitFor(() => {
      expect(result.current.form.getValues('title')).toBe('Old Title');
      expect(result.current.form.getValues('categoryId')).toBe(2);
      expect(result.current.form.getValues('content')).toBe('Old Content');
    });
  });

  it('calls update API and handles success', async () => {
    vi.mocked(updatePost).mockResolvedValueOnce({} as any);
    const { result } = renderHook(() => useUpdatePost(mockPostDetail), { wrapper });

    result.current.form.setValue('title', 'New Title');

    act(() => {
      result.current.onSubmit();
    });

    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledWith('post-1', {
        title: 'New Title',
        categoryId: 2,
        content: 'Old Content',
      });
      expect(mockSuccess).toHaveBeenCalledWith('Aula atualizada com sucesso!');
      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  it('calls update API and handles error', async () => {
    vi.mocked(updatePost).mockRejectedValueOnce(new Error('Update failed'));
    const { result } = renderHook(() => useUpdatePost(mockPostDetail), { wrapper });

    act(() => {
      result.current.onSubmit();
    });

    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Ocorreu um erro ao atualizar a aula. Tente novamente.');
    });
  });
});
