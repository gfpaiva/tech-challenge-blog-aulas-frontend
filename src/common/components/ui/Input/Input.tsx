import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/common/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
  return (
    <input ref={ref} className={cn('input input-bordered w-full', error && 'input-error', className)} {...props} />
  );
});

Input.displayName = 'Input';
