export const SITE = {
  name: 'Voile',
  title: 'Voile',
  description: 'Voile 的个人博客。',
  url: 'https://voile.tech',
  language: 'zh-CN',
  author: 'Voile',
  repository: 'https://github.com/NeapolitanIcecream/blog',
} as const

export const NAVIGATION = [
  { href: '/posts/', label: '文章' },
  { href: '/tags/', label: '标签' },
  { href: '/about/', label: '关于' },
] as const
