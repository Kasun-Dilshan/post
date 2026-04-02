import { mkdir, copyFile, access } from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve('dist')
const sourceIndex = path.join(distDir, 'index.html')

async function ensureExists(p) {
  await access(p)
}

async function writeRouteIndex(routePath) {
  const normalized = routePath.replace(/^\/+/, '').replace(/\/+$/, '')
  const targetDir = path.join(distDir, normalized)
  const targetIndex = path.join(targetDir, 'index.html')
  await mkdir(targetDir, { recursive: true })
  await copyFile(sourceIndex, targetIndex)
}

async function main() {
  await ensureExists(sourceIndex)

  // These routes are used by BrowserRouter and should work on static hosts
  // that do NOT support SPA rewrites (e.g. direct navigation / refresh).
  const routes = [
    '/plantation',
    '/contact',
    '/investments',
    '/investments/fixed-income',
    '/investments/green',
    '/investments/silver',
    '/investments/gold',

    // Common typo seen in production links/screenshots
    '/investmerts',
  ]

  await Promise.all(routes.map(writeRouteIndex))
  console.log(`Generated ${routes.length} static route index.html files.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

