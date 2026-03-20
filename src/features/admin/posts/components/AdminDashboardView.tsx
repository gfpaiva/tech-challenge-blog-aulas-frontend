'use client';

import React from 'react';
import { useAdminPosts } from '../hooks/useAdminPosts';
import { AdminHeader } from './AdminHeader';
import { SearchInput } from './SearchInput';
import { AdminPostsTable, AdminPostsTableSkeleton } from './AdminPostsTable';
import { Skeleton } from '@/common/components/ui/Skeleton';

export function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <header className="navbar bg-base-100 border-b border-base-200 justify-end px-6">
        <Skeleton className="h-10 w-48" />
      </header>
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4 border-b border-base-200">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-12 w-full max-w-sm" />
          </div>
          <AdminPostsTableSkeleton />
        </div>
      </main>
    </div>
  );
}

export function AdminDashboardView() {
  const { isLoading } = useAdminPosts();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <AdminHeader />

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden">
          {/* Top Control Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4 border-b border-base-200">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-base-content mb-1">Aulas</h2>
              <p className="text-sm text-base-content/60">Gerencie, edite ou exclua o conteúdo publicado.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <SearchInput />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-base-100">
            {isLoading ? (
              <AdminPostsTableSkeleton />
            ) : (
              <AdminPostsTable />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
