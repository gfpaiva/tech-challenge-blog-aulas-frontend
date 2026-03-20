import type { Metadata } from 'next';
import { appRoutes } from '@/common/config/routes';
import { getPublicPosts } from '@/features/posting/api/get-public-posts.api';
import { PublicPostsContainer } from '@/features/posting/components/PublicPostsContainer/PublicPostsContainer';

export const metadata: Metadata = {
  title: appRoutes.posts.title,
  description: appRoutes.posts.description,
};

export default async function PublicPostsPage() {
  const initialData = await getPublicPosts({ page: 1, limit: 10 });

  return (
    <div className="flex flex-col flex-1 w-full">
      <PublicPostsContainer initialData={initialData} />
    </div>
  );
}