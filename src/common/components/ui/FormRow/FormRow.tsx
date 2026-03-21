import { ReactNode } from 'react';

import { cn } from '@/common/lib/utils';

type FormRowProps = Readonly<{
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}>;

export const FormRow = ({ label, error, className, children }: FormRowProps) => {
  return (
    <div className={cn('fieldset w-full', className)}>
      <legend className="fieldset-legend text-base font-semibold">{label}</legend>
      {children}
      {error && <p className="fieldset-label text-error mt-1">{error}</p>}
    </div>
  );
};
