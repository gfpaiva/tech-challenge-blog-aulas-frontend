import { forwardRef, SelectHTMLAttributes } from 'react';

import { cn } from '@/common/lib/utils';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, error, children, ...props }, ref) => {
  return (
    <select ref={ref} className={cn('select select-bordered w-full', error && 'select-error', className)} {...props}>
      {children}
    </select>
  );
});

Select.displayName = 'Select';
