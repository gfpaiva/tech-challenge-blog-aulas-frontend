import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PostSearchInput } from './PostSearchInput';

describe('PostSearchInput Component', () => {
  it('renders correctly and calls onChange', () => {
    const mockOnChange = vi.fn();
    render(<PostSearchInput value="test" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');

    fireEvent.change(input, { target: { value: 'testing' } });
    expect(mockOnChange).toHaveBeenCalledWith('testing');
  });

  it('renders loading spinner when isLoading is true', () => {
    const { container } = render(<PostSearchInput value="" onChange={vi.fn()} isLoading={true} />);
    expect(container.querySelector('.loading')).toBeInTheDocument();
  });
});
