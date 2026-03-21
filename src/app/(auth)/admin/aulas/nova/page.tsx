import type { Metadata } from 'next';
import { Suspense } from 'react';

import { appRoutes } from '@/common/config/routes';
import { CreatePostContainer } from '@/features/admin/posts/components/PostForm/CreatePostContainer';
import { PostFormSkeleton } from '@/features/admin/posts/components/PostForm/PostForm';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

export const metadata: Metadata = {
  title: appRoutes.createPost.title,
  description: appRoutes.createPost.description,
};

export default function CreatePostPage() {
  return (
    <ProtectedRoute role="PROFESSOR">
      <div className="flex justify-center p-4">
        <Suspense fallback={<PostFormSkeleton />}>
          <CreatePostContainer />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
