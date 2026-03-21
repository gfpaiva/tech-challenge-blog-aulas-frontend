import { describe, expect, it } from 'vitest';

import { AdminPostMapper } from './admin-post.mapper';

describe('AdminPostMapper', () => {
  it('correctly maps valid API response to AdminPostResponse', () => {
    // Arrange
    const mockApiResponse = {
      data: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          title: 'Test Post',
          content: 'Test Content',
          author: { id: '123e4567-e89b-12d3-a456-426614174001', name: 'Author Name', role: 'PROFESSOR' },
          category: { id: 1, name: 'Technology' },
          creationDate: '2023-10-10T10:00:00.000Z',
          updateDate: '2023-10-10T11:00:00.000Z',
        },
      ],
      meta: {
        total: 10,
        page: 1,
        lastPage: 2,
      },
    };

    // Act
    const result = AdminPostMapper.toViewModel(mockApiResponse);

    // Assert
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toEqual({
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test Post',
      subject: 'Technology',
      date: new Date('2023-10-10T10:00:00.000Z').toLocaleDateString('pt-BR'),
    });
    expect(result.meta.page).toBe(1);
  });

  it('throws ZodError on invalid data', () => {
    // Arrange
    const invalidData = {
      data: [{ id: 'not-a-uuid' }],
      meta: { total: 0 },
    };

    // Act & Assert
    expect(() => AdminPostMapper.toViewModel(invalidData)).toThrow();
  });
});
