import Link from 'next/link';

interface NavLinkProps {
  href: string;
  text: string;
  className?: string;
}

export function NavLink({ href, text, className = '' }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className={`text-sm font-medium text-base-content/80 hover:text-primary transition-colors ${className}`}
    >
      {text}
    </Link>
  );
}
