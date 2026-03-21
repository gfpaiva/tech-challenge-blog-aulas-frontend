import React from 'react';

import { cn } from '@/common/lib/utils';

export type SkeletonProps = Readonly<React.HTMLAttributes<HTMLDivElement>>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('skeleton', className)} {...props} />;
}
