import { getCollection, type CollectionEntry } from 'astro:content'
import readingTime from 'reading-time'

export type Post = CollectionEntry<'posts'>

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft)

  return posts.sort(
    (first, second) => second.data.publishDate.valueOf() - first.data.publishDate.valueOf(),
  )
}

export function isListedPost(post: Post): boolean {
  return !post.data.unlisted
}

export async function getListedPosts(): Promise<Post[]> {
  return (await getPublishedPosts()).filter(isListedPost)
}

export function getPostUrl(post: Post): string {
  return `/posts/${post.id}/`
}

export function getReadingMinutes(post: Post): number {
  return Math.max(1, Math.ceil(readingTime(post.body ?? '').minutes))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function formatDateISO(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function getTagSummary(posts: Post[]): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((first, second) => {
      if (second.count !== first.count) return second.count - first.count
      return first.name.localeCompare(second.name, 'zh-CN')
    })
}

export function getTagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`
}
