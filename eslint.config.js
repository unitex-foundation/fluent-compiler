// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import { globalIgnores, defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';

function getConfigForSubdir(dirName) {
  const files = (() => {
    if (dirName === undefined) {
      return ['./**/*.{js,mjs,cjs,ts,mts,cts,d.ts}'];
    } else {
      return [`${dirName}/**/*.{js,mjs,cjs,ts,mts,cts,d.ts}`];
    }
  })();
  const project = (() => {
    if (dirName === undefined) {
      return 'tsconfig.json';
    } else {
      return `${dirName}/tsconfig.json`;
    }
  })();
  return {
    files,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.es2025,
        ...globals.node,
      },
    },
    settings: {
      'import/resolver': {
        typescript: { project },
      },
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      // stylistic.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    plugins: {
      '@stylistic': stylistic,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'prefer-promise-reject-errors': 'off',
      'no-empty': 'warn',
      'curly': ['warn', 'multi-line', 'consistent'],
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'no-restricted-imports': ['error', { patterns: ['.*'] }],
      'object-shorthand': ['warn', 'always', { avoidQuotes: true }],
      'arrow-body-style': ['warn', 'as-needed'],

      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      'no-constant-condition': ['warn', { checkLoops: false }],

      '@stylistic/eol-last': 'warn',
      '@stylistic/no-multiple-empty-lines': [
        'warn',
        { max: 1, maxEOF: 1, maxBOF: 0 },
      ],
      '@stylistic/no-trailing-spaces': 'warn',
      '@stylistic/linebreak-style': ['warn', 'unix'],
      '@stylistic/quote-props': ['warn', 'consistent-as-needed'],

      // TODO: constraints should be improved
      // '@stylistic/lines-between-class-members': [
      //   'warn',
      //   { enforce: [{ blankLine: 'always', prev: '*', next: '*' }] },
      //   { exceptAfterSingleLine: true },
      // ],
      '@stylistic/lines-between-class-members': 'off',

      '@stylistic/padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: '*',
          next: ['function', 'class', 'interface'],
        },
        {
          blankLine: 'always',
          prev: ['function', 'class', 'interface'],
          next: '*',
        },
        {
          blankLine: 'never',
          prev: ['function-overload'],
          next: ['function', 'function-overload'],
        },
      ],
      '@stylistic/no-multi-spaces': 'warn',
      '@stylistic/no-mixed-spaces-and-tabs': 'warn',
      '@stylistic/no-extra-semi': 'warn',

      // TODO: conflicts with prettier
      // '@stylistic/no-confusing-arrow': 'warn',

      '@stylistic/no-floating-decimal': 'warn',
      '@stylistic/no-tabs': 'warn',
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/padded-blocks': ['warn', 'never'],

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',

      // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
      // does not work with type definitions
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/no-empty-object-type': 'off',

      // this rule, if on, would require explicit return type on the `render` function
      '@typescript-eslint/explicit-function-return-type': 'off',

      // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
      '@typescript-eslint/no-var-requires': 'off',

      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/no-empty-interface': 'off',

      '@typescript-eslint/require-await': 'off', // TODO: investigate usability
      '@typescript-eslint/restrict-template-expressions': 'off', // TODO: investigate usability
      '@typescript-eslint/no-redundant-type-constituents': 'off', // TODO: investigate usability
      '@typescript-eslint/no-base-to-string': 'off', // TODO: investigate usability
      '@typescript-eslint/no-floating-promises': 'off', // TODO: investigate usability
      '@typescript-eslint/await-thenable': 'off', // TODO: investigate usability
      '@typescript-eslint/no-duplicate-type-constituents': 'off', // TODO: investigate usability
      '@typescript-eslint/no-misused-promises': 'off', // TODO: investigate usability
      '@typescript-eslint/prefer-promise-reject-errors': 'off', // TODO: investigate usability

      'import/default': 'off',
      'import/order': ['off', { 'newlines-between': 'never' }], // enabled in `yarn lint`
      'import/no-mutable-exports': 'error',
      'import/no-unused-modules': 'off', // use `unused-imports` instead
      'import/first': 'error',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-unresolved': ['error', { caseSensitive: false }],
      'import/no-absolute-path': 'error',
      'import/no-relative-packages': 'error',
      'import/no-cycle': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',

      'unused-imports/no-unused-imports': 'warn',
    },
  };
}

export default defineConfig(
  globalIgnores([
    // Common
    '**/.DS_Store',
    '**/.thumbs.db',
    // Git
    '.git',
    // Node
    'node_modules',
    // Yarn
    '.yarn',
    'yarn.lock',
    // Build
    'dist',
    // ESLint cache
    '.eslintcache',
    // Temp
    'temp',
    // Log files
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    // Editor directories and files
    '.idea',
    '*.suo',
    '*.ntvs*',
    '*.njsproj',
    '*.sln',
    '*.code-workspace',
    // Licenses
    'third_party_licenses',
  ]),
  getConfigForSubdir(),
);
