import { z } from 'zod';
import type { Post, PostDetail, Comment } from '../types/post.type';

// Helper to determine loremflickr category keyword
const getCategoryKeyword = (categoryId: number, categoryName: string): string => {
  if (categoryId === 1 || categoryName.toLowerCase().includes('português')) return 'literature';
  if (categoryId === 2 || categoryName.toLowerCase().includes('matemática')) return 'math_class';
  return 'education'; // fallback
};

const BasePostResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string().optional(),
  }),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  creationDate: z.string(),
  updateDate: z.string(),
});

type BasePostRaw = z.infer<typeof BasePostResponseSchema>;

const mapBasePost = (item: BasePostRaw, imageSize: string) => {
  const summary = item.content.length > 120 ? item.content.substring(0, 120) + '...' : item.content;
  
  const publishedAt = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(item.creationDate));

  const categoryKeyword = getCategoryKeyword(item.category.id, item.category.name);
  const thumbnailUrl = `https://loremflickr.com/${imageSize}/${categoryKeyword}?lock=${item.id}`;

  return {
    id: item.id,
    title: item.title,
    summary,
    category: item.category.name,
    publishedAt,
    readTimeMin: Math.max(1, Math.ceil(item.content.split(' ').length / 200)),
    authorConfig: {
      name: item.author.name,
      role: item.author.role,
    },
    thumbnailUrl,
  };
};

export const PostResponseSchema = BasePostResponseSchema.transform((item): Post => {
  return mapBasePost(item, '800/600');
});

export const PostDetailResponseSchema = BasePostResponseSchema.transform((item): PostDetail => {
  return {
    ...mapBasePost(item, '1200/600'),
    content: item.content,
  };
});

export const PaginatedPostsResponseSchema = z.object({
  data: z.array(PostResponseSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    lastPage: z.number(),
  }),
});

export type PostResponse = z.infer<typeof PostResponseSchema>;
export type PaginatedPostsResponse = z.infer<typeof PaginatedPostsResponseSchema>;

export const CommentResponseSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.object({
    name: z.string(),
    role: z.string().optional(),
  }),
  creationDate: z.string(),
}).transform((item): Comment => {
  const publishedAt = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(item.creationDate));

  return {
    id: item.id,
    content: item.content,
    authorName: item.author.name,
    publishedAt,
  };
});

export const CommentsListResponseSchema = z.array(CommentResponseSchema);

export type PostDetailResponse = z.infer<typeof PostDetailResponseSchema>;
export type CommentResponse = z.infer<typeof CommentResponseSchema>;

/**
 * Comment Form Validation Schema
 */
export const commentFormSchema = z.object({
  content: z
    .string()
    .min(3, 'O comentário deve ter pelo menos 3 caracteres.')
    .max(1000, 'O comentário deve ter no máximo 1000 caracteres.'),
});

export type CommentFormValues = z.infer<typeof commentFormSchema>;

export class PostMapper {
  static toDomain(data: unknown): PaginatedPostsResponse {
    return PaginatedPostsResponseSchema.parse(data);
  }

  static toDetail(data: unknown): PostDetail {
    return PostDetailResponseSchema.parse(data);
  }

  static toComments(data: unknown): Comment[] {
    return CommentsListResponseSchema.parse(data);
  }
}
