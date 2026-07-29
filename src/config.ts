export const SITE = {
  name: 'Voile',
  title: 'Voile',
  description: '记录软件开发、工具和一些想法。',
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
