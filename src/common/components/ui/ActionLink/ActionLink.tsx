import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/common/lib/utils';

type ActionLinkProps = Readonly<
  Omit<ComponentProps<typeof Link>, 'href'> & {
    href: string;
    text: string;
  }
>;

export function ActionLink({ href, text, className, ...props }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-2 text-primary font-bold hover:text-primary-focus transition-colors shrink-0 w-fit',
        className,
      )}
      {...props}
    >
      {text}
      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
