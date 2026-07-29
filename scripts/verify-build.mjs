import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

const requiredFiles = [
  'dist/index.html',
  'dist/posts/index.html',
  'dist/posts/writing-system/index.html',
  'dist/tags/index.html',
  'dist/search/index.html',
  'dist/about/index.html',
  'dist/404.html',
  'dist/rss.xml',
  'dist/robots.txt',
  'dist/pagefind/pagefind.js',
]

for (const file of requiredFiles) {
  await access(resolve(root, file))
}

const post = await readFile(resolve(root, 'dist/posts/writing-system/index.html'), 'utf8')
const home = await readFile(resolve(root, 'dist/index.html'), 'utf8')
const rss = await readFile(resolve(root, 'dist/rss.xml'), 'utf8')

const assertions = [
  [post.includes('class="katex"'), '文章应包含构建后的 KaTeX 标记'],
  [post.includes('language-mermaid'), '文章应保留 Mermaid 渐进增强源码'],
  [post.includes('data-pagefind-body'), '文章正文应进入全文索引'],
  [post.includes('id="main-content"'), '页面应提供跳转目标'],
  [post.includes('aria-label="本文目录"'), '文章应包含有名称的目录导航'],
  [
    post.includes('aria-label="已完成：中文正文与标点排版"'),
    '任务列表复选框应包含条目文本的可访问名称',
  ],
  [home.includes('lang="zh-CN"'), '首页应声明中文语言'],
  [home.includes('href="#main-content"'), '首页应提供跳过重复导航的链接'],
  [rss.includes('<rss'), 'RSS 端点应输出 RSS 文档'],
]

const failures = assertions.filter(([pass]) => !pass).map(([, message]) => message)

if (failures.length > 0) {
  console.error('产物验收失败：')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`产物验收通过：${requiredFiles.length} 个关键文件，${assertions.length} 项行为断言。`)
