export interface IThemePort {
  theme: 'blog' | 'dark';
  setTheme: (theme: 'blog' | 'dark') => void;
  toggleTheme: () => void;
}
