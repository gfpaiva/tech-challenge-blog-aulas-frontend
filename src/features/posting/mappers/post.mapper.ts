import { z } from 'zod';
import type { Post } from '../types/post.type';

// Helper to determine loremflickr category keyword
const getCategoryKeyword = (categoryId: number, categoryName: string): string => {
  if (categoryId === 1 || categoryName.toLowerCase().includes('português')) return 'literature';
  if (categoryId === 2 || categoryName.toLowerCase().includes('matemática')) return 'math_class';
  return 'education'; // fallback
};

export const PostResponseSchema = z.object({
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
}).transform((item): Post => {
  // Simple summary extraction
  const summary = item.content.length > 120 ? item.content.substring(0, 120) + '...' : item.content;
  
  // Format Date (pt-BR)
  const publishedAt = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(item.creationDate));

  // Dynamic Thumbnail based on Category
  const categoryKeyword = getCategoryKeyword(item.category.id, item.category.name);
  const thumbnailUrl = `https://loremflickr.com/800/600/${categoryKeyword}?lock=${item.id}`;

  return {
    id: item.id,
    title: item.title,
    summary,
    category: item.category.name,
    publishedAt,
    readTimeMin: Math.max(1, Math.ceil(item.content.split(' ').length / 200)),
    authorConfig: {
      name: item.author.name,
    },
    thumbnailUrl,
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

export class PostMapper {
  static toDomain(data: unknown): PaginatedPostsResponse {
    return PaginatedPostsResponseSchema.parse(data);
  }
}
