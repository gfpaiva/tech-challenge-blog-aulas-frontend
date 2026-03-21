import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CommentCard } from './CommentCard';

describe('CommentCard Component', () => {
  it('renders author, publish date, and content properly', () => {
    const comment = {
      id: '1',
      authorName: 'Test Author',
      publishedAt: '2 days ago',
      content: 'This is a test comment.'
    };
    
    render(<CommentCard comment={comment as any} />); 
    
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
    expect(screen.getByText('This is a test comment.')).toBeInTheDocument();
  });
});
