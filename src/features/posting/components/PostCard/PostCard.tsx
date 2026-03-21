import { Calendar } from 'lucide-react';
import Link from 'next/link';

import { ActionLink } from '@/common/components/ui/ActionLink/ActionLink';
import { Skeleton } from '@/common/components/ui/Skeleton/Skeleton';
import { appRoutes } from '@/common/config/routes';

import type { Post } from '../../types/post.type';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="card bg-base-100 shadow-[0_0_0_1px_var(--fallback-b2,oklch(var(--b2)))] hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
      {/* Thumbnail Area */}
      <figure className="relative w-full aspect-[4/3] bg-base-200 m-0 p-0">
        {/* Category Badge absolutely positioned */}
        <div className="absolute top-4 left-4 z-10">
          <span className="badge badge-sm font-bold tracking-widest uppercase bg-base-100/90 text-primary border-none shadow-sm backdrop-blur-md">
            {post.category}
          </span>
        </div>

        {}
        <img
          src={post.thumbnailUrl}
          alt={`Capa da aula: ${post.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </figure>

      {/* Content Area */}
      <div className="card-body p-6 flex flex-col gap-0">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-base-content/60 mb-3 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishedAt}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="card-title text-xl font-bold font-serif text-base-content leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          <Link href={appRoutes.postDetail(post.id).path} className="focus:outline-none before:absolute before:inset-0">
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-base-content/70 line-clamp-3 mb-6 flex-grow-0">{post.summary}</p>

        {/* Footer (Author & Bookmark) */}
        <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-200/60 relative z-20 w-full">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {}
                <img
                  src={
                    post.authorConfig.avatarUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorConfig.name)}&background=random`
                  }
                  alt={post.authorConfig.name}
                />
              </div>
            </div>
            <span className="text-sm font-bold text-base-content">{post.authorConfig.name}</span>
          </div>
          <ActionLink href={appRoutes.postDetail(post.id).path} text="Ver mais" />
        </div>
      </div>
    </article>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-[0_0_0_1px_var(--fallback-b2,oklch(var(--b2)))] transition-all duration-300 overflow-hidden">
      {/* Thumbnail Area Skeleton */}
      <div className="relative w-full aspect-[4/3] m-0 p-0">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Content Area Skeleton */}
      <div className="card-body p-6 flex flex-col gap-0">
        {/* Metadata Skeleton */}
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-7 w-full mb-2" />
        <Skeleton className="h-7 w-3/4 mb-4" />

        {/* Summary Skeleton */}
        <div className="flex flex-col gap-2 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Footer Skeleton */}
        <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-200/60 w-full">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-24 font-bold" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
