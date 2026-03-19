'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/common/lib/utils';

type NavLinkProps = {
  href: string;
  text: string;
  hasActiveHighlight?: boolean;
  className?: string;
  activeClassName?: string;
}

export function NavLink({
  href,
  text,
  hasActiveHighlight = true,
  className,
  activeClassName = 'text-primary font-bold'
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = hasActiveHighlight ? (pathname ? (pathname === href || (href !== '/' && pathname.startsWith(href))) : false) : false;

  return (
    <Link
      href={href}
      className={cn(
        'text-sm transition-colors',
        isActive
          ? activeClassName
          : 'font-medium text-base-content/80 hover:text-primary',
        className
      )}
    >
      {text}
    </Link>
  );
}
