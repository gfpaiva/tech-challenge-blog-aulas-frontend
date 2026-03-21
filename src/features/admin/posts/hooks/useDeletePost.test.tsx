import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useDeletePost } from './useDeletePost';

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
  useMutation: vi.fn().mockReturnValue({ mutate: vi.fn(), isPending: false, isSuccess: false }),
}));

vi.mock('@/infra/store/toast.adapter', () => ({
  useToastStore: vi.fn().mockReturnValue(vi.fn()),
}));

describe('useDeletePost Hook', () => {
  it('initializes without throwing', () => {
    const { result } = renderHook(() => useDeletePost());
    expect(result.current).toBeDefined();
    expect(result.current.mutate).toBeDefined();
  });
});
