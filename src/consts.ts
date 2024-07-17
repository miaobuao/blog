import { defineThemeConfig } from './theme/lib/config'

const config = defineThemeConfig({
  site: {
    title: `Meo's Blog`,
    description: 'Welcome to my blog!',
    locale: 'zh-CN',
    url: 'https://yangqiuyi.com',
  },
  author: {
    name: '@杨秋逸',
    email: 'miaobuao@outlook.com',
    signature: 'To Be A Geek :)',
    avatar: {
      url: 'https://avatars.githubusercontent.com/u/62047803?v=4',
      alt: '杨',
    },
  },
})

export default config
