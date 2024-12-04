import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import playformCompress from '@playform/compress'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import pagefind from 'astro-pagefind'
import { defineConfig } from 'astro/config'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives'
import remarkMath from 'remark-math'
import UnoCSS from 'unocss/astro'
import config from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: config.site.url,
  vite: {
    assetsInclude: ['**/*.{zip,jpg,jpeg,png,gif,webp,svg,bmp}'],
    build: {
      cssTarget: 'chrome61',
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
    vue(),
    UnoCSS({
      injectReset: true,
    }),
    pagefind(),
    playformCompress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      SVG: true,
    }),
    sitemap(),
  ],
})
