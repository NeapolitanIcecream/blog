# Voile 技术博客

基于 Astro 7 的中文技术博客，静态部署到 Cloudflare Pages，正式域名为
[`voile.tech`](https://voile.tech)。

## 写作

文章放在 `src/content/posts/`，支持 `.md` 和 `.mdx`。最小 frontmatter：

```yaml
---
title: 文章标题
description: 一句话摘要
publishDate: 2026-07-29
tags:
  - Astro
  - 前端
---
```

可选字段：

- `updatedDate`：更新时间。
- `draft`：设为 `true` 后不参与列表、标签、RSS 和静态路由。
- `featured`：设为 `true` 后优先显示在首页。
- `lang`：默认 `zh-CN`，也可设为 `en`。

Mermaid 使用代码围栏：

````markdown
```mermaid
flowchart LR
  A[Markdown] --> B[Astro]
  B --> C[Cloudflare Pages]
```
````

行内公式写作 `$E = mc^2$`，块级公式写作：

```markdown
$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

## 本地开发与验收

需要 Node.js 22.12 或更高版本，建议 Node.js 24。

```bash
pnpm install
pnpm dev
pnpm test
```

`pnpm test` 会依次执行 Astro 类型检查、静态构建、Pagefind 全文索引和产物断言。

## 设计约束

实现采用三套设计系统的指南，而不是复制其品牌：

- GOV.UK Design System：语义 HTML、渐进增强、小屏优先、受控行宽、跳转链接和黄黑高对比焦点。
- Carbon Design System：以 4/8px 为主的间距令牌、对齐关键线、响应式 12 列布局、编辑性与功能性字体层级。
- Primer：导航需说明当前位置，链接与按钮保持语义区别，键盘顺序与视觉顺序一致，主题颜色使用角色令牌，动效遵守 `prefers-reduced-motion`。

采用项对应的原始指南：

| 系统   | 本站采用的指南                                                                                                                                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GOV.UK | [小屏优先、受控行宽与网格](https://design-system.service.gov.uk/styles/layout/)、[黄黑焦点状态](https://design-system.service.gov.uk/get-started/focus-states/)、[语义 HTML 与渐进增强](https://design-system.service.gov.uk/accessibility/accessibility-strategy/) |
| Carbon | [间距令牌](https://carbondesignsystem.com/elements/spacing/overview/)、[编辑性与功能性字体层级](https://carbondesignsystem.com/elements/typography/style-strategies/)、[键盘与认知负担](https://carbondesignsystem.com/guidelines/accessibility/overview/)          |
| Primer | [清楚的位置与导航语义](https://primer.style/product/ui-patterns/navigation/)、[焦点管理](https://primer.style/accessibility/design-guidance/focus-management/)、[减少动态效果](https://primer.style/accessibility/design-guidance/motion-and-animation/)            |

核心页面在无 JavaScript 时仍提供正文、导航、代码、公式和 Mermaid 源码。JavaScript 只增强主题、
代码复制、Mermaid SVG 和全文搜索。

## Cloudflare Pages

Pages 构建设置：

| 设置     | 值           |
| -------- | ------------ |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist`       |
| Node.js  | `24`         |
| 环境变量 | 无必需变量   |

直接上传：

```bash
pnpm deploy
```

部署命令固定使用现有的 `blog` Pages 项目；该项目已绑定 `voile.tech`。构建过程会给可执行
脚本添加 `data-cfasync="false"`，避免 Rocket Loader 改写 Astro 模块和 Mermaid 动态分包。
本机登录失效时，先运行 `pnpm exec wrangler login`。
