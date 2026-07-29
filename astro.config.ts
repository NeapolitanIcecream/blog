import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { SITE } from './src/config'
import { rehypeAccessibleTaskLists } from './src/plugins/rehype-accessible-task-lists'
import { rehypeScrollableTables } from './src/plugins/rehype-scrollable-tables'

export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeAccessibleTaskLists,
        rehypeScrollableTables,
        rehypeKatex,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: {
              className: ['heading-anchor'],
              ariaLabel: '链接到本节',
              'data-pagefind-ignore': '',
            },
            content: {
              type: 'element',
              tagName: 'span',
              properties: {
                ariaHidden: 'true',
              },
              children: [{ type: 'text', value: '#' }],
            },
          },
        ],
      ],
    }),
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    shikiConfig: {
      themes: {
        light: 'github-light-high-contrast',
        dark: 'github-dark-high-contrast',
      },
    },
  },
})
