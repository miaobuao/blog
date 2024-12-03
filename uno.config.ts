import { defineConfig, presetAttributify, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import { presetScrollbarHide } from 'unocss-preset-scrollbar-hide'
import daisyuiThemes from 'daisyui/src/theming/themes'

export default defineConfig({
  presets: [
    presetUno(),
    presetDaisy({
      themes: [
        {
          lofi: {
            ...daisyuiThemes['[data-theme=lofi]'],
            primary: daisyuiThemes['[data-theme=light]'].primary,
          },
        },
        {
          black: {
            ...daisyuiThemes['[data-theme=black]'],
            primary: daisyuiThemes['[data-theme=dark]'].primary,
          },
        },
      ],
      darkTheme: 'black',
    }),
    presetScrollbarHide(),
    presetAttributify(),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
