import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { SITE } from '../config'
import { getListedPosts, getPostUrl } from '../utils/posts'

export const GET: APIRoute = async (context) => {
  const posts = await getListedPosts()

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    customData: `<language>${SITE.language}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: getPostUrl(post),
      categories: post.data.tags,
    })),
  })
}
