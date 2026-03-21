import { describe, expect, it } from 'vitest';
import { CreatePostMapper } from './create-post.mapper';

describe('CreatePostMapper', () => {
  it('transforms form data into CreatePostRequest payload properly', () => {
    // Arrange
    const formData = {
      title: 'Valid Title',
      categoryId: 5,
      content: 'Valid Content here',
    };

    // Act
    const payload = CreatePostMapper.toPayload(formData);

    // Assert
    expect(payload).toEqual({
      title: 'Valid Title',
      categoryId: 5,
      content: 'Valid Content here',
    });
  });
});
