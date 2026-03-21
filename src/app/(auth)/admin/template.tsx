'use client';

import { AdminHeader } from '@/features/admin/posts/components/AdminHeader/AdminHeader';

type TemplateProps = Readonly<{
  children: React.ReactNode;
}>;

export default function Template({ children }: TemplateProps) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <AdminHeader />
      {children}
    </div>
  );
}
