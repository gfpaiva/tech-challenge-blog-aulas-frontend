'use client';

import { useToastStore } from '@/infra/store/toast.adapter';

import { Toast } from './Toast';

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="toast toast-top toast-end z-[9999]">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
