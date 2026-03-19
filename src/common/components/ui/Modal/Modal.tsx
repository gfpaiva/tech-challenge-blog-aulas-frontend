import React from 'react';
import { cn } from '@/common/lib/utils';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  className,
  hideCloseButton = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <dialog className={cn('modal modal-open')} open>
      <div className={cn('modal-box', className)}>
        {!hideCloseButton && (
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </form>
        )}

        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}

        <div className="py-2">{children}</div>

        {actions && (
          <div className="modal-action mt-6 gap-2">
            {actions}
          </div>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
