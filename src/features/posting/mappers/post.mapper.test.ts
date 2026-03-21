import { describe, it, expect } from 'vitest';
import { PostMapper } from './post.mapper';

describe('PostMapper', () => {
  const validBasePayload = {
    id: 'post-123',
    title: 'Post Title Test',
    content: 'This is a long test content that should be summarized if it exceeds 120 characters to see if the summary feature works as intended by appending ellipses at the end.',
    author: {
      id: 'author-1',
      name: 'John Doe',
      role: 'Teacher'
    },
    category: {
      id: 1,
      name: 'Português'
    },
    creationDate: '2023-05-15T12:00:00Z',
    updateDate: '2023-05-16T12:00:00Z',
  };

  it('correctly maps backend paginated response to PaginatedPostsResponse', () => {
    const payload = {
      data: [validBasePayload],
      meta: {
        total: 10,
        page: 1,
        lastPage: 2
      }
    };

    const result = PostMapper.toDomain(payload);

    expect(result.data).toHaveLength(1);
    expect(result.data[0].id).toBe('post-123');
    expect(result.data[0].title).toBe('Post Title Test');
    // Summary truncated and ellipses added
    expect(result.data[0].summary.endsWith('...')).toBe(true);
    expect(result.data[0].summary.length).toBeLessThanOrEqual(123); 
    // Format date check (pt-BR structure generally includes the month name short or abbreviated, day, and year)
    expect(result.data[0].publishedAt).toContain('15 de mai. de 2023'); // Adjust to how Intl returns on different envs, could also be '15 May 2023' etc. But let's check for "2023".
    expect(result.data[0].category).toBe('Português');
    expect(result.data[0].authorConfig.name).toBe('John Doe');
    expect(result.data[0].thumbnailUrl).toContain('loremflickr.com/800/600/literature');
    expect(result.meta.total).toBe(10);
  });

  it('correctly maps toDetail payload preserving full content and different image size', () => {
    const result = PostMapper.toDetail(validBasePayload);

    expect(result.id).toBe('post-123');
    expect(result.content).toBe(validBasePayload.content); // Detail keeps full content
    expect(result.summary.endsWith('...')).toBe(true);
    expect(result.thumbnailUrl).toContain('loremflickr.com/1200/600/literature');
  });

  it('fails to map when required fields are missing', () => {
    const invalidPayload = {
      data: [{ id: '123', title: 'test' }],
      meta: { total: 1, page: 1, lastPage: 1 }
    };

    expect(() => PostMapper.toDomain(invalidPayload)).toThrow();
  });

  describe('Comments Mapper', () => {
    it('correctly maps a list of comments', () => {
      const payload = [{
        id: 'c1',
        content: 'Nice post!',
        author: { name: 'Jane' },
        creationDate: '2023-05-15T15:30:00Z'
      }];

      const result = PostMapper.toComments(payload);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('c1');
      expect(result[0].authorName).toBe('Jane');
      expect(result[0].content).toBe('Nice post!');
    });
  });
});
