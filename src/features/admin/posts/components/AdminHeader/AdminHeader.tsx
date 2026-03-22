import { LogOut } from 'lucide-react';

import { Avatar } from '@/common/components/ui/Avatar';
import { Logo } from '@/common/components/ui/Logo/Logo';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';

export function AdminHeader() {
  const { user } = useAuthStoreAdapter();
  const { logout } = useLogin();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-base-100 border-b border-base-200 gap-4 shrink-0">
      <Logo />
      <div className="flex items-center gap-4">
        <div className="text-right flex flex-col justify-center">
          <span className="text-sm font-semibold text-base-content leading-none">{user?.name || 'Admin'}</span>
          <span className="text-xs text-base-content/60 leading-tight mt-0.5">{user?.email || 'admin@blog.com'}</span>
        </div>
        <Avatar initials={user?.name ? user.name.slice(0, 2).toUpperCase() : 'A'} />
        <div className="hidden md:flex">
          <div className="w-px h-6 bg-base-300 mx-2"></div>
          <div className="tooltip tooltip-bottom" data-tip="Sair">
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-error hover:bg-error/10 transition-colors"
              aria-label="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
