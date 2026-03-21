import { forwardRef, TextareaHTMLAttributes } from 'react';

import { cn } from '@/common/lib/utils';

export type TextareaProps = Readonly<
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean;
  }
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn('textarea textarea-bordered w-full', error && 'textarea-error', className)}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
