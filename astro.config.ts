import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
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

const postsDirectory = fileURLToPath(new URL('./src/content/posts/', import.meta.url))
const postExtensions = new Set(['.md', '.mdx'])

function getPostFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? getPostFiles(path) : [path]
  })
}

const unlistedPostUrls = new Set(
  getPostFiles(postsDirectory)
    .filter((file) => postExtensions.has(extname(file)))
    .filter((file) => {
      const source = readFileSync(file, 'utf8')
      const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---(?:\s*\n|$)/)?.[1] ?? ''
      return /^unlisted:\s*true\s*(?:#.*)?$/im.test(frontmatter)
    })
    .map((file) => {
      const extension = extname(file)
      const id = relative(postsDirectory, file).slice(0, -extension.length).split(sep).join('/')
      return new URL(`/posts/${id}/`, SITE.url).href
    }),
)

export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !unlistedPostUrls.has(page),
    }),
  ],
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
