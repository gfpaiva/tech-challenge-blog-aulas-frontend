import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isCircle?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isCircle = false,
  className = '', 
  ...props 
}: ButtonProps) {
  const variantClass = variant === 'primary' ? 'btn-primary' :
                       variant === 'secondary' ? 'btn-secondary' :
                       variant === 'accent' ? 'btn-accent' :
                       variant === 'ghost' ? 'btn-ghost' :
                       'btn-link';
                       
  const sizeClass = size === 'sm' ? 'btn-sm' :
                    size === 'lg' ? 'btn-lg' : '';
                    
  const circleClass = isCircle ? 'btn-circle' : '';

  return (
    <button 
      className={`btn ${variantClass} ${sizeClass} ${circleClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
