/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: '',
  theme: ['light', 'dark'],
  daisyui: {
    themes: [
      {
        lofi: {
          ...require('daisyui/src/theming/themes').lofi,
          primary: require('daisyui/src/theming/themes').light.primary,
        },
      },
      {
        black: {
          ...require('daisyui/src/theming/themes').black,
          primary: require('daisyui/src/theming/themes').dark.primary,
        },
      },
    ],
    darkTheme: 'black',
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
