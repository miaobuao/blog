import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SiteDescription, SiteTitle } from '../consts'

export async function GET(context) {
  const posts = await getCollection('blog')
  return rss({
    title: SiteTitle,
    description: SiteDescription,
    site: context.site,
    items: posts.map(post => ({
      description: '',
      title: '',
      pubDate: new Date(),
      updatedDate: new Date(),
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  })
}
