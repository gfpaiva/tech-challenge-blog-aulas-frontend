import type { Metadata } from 'next';

import { appRoutes } from '@/common/config/routes';
import { Hero } from '@/features/home/components/Hero/Hero';
import { getPublicPosts } from '@/features/posting/api/get-public-posts.api';
import { LatestPosts } from '@/features/posting/components/LatestPosts/LatestPosts';

export const metadata: Metadata = {
  title: appRoutes.home.title,
  description: appRoutes.home.description,
};

export default async function Home() {
  const initialData = await getPublicPosts({ page: 1, limit: 3 });

  return (
    <div className="flex flex-col w-full flex-1">
      <Hero />
      <LatestPosts posts={initialData.data} />
    </div>
  );
}
