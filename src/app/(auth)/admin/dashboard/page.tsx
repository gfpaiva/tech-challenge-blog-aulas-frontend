import { Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { appRoutes } from '@/common/config/routes';
import {
  AdminDashboardView,
  AdminDashboardSkeleton,
} from '@/features/admin/posts/components/AdminDashboardView/AdminDashboardView';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

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

      <Link
        href={appRoutes.createPost.path}
        className="btn btn-primary btn-circle fixed bottom-8 right-8 shadow-lg w-14 h-14"
        aria-label="Criar nova aula"
      >
        <Plus size={24} />
      </Link>
    </ProtectedRoute>
  );
}
