export const SITE = {
  name: 'Voile',
  title: 'Voile 技术博客',
  description: '关于软件、系统与方法的中文技术写作。',
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
