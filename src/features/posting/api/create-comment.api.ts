import { httpAdapter } from '@/infra/http/fetch.adapter';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { CommentResponseSchema } from '../mappers/post.mapper';
import type { Comment } from '../types/post.type';

export type CreateCommentPayload = {
  content: string;
};

export async function createComment(postId: string, payload: CreateCommentPayload): Promise<Comment> {
  const token = useAuthStoreAdapter.getState().token;

  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await httpAdapter.post('/posts/[:postId]/comments', payload, {
    pathParams: { postId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return CommentResponseSchema.parse(response);
}
