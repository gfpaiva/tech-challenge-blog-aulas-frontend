import { Suspense } from "react";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { CreatePostForm, CreatePostFormSkeleton } from "@/features/admin/posts/components/CreatePostForm/CreatePostForm";
import { appRoutes } from "@/common/config/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: appRoutes.createPost.title,
  description: appRoutes.createPost.description,
};

export default function CreatePostPage() {
  return (
    <ProtectedRoute role="PROFESSOR">
      <div className="flex justify-center p-4">
        <Suspense fallback={<CreatePostFormSkeleton />}>
          <CreatePostForm />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
