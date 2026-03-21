import nextConfig from 'eslint-config-next';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  ...nextConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            { target: './src/features', from: './src/app' },
            { target: ['./src/common', './src/infra'], from: ['./src/features', './src/app'] },
          ],
        },
      ],
      'import/no-cycle': 'error',
      'linebreak-style': ['error', 'unix'],
      'react/prop-types': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },

  {
    ignores: [
      'node_modules',
      'public',
      'generators',
      '.next',
      'out',
      'dist',
      'coverage',
      'storybook-static',
      'commitlint.config.js',
      'eslint.config.mjs',
      'jest.config.js',
    ],
  },
];
