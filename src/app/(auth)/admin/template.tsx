'use client';

import { AdminHeader } from '@/features/admin/posts/components/AdminHeader/AdminHeader';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <AdminHeader />
      {children}
    </div>
  );
}
