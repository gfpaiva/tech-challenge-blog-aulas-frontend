import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SearchEmptyState } from './SearchEmptyState';

describe('SearchEmptyState Component', () => {
  it('renders the query text properly', () => {
    render(<SearchEmptyState query="ReactJS" />);
    
    expect(screen.getByText('Nenhuma aula encontrada')).toBeInTheDocument();
    const queryEl = screen.getByText('"ReactJS"');
    expect(queryEl).toBeInTheDocument();
  });
});
