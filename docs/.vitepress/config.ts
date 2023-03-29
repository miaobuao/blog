import { getThemeConfig, defineConfig } from '@sugarat/theme/node'

const blogTheme = getThemeConfig({
  // 文章默认作者
  author: '喵不嗷',
  // 友链
  friend: [
    {
      nickname: '喵不嗷',
      des: 'TO BE A GEEK :)',
      avatar:
        '/avatar.png',
      url: '/about'
    },
    {
      nickname: 'IDIM',
      des: '次元澡堂',
      avatar:
        'https://idim.cc/favicon.svg',
      url: 'https://idim.cc'
    },
  ],
  comment: {
    repo: "miaobuao/miaobuao.github.io",
    repoId: "R_kgDOJONNeg",
    category: "Ideas",
    categoryId: "DIC_kwDOJONNes4CVJhx",
    mapping: "title",
    // lang: 'zh-CN',
    loading: 'lazy',
    inputPosition: 'top',
  },
  // 开启离线的全文搜索支持（如构建报错可注释下面的配置再次尝试）
  search: 'pagefind',
})

export default defineConfig({
  markdown: {
    lineNumbers: true,
    config: (md)=>{
      md
      .use(require("markdown-it-mathjax3"))
      .use(require("markdown-it-footnote"))
      // .use(require("markdown-it-implicit-figures"), {
      //   figcaption: true,
      //   lazyLoading: true
      // })
    }
  }, 
  ignoreDeadLinks: true,
  extends: blogTheme,
  lang: 'zh-cmn-Hans',
  title: 'Meo\'s Blog',
  description: '喵不嗷的小博客',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      exclude: ['@sugarat/theme']
    }
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新于',
    footer: {
      // message: '@miaobuao',9
      copyright:
        '欢迎关注 | <a target="_blank" href="https://github.com/miaobuao"> @miaobuao </a>'
    },
    logo: 'https://avatars.githubusercontent.com/miaobuao',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/miaobuao'
      }
    ]
  }
})
