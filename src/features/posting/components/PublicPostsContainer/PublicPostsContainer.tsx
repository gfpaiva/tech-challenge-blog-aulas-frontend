'use client';

import { useState } from 'react';
import { usePublicPosts } from '../../hooks/usePublicPosts';
import { useSearchPosts } from '../../hooks/useSearchPosts';
import { PostSearchInput } from '../PostSearchInput/PostSearchInput';
import { PublicPostsList } from '../PublicPostsList/PublicPostsList';
import { SearchEmptyState } from '../SearchEmptyState/SearchEmptyState';
import type { GetPublicPostsResult } from '../../api/get-public-posts.api';
import { PostCard } from '../PostCard/PostCard';

type PublicPostsContainerProps = {
  initialData: GetPublicPostsResult;
};

export function PublicPostsContainer({ initialData }: PublicPostsContainerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Main infinite list
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = usePublicPosts(10, initialData);

  // Search results
  const {
    data: searchData,
    isFetching: isSearching
  } = useSearchPosts(searchQuery);

  const isSearchActive = searchQuery.trim().length >= 3;
  const flatInfinitePosts = infiniteData?.pages.flatMap(page => page.data) || [];

  return (
    <section className="py-12 bg-base-100 min-h-screen">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-base-200 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-base-content mb-3 tracking-tight">
              Aulas Publicadas
            </h1>
            <p className="text-base-content/70 max-w-2xl">
              Explore nossa biblioteca de aulas disponíveis. Utilize a busca para encontrar conteúdos específicos rapidamente.
            </p>
          </div>

          <div className="w-full md:w-auto mt-4 md:mt-0">
            <PostSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              isLoading={isSearching}
            />
          </div>
        </div>

        {/* View switching logic */}
        {isSearchActive ? (
          <div>
            <h3 className="text-lg font-medium text-base-content/60 mb-6">
              Resultados para "{searchQuery}"
            </h3>

            {searchData?.data.length === 0 && !isSearching ? (
              <SearchEmptyState query={searchQuery} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchData?.data.map((post) => (
                  <PostCard key={`search-${post.id}`} post={post} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <PublicPostsList
            posts={flatInfinitePosts}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        )}

      </div>
    </section>
  );
}
