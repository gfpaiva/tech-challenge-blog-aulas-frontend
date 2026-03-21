import { useEffect, useRef } from 'react';

import type { Post } from '../../types/post.type';
import { PostCard, PostCardSkeleton } from '../PostCard/PostCard';

type PublicPostsListProps = {
  posts: Post[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
};

export function PublicPostsList({ posts, hasNextPage, isFetchingNextPage, onLoadMore }: PublicPostsListProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore?.();
        }
      },
      { threshold: 0.1, rootMargin: '100px' },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <PostCard key={`${post.id}-${index}`} post={post} />
        ))}
      </div>

      {/* Intersection Observer Target */}
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={observerTarget} className="w-full py-8">
          {isFetchingNextPage && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full animate-pulse">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
