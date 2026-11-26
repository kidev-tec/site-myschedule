// @ts-check
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['.nuxt/', '.output/', 'node_modules/', 'dist/', 'coverage/', '.worktrees/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // DEPOIS do tseslint para que .vue use o vue-eslint-parser (com TS embutido)
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
        languageOptions: {
          parserOptions: { parser: tseslint.parser },
          // Auto-imports do Nuxt (composables do framework) + browser
          globals: {
            useHead: 'readonly',
            ref: 'readonly',
            computed: 'readonly',
            setInterval: 'readonly',
            clearInterval: 'readonly',
            setTimeout: 'readonly',
            clearTimeout: 'readonly',
            module: 'readonly',
            definePageMeta: 'readonly',
            navigateTo: 'readonly',
            useRoute: 'readonly',
            URLSearchParams: 'readonly',
            window: 'readonly',
          },
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
      },
    },
  },
  {
    files: ['stryker.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { module: 'readonly', require: 'readonly' },
    },
  },
  {
    rules: {
      // Páginas legais renderizam HTML gerado pelo parser próprio e sanitizado
      // (todo texto é escapado antes de qualquer tag) — ver utils/legalMarkdown.ts
      'vue/no-v-html': 'off',
      // Páginas file-based do Nuxt usam nomes de arquivo curtos por convenção
      'vue/multi-word-component-names': 'off',
    },
  },
)
