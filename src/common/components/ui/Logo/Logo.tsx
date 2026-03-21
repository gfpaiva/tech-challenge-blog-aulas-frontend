import Image from 'next/image';
import Link from 'next/link';

import { appRoutes } from '@/common/config/routes';
import { cn } from '@/common/lib/utils';

type LogoProps = Readonly<{
  className?: string;
}>;

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href={appRoutes.home.path}
      className={cn('flex items-center gap-2 hover:opacity-80 transition-opacity', className)}
    >
      <div className="relative w-9 h-9 flex items-center justify-center overflow-hidden">
        <Image src="/logo.png" alt="Blog Aulas" width={32} height={32} />
      </div>
      <span className="text-xl font-bold font-serif text-base-content tracking-tight">Blog Aulas</span>
    </Link>
  );
}
