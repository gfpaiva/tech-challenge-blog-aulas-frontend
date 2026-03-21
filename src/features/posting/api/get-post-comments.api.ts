import { httpAdapter } from '@/infra/http/fetch.adapter';

import { PostMapper } from '../mappers/post.mapper';
import type { Comment } from '../types/post.type';

export async function getPostComments(postId: string): Promise<Comment[]> {
  const response = await httpAdapter.get('/posts/[:postId]/comments', {
    pathParams: { postId },
  });

  return PostMapper.toComments(response);
}
