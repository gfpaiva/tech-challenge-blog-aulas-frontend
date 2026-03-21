import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PostDetailHero } from './PostDetailHero';

describe('PostDetailHero Component', () => {
  it('renders the hero details properly', () => {
    const mockPost = {
      id: 'post-1',
      title: 'Hero Title',
      summary: 'Summary',
      content: 'Content',
      category: 'NODEJS',
      thumbnailUrl: 'hero.jpg',
      publishedAt: '01/01/2024',
      readTimeMin: 5,
      authorId: 'auth-1',
      authorConfig: { name: 'Hero Author', avatarUrl: '' },
    };

    render(<PostDetailHero post={mockPost as any} />);

    expect(screen.getByText('Hero Title')).toBeInTheDocument();
    expect(screen.getByText('NODEJS')).toBeInTheDocument();
    expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('Hero Author')).toBeInTheDocument();
    expect(screen.getByText('5 min de leitura')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Capa da aula/i })).toHaveAttribute('src', 'hero.jpg');
  });
});
