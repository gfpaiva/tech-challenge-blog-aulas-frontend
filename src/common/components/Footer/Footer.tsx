import Link from 'next/link';

import { appRoutes } from '@/common/config/routes';

import { NavLink } from '../ui/NavLink/NavLink';

export function Footer() {
  return (
    <footer className="bg-base-300 text-base-content border-t border-base-200">
      {/* Main Footer Content */}
      <div className="footer p-10 container mx-auto">
        {/* Brand Column */}
        <aside className="max-w-xs">
          <Link href={appRoutes.home.path} className="flex items-center gap-2 hover:opacity-80 transition-opacity mb-2">
            <span className="text-2xl font-bold font-serif text-base-content tracking-tight">Blog Aulas</span>
          </Link>
          <p className="opacity-70 text-sm">
            Plataforma educacional focada em compartilhar conhecimento de qualidade entre professores e alunos.
          </p>
        </aside>

        {/* Links - Plataforma */}
        <nav>
          <h6 className="footer-title">Plataforma</h6>
          <NavLink href={appRoutes.home.path} text="Início" hasActiveHighlight={false} className="link link-hover" />
          <NavLink href={appRoutes.posts.path} text="Aulas" hasActiveHighlight={false} className="link link-hover" />
        </nav>
      </div>

      {/* Bottom Footer */}
      <div className="footer footer-center p-4 border-t border-base-200 text-base-content/70 text-xs">
        <aside className="w-full flex flex-col md:flex-row items-center justify-between container mx-auto">
          <p>© {new Date().getFullYear()} Blog Aulas. Feito com ❤️ por Guilherme Paiva</p>
        </aside>
      </div>
    </footer>
  );
}
