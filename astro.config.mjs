import { defineConfig } from 'astro/config'
import pagefind from 'astro-pagefind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import playformCompress from '@playform/compress'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import vue from '@astrojs/vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import config from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: config.site.url,
  vite: {
    assetsInclude: ['**/*.{zip,jpg,jpeg,png,gif,webp,svg,bmp}'],
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      wrap: true,
      transformers: [transformerColorizedBrackets()],
    },
    remarkPlugins: [
      remarkDirective,
      remarkGithubAdmonitionsToDirectives,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutoLinkHeadings, { behavior: 'wrap' }],
      rehypeSlug,
      [rehypeKatex, { output: 'mathml' }],
    ],
  },
  integrations: [
    mdx(),
    sitemap(),
    playformCompress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      SVG: true,
    }),
    vue(),
    pagefind(),
  ],
})
