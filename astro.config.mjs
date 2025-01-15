import theme from '@meo/astro-blog-theme'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://yangqiuyi.com',
	integrations: [
		theme({
			site: {
				title: `杨秋逸的博客`,
				description: '这是杨秋逸的博客!',
				locale: 'zh-CN',
				url: 'https://yangqiuyi.com',
			},
			author: {
				name: '杨秋逸',
				email: 'miaobuao@outlook.com',
				signature: 'To Be A Geek :)',
				avatar: {
					url: 'https://avatars.githubusercontent.com/u/62047803?v=4',
					alt: '秋逸',
				},
			},
			comment: {
				giscus: {
					repo: 'miaobuao/miaobuao.github.io',
					repoId: 'R_kgDOJONNeg',
					categoryId: 'DIC_kwDOJONNes4CVJhu',
					mapping: 'og:title',
					strict: '0',
					reactionsEnabled: '1',
					emitMetadata: '0',
					inputPosition: 'top',
					theme: 'preferred_color_scheme',
					lang: 'zh-CN',
					loading: 'lazy',
				},
			},
			pages: {
				aboutMe: '/about',
			},
		}),
	],
})
