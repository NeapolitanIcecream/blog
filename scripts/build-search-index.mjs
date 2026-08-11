import { spawn } from 'node:child_process'
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const outputDirectory = resolve(root, 'dist')

async function getHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name)
      return entry.isDirectory() ? getHtmlFiles(path) : [path]
    }),
  )

  return files.flat().filter((file) => extname(file) === '.html')
}

const htmlFiles = await getHtmlFiles(outputDirectory)
const hasListedPost = (await Promise.all(htmlFiles.map((file) => readFile(file, 'utf8')))).some(
  (html) => html.includes('data-pagefind-body'),
)

if (!hasListedPost) {
  const pagefindDirectory = resolve(outputDirectory, 'pagefind')
  await mkdir(pagefindDirectory, { recursive: true })
  await writeFile(
    resolve(pagefindDirectory, 'pagefind.js'),
    'export async function search() { return { results: [] } }\n',
  )
  console.log('Pagefind：当前没有公开文章，已生成空搜索索引。')
  process.exit(0)
}

const pagefind = spawn(
  'pagefind',
  ['--site', outputDirectory, '--root-selector', '[data-pagefind-body]'],
  {
    cwd: root,
    stdio: 'inherit',
  },
)

pagefind.on('error', (error) => {
  console.error(`无法启动 Pagefind：${error.message}`)
  process.exit(1)
})

pagefind.on('exit', (code) => {
  process.exit(code ?? 1)
})
