import antfu from '@antfu/eslint-config'

export default antfu({
  // formatters: true,
  react: true,
  astro: true,
  markdown: false,
  rules: {
    'react/prefer-destructuring-assignment': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-vars': 'warn',
  },
}, {
  files: ['./src/**/*.astro'],
  rules: {
    'style/max-statements-per-line': 'off',
  },
})
