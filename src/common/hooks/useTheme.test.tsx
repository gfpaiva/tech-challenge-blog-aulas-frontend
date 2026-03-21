import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useThemeStoreAdapter } from '@/infra/store/theme.adapter';

import { useTheme } from './useTheme';

vi.mock('@/infra/store/theme.adapter', () => ({
  useThemeStoreAdapter: vi.fn(),
}));

describe('useTheme Hook', () => {
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      theme: 'blog',
      toggleTheme: vi.fn(),
    };
    vi.mocked(useThemeStoreAdapter).mockReturnValue(mockStore);

    // Clear DOM changes from previous tests
    document.documentElement.removeAttribute('data-theme');
  });

  it('initializes with isHydrated sets to true after mount', () => {
    // Arrange & Act
    const { result } = renderHook(() => useTheme());

    // Assert
    expect(result.current.theme).toBe('blog');
    expect(result.current.isHydrated).toBe(true);
  });

  it('updates document html data-theme attribute on hydration', () => {
    // Arrange & Act
    renderHook(() => useTheme());

    // Assert
    expect(document.documentElement.getAttribute('data-theme')).toBe('blog');
  });

  it('reflects store changes to document string', () => {
    // Arrange
    const { rerender } = renderHook(() => useTheme());

    // Act
    mockStore.theme = 'retro';
    rerender();

    // Assert
    expect(document.documentElement.getAttribute('data-theme')).toBe('retro');
  });
});
