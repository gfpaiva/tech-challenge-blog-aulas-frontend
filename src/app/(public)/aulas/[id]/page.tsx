import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { appRoutes } from '@/common/config/routes';
import { getPostComments } from '@/features/posting/api/get-post-comments.api';
import { getPostDetail } from '@/features/posting/api/get-post-detail.api';
import { getPublicPosts } from '@/features/posting/api/get-public-posts.api';
import { CommentsSection } from '@/features/posting/components/CommentsSection/CommentsSection';
import { PostContent } from '@/features/posting/components/PostContent/PostContent';
import { PostDetailHero } from '@/features/posting/components/PostDetailHero/PostDetailHero';

type PageProps = {
  params: Promise<{ id: string }>;
};

// Generate static params from all existing published posts
export async function generateStaticParams() {
  const { data } = await getPublicPosts({ page: 1, limit: 100 });
  return data.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await getPostDetail(id);
    return {
      title: `${post.title} | Blog Aulas`,
      description: post.summary,
    };
  } catch {
    const route = appRoutes.postDetail(id);
    return {
      title: route.title,
      description: route.description,
    };
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;

  let post;
  let comments;

  try {
    [post, comments] = await Promise.all([getPostDetail(id), getPostComments(id)]);
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Hero with vignette */}
      <PostDetailHero post={post} />

      {/* Article body */}
      <PostContent content={post.content} />

      {/* Comments section — client component */}
      <CommentsSection postId={post.id} initialComments={comments} />
    </div>
  );
}
