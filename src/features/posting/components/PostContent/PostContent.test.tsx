import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PostContent } from './PostContent';

describe('PostContent Component', () => {
  it('renders paragraphs correctly separated by line breaks', () => {
    const content = `First paragraph.\n\nSecond paragraph.\n\nThird paragraph.`;
    render(<PostContent content={content} />);

    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Third paragraph.')).toBeInTheDocument();
  });
});
