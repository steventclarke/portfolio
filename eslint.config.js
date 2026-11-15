import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      '.astro',
      'public',
      'infrastructure',
      'astro.config.mjs',
      '.github',
      'src/content/.obsidian',
      'src/content/.trash',
      'src/content/_attachments',
    ],
  },
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },
];
