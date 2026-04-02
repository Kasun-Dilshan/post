/**
 * Downloads all remote images used by PlantationPage into public/site-assets/plantation/.
 * Run: node scripts/download-plantation-photos.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'site-assets', 'plantation')

const assets = [
  [
    'https://serendibgroups.com/wp-content/uploads/2025/04/2-1-606x403.png',
    'about-main.png',
  ],
  [
    'https://serendibgroups.com/wp-content/uploads/2024/11/3-1-337x337.png',
    'about-badge.png',
  ],
  [
    'https://serendibgroups.com/wp-content/uploads/2024/11/4-1-606x403.png',
    'company-606x403.png',
  ],
  [
    'https://serendibgroups.com/wp-content/uploads/2024/11/3-1.png',
    'project-vanilla.png',
  ],
  [
    'https://serendibgroups.com/wp-content/uploads/2024/11/banana-scaled-1.jpg',
    'project-banana.jpg',
  ],
  [
    'https://serendibgroups.com/wp-content/uploads/2024/11/DALL%C2%B7E-2024-10-25-14.29.43-A-vibrant-and-juicy-watermelon-sliced-open-to-reveal-its-bright-red-flesh-and-black-seeds-set-on-a-light-wooden-table-with-a-rustic-background.-The-w-1-e1746045831372.webp',
    'project-watermelon.webp',
  ],
  [
    'https://serendibgroups.com/wp-content/uploads/2024/11/gherkins-e1746045903545.jpg',
    'project-gherkins.jpg',
  ],
  [
    'https://serendibgroups.com/wp-content/uploads/2025/04/6.png',
    'project-spices.png',
  ],
]

async function main() {
  await mkdir(outDir, { recursive: true })
  for (const [url, filename] of assets) {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: 'https://serendibgroups.com/',
      },
    })
    if (!res.ok) {
      throw new Error(`${filename}: ${res.status} ${res.statusText}`)
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const dest = join(outDir, filename)
    await writeFile(dest, buf)
    console.log('OK', filename, `(${buf.length} bytes)`)
  }
  console.log('Done. Files in', outDir)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
