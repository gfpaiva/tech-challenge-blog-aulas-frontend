'use client';

import { useTheme } from '@/common/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme, isHydrated } = useTheme();

  if (!isHydrated) {
    return (
      <button className="btn btn-ghost btn-circle" aria-label="Carregando tema">
        <span className="loading loading-spinner loading-xs text-primary"></span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle hover:bg-base-200 hover:scale-105 transition-all"
      aria-label="Alternar tema"
    >
      {theme === 'blog' ? (
        <Moon className="w-5 h-5 text-base-content" />
      ) : (
        <Sun className="w-5 h-5 text-base-content" />
      )}
    </button>
  );
}
