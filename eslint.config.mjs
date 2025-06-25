// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import mantine from 'eslint-config-mantine';

// TODO Fix react hooks dependency check

export default tseslint.config(
  ...mantine,
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintConfigPrettier,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'] },
);
