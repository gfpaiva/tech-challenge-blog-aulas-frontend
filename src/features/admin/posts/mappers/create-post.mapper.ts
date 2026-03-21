import { z } from 'zod';

import { CreatePostRequest } from '../types/create-post.type';

export const CreatePostSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório').max(100, 'O título não pode exceder 100 caracteres'),
  categoryId: z.coerce.number().min(1, 'A categoria é obrigatória'),
  content: z.string().min(1, 'O conteúdo é obrigatório'),
});

export type CreatePostFormData = z.infer<typeof CreatePostSchema>;

export class CreatePostMapper {
  static toPayload(data: CreatePostFormData): CreatePostRequest {
    return {
      title: data.title,
      categoryId: data.categoryId,
      content: data.content,
    };
  }
}
