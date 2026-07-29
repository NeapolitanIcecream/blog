import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url))

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(entryPath)))
    } else if (entry.name.endsWith('.html')) {
      files.push(entryPath)
    }
  }

  return files
}

const htmlFiles = await findHtmlFiles(outputDirectory)
let updatedFiles = 0

for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8')
  const prepared = source.replace(
    /<script\b(?![^>]*\bdata-cfasync=)(?![^>]*\btype=["']application\/ld\+json["'])([^>]*)>/gi,
    '<script data-cfasync="false"$1>',
  )

  if (prepared !== source) {
    await writeFile(file, prepared)
    updatedFiles += 1
  }
}

console.log(`Cloudflare 产物准备完成：${updatedFiles} 个页面跳过 Rocket Loader。`)
