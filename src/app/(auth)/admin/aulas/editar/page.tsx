import { Suspense } from "react";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { EditPostContainer } from "@/features/admin/posts/components/PostForm/EditPostContainer";
import { PostFormSkeleton } from "@/features/admin/posts/components/PostForm/PostForm";
import type { Metadata } from "next";
import { appRoutes } from "@/common/config/routes";

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
