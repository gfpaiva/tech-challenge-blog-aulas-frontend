import { Suspense } from "react";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { AdminDashboardView, AdminDashboardSkeleton } from "@/features/admin/posts/components/AdminDashboardView";
import { appRoutes } from "@/common/config/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: appRoutes.adminDashboard.title,
  description: appRoutes.adminDashboard.description,
};

export default function AdminDashboard() {
  return (
    <ProtectedRoute role="PROFESSOR">
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <AdminDashboardView />
      </Suspense>
    </ProtectedRoute>
  );
}