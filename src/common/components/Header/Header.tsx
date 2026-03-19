import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { NavLink } from '../ui/NavLink/NavLink';
import { Logo } from '../ui/Logo/Logo';
import { appRoutes } from '@/common/config/routes';

export function Header() {
  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-200 px-4 sm:px-8">
      <div className="navbar-start">
        {/* Logo */}
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        {/* Navigation - Desktop */}
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><NavLink href={appRoutes.home.path} text="Início" className="hover:bg-transparent" /></li>
          <li><NavLink href={appRoutes.posts.path} text="Artigos" className="hover:bg-transparent" /></li>
          <li><NavLink href={appRoutes.disciplinas.path} text="Disciplinas" className="hover:bg-transparent" /></li>
        </ul>
      </div>

      <div className="navbar-end flex gap-2 sm:gap-4">
        {/* Actions */}
        <Link
          href={appRoutes.adminDashboard.path}
          className="hidden sm:inline-flex text-sm font-semibold text-primary hover:text-primary-focus hover:-translate-y-0.5 transition-all"
        >
          Área Docente
        </Link>
        <div className="w-px h-6 bg-base-200 hidden sm:block mx-1"></div>
        <ThemeToggle />
      </div>
    </div>
  );
}
