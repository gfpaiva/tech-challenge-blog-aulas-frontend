import { httpAdapter } from '@/infra/http/fetch.adapter';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

import { CreatePostRequest, CreatePostResponse } from '../types/create-post.type';

export const createPost = async (payload: CreatePostRequest): Promise<CreatePostResponse> => {
  const token = useAuthStoreAdapter.getState().token;

  return httpAdapter.post<CreatePostResponse, CreatePostRequest>('/posts', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
