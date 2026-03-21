import type { Metadata } from 'next';
import { Suspense } from 'react';

import { appRoutes } from '@/common/config/routes';
import { EditPostContainer } from '@/features/admin/posts/components/PostForm/EditPostContainer';
import { PostFormSkeleton } from '@/features/admin/posts/components/PostForm/PostForm';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

export const metadata: Metadata = {
  title: appRoutes.editPost('').title,
  description: appRoutes.editPost('').description,
};

export default function EditPostPage() {
  return (
    <ProtectedRoute role="PROFESSOR">
      <div className="flex justify-center p-4">
        <Suspense fallback={<PostFormSkeleton />}>
          <EditPostContainer />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
