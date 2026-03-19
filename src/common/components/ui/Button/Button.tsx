import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/common/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isCircle?: boolean;
}

const variantStyles = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  link: 'btn-link',
  outline: 'btn-outline',
} as const;

const sizeStyles = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
} as const;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isCircle = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        variantStyles[variant],
        sizeStyles[size],
        isCircle && 'btn-circle',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
