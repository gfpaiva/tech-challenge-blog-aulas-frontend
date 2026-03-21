import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { SearchInput } from './SearchInput';
import { useAdminPosts } from '../../hooks/useAdminPosts';

vi.mock('../../hooks/useAdminPosts');

describe('SearchInput Component', () => {
  it('updates search on typing with debounce', async () => {
    const mockUpdateSearch = vi.fn();
    vi.mocked(useAdminPosts).mockReturnValue({
      searchState: { searchTerm: '', updateSearch: mockUpdateSearch }
    } as any);

    render(<SearchInput />);
    
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'react' } });
    
    // Initially not called due to debounce
    expect(mockUpdateSearch).not.toHaveBeenCalled();
    
    await waitFor(() => {
      expect(mockUpdateSearch).toHaveBeenCalledWith('react');
    });
  });
});
