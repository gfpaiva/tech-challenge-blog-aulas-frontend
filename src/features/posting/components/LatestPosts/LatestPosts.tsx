import { PostCard } from '../PostCard/PostCard';
import type { Post } from '../../types/post.type';
import { ActionLink } from '@/common/components/ui/ActionLink/ActionLink';
import { appRoutes } from '@/common/config/routes';

export function LatestPosts({ posts }: { posts: Post[] }) {
  return (
    <section id="aulas" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 border-b border-base-200 pb-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-base-content mb-2 tracking-tight">
              Últimas Aulas
            </h2>
          </div>

          <ActionLink href={appRoutes.posts.path} text="Ver todas" />
        </div>

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </section>
  );
}
