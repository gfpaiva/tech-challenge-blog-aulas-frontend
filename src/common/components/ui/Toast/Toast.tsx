import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useEffect } from 'react';

import { cn } from '@/common/lib/utils';
import { ToastMessage } from '@/common/ports/toast.port';
import { useToastStore } from '@/infra/store/toast.adapter';

type ToastProps = {
  toast: ToastMessage;
};

export function Toast({ toast }: ToastProps) {
  const removeToast = useToastStore((state) => state.remove);

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, removeToast]);

  const alertClass = {
    info: 'alert-info',
    success: 'alert-success text-white',
    warning: 'alert-warning',
    error: 'alert-error text-white',
  }[toast.type];

  const Icon = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
  }[toast.type];

  return (
    <div className={cn('alert items-start shadow-lg', alertClass)}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <span className="flex-1 font-medium text-sm">{toast.message}</span>
      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
