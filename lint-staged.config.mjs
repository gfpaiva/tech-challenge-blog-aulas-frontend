import path from 'path';

const buildEslintCommand = (filenames) => {
  return `pnpm eslint ${filenames
    .filter((f) => f.includes('/src/'))
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} --fix`;
};

const config = {
  '*.{ts,tsx}': [buildEslintCommand, "bash -c 'pnpm tsc --noEmit'"],
  '*': ['prettier --write --ignore-unknown'],
};

export default config;
