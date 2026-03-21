import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/common/**', 'src/features/**'],
      exclude: [
        '**/*.stories.*', 
        '**/*.test.*', 
        '**/types/**', 
        '**/ports/**', 
        '**/api/**', 
        '**/index.ts',
        '**/*.d.ts'
      ],
      reporter: ['text', 'html'],
    }
  },
});
