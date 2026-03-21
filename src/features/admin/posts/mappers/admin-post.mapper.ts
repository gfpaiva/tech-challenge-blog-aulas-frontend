import { z } from 'zod';

import { AdminPost, AdminPostResponse } from '../types/admin-post.type';

export const AuthorSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  role: z.string(),
});

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const PostSchema = z
  .object({
    id: z.uuid(),
    title: z.string(),
    content: z.string(),
    author: AuthorSchema,
    category: CategorySchema,
    creationDate: z.iso.datetime(),
    updateDate: z.iso.datetime(),
  })
  .transform(
    (post): AdminPost => ({
      id: post.id,
      title: post.title,
      subject: post.category.name,
      date: new Date(post.creationDate).toLocaleDateString('pt-BR'),
    }),
  );

export const AdminPostResponseSchema = z.object({
  data: z.array(PostSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    lastPage: z.number(),
  }),
});

export class AdminPostMapper {
  static toViewModel(data: unknown): AdminPostResponse {
    return AdminPostResponseSchema.parse(data);
  }
}
