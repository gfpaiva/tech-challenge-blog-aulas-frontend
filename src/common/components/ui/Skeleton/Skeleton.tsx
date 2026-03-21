import React from 'react';

import { cn } from '@/common/lib/utils';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('skeleton', className)} {...props} />;
}
