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
  'dist/sitemap-index.xml',
  'dist/sitemap-0.xml',
  'dist/pagefind/pagefind.js',
]

for (const file of requiredFiles) {
  await access(resolve(root, file))
}

const post = await readFile(resolve(root, 'dist/posts/writing-system/index.html'), 'utf8')
const home = await readFile(resolve(root, 'dist/index.html'), 'utf8')
const postsPage = await readFile(resolve(root, 'dist/posts/index.html'), 'utf8')
const tagsPage = await readFile(resolve(root, 'dist/tags/index.html'), 'utf8')
const aboutPage = await readFile(resolve(root, 'dist/about/index.html'), 'utf8')
const searchPage = await readFile(resolve(root, 'dist/search/index.html'), 'utf8')
const styles = await readFile(resolve(root, 'src/styles/global.css'), 'utf8')
const rss = await readFile(resolve(root, 'dist/rss.xml'), 'utf8')
const sitemap = await readFile(resolve(root, 'dist/sitemap-0.xml'), 'utf8')
const unlistedTitle = '这个博客如何处理 Markdown、图表与公式'
const executableScripts = (post.match(/<script\b[^>]*>/g) ?? []).filter(
  (tag) => !tag.includes('application/ld+json'),
)
const siteHeaderRule = styles.match(/\.site-header\s*\{[^}]*\}/)?.[0] ?? ''
const pageHeaderRule = styles.match(/\.page-header\s*\{[^}]*\}/)?.[0] ?? ''
const pageHeaders = [postsPage, tagsPage, aboutPage, searchPage].map(
  (page) => page.match(/<header class="page-header">[\s\S]*?<\/header>/)?.[0] ?? '',
)

const assertions = [
  [post.includes('class="katex"'), '文章应包含构建后的 KaTeX 标记'],
  [post.includes('language-mermaid'), '文章应保留 Mermaid 渐进增强源码'],
  [!post.includes('data-pagefind-body'), '目录外文章不应进入全文索引'],
  [post.includes('<meta name="robots" content="noindex"'), '目录外文章应阻止搜索引擎收录'],
  [
    [home, postsPage, tagsPage, searchPage].every((page) => !page.includes(unlistedTitle)),
    '目录外文章不应出现在公开目录或搜索回退索引中',
  ],
  [
    !rss.includes(unlistedTitle) && !sitemap.includes('/posts/writing-system/'),
    '目录外文章不应进入 RSS 或站点地图',
  ],
  [
    !post.includes('href="/tags/Astro/"') && !post.includes('aria-label="相邻文章"'),
    '目录外文章不应向隐藏标签页或相邻文章泄露入口',
  ],
  [post.includes('id="main-content"'), '页面应提供跳转目标'],
  [post.includes('aria-label="本文目录"'), '文章应包含有名称的目录导航'],
  [
    post.includes('aria-label="已完成：中文正文与标点排版"'),
    '任务列表复选框应包含条目文本的可访问名称',
  ],
  [home.includes('lang="zh-CN"'), '首页应声明中文语言'],
  [home.includes('href="#main-content"'), '首页应提供跳过重复导航的链接'],
  [
    executableScripts.every((tag) => tag.includes('data-cfasync="false"')),
    'Cloudflare 不应让 Rocket Loader 改写可执行脚本',
  ],
  [
    home.includes('<link rel="icon" href="/favicon.svg"') &&
      home.includes('<img class="brand__mark" src="/favicon.svg"'),
    '页头标志与浏览器 favicon 应使用同一资源',
  ],
  [!siteHeaderRule.includes('border-top'), '页头顶部不应出现装饰横条'],
  [
    !pageHeaderRule.includes('linear-gradient') &&
      pageHeaders.every((header) => !/<p(?:\s|>)/.test(header)),
    '栏目页标题区域不应包含装饰竖线或右侧说明',
  ],
  [!styles.includes('.post-card::before'), '文章卡片不应使用与圆角脱节的顶部横条'],
  [
    !['system-card', 'signal-strip', 'principles', 'newsletter-cta'].some((name) =>
      home.includes(name),
    ) && !['站点原则', '设计指南', '技术栈'].some((text) => aboutPage.includes(text)),
    '公开页面不应展示站点实现说明或产品化宣传文案',
  ],
  [
    (home.match(/你好，我是 Voile。/g) ?? []).length === 1 &&
      !['记录软件开发', '主要记录软件开发', 'home-hero__lead'].some(
        (text) => home.includes(text) || aboutPage.includes(text),
      ),
    '首页应只保留一句个人招呼，不应重复解释博客内容',
  ],
  [
    !home.includes('site-footer__intro') && !home.includes('<small>个人博客</small>'),
    '页头和页脚不应重复站点定位文案',
  ],
  [
    post.includes('id="copy-status"') && post.includes('aria-live="polite"'),
    '代码复制结果应通过 live region 提供辅助技术反馈',
  ],
  [
    post.includes('class="article-toc-mobile"') &&
      post.includes('class="toc" data-toc aria-label="本文目录"'),
    '长文应提供位于移动端正文之前且可增强当前位置的目录',
  ],
  [
    post.includes('class="table-scroll"') && post.includes('aria-label="可横向滚动的数据表"'),
    '宽表格应提供有名称的键盘滚动区域',
  ],
  [
    post.includes('property="og:image:type" content="image/png"') &&
      post.includes('property="og:image:width" content="1200"') &&
      post.includes('property="og:image:height" content="630"') &&
      post.includes('property="og:image:alt"'),
    'Open Graph 图片应声明通用格式、尺寸和替代文本',
  ],
  [post.includes('property="article:tag" content="Astro"'), '文章分享元数据应包含内容标签'],
  [rss.includes('<rss'), 'RSS 端点应输出 RSS 文档'],
]

const failures = assertions.filter(([pass]) => !pass).map(([, message]) => message)

if (failures.length > 0) {
  console.error('产物验收失败：')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`产物验收通过：${requiredFiles.length} 个关键文件，${assertions.length} 项行为断言。`)
