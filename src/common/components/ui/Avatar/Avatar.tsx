import React from 'react';
import { cn } from '@/common/lib/utils';

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  initials?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-xl',
};

const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-xl',
};

export function Avatar({
  src,
  initials,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  className,
  ...props
}: AvatarProps) {
  return (
    <div className={cn('avatar', className)} {...props}>
      <div className={cn(sizeClasses[size], shapeClasses[shape], 'bg-neutral text-neutral-content')}>
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <span className="flex items-center justify-center w-full h-full font-medium">
            {initials || 'A'}
          </span>
        )}
      </div>
    </div>
  );
}
