import { create } from 'zustand';
import { IToastPort, ToastMessage } from '@/common/ports/toast.port';

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useToastStore = create<IToastPort>((set) => {
  const addToast = (type: ToastMessage['type'], message: string, duration = 3000) => {
    const id = generateId();
    set((state) => ({
      toasts: [...state.toasts, { id, type, message, duration }],
    }));
  };

  return {
    toasts: [],
    success: (message, duration) => addToast('success', message, duration),
    error: (message, duration) => addToast('error', message, duration),
    info: (message, duration) => addToast('info', message, duration),
    warning: (message, duration) => addToast('warning', message, duration),
    remove: (id) =>
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      })),
  };
});
