/**
 * Downloads curated stock photos (Unsplash / Pexels, free to use) into public/site-assets/plantation/.
 * Run: npm run download:plantation-photos
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'site-assets', 'plantation')

/** [sourceUrl, localFilename] */
const assets = [
  [
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=2400&q=85',
    'hero.jpg',
  ],
  [
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=85',
    'about-main.jpg',
  ],
  [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=85',
    'about-badge.jpg',
  ],
  [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85',
    'company-606x403.jpg',
  ],
  [
    'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=1400',
    'mission.jpg',
  ],
  [
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=85',
    'project-vanilla.jpg',
  ],
  [
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1400&q=85',
    'project-banana.jpg',
  ],
  [
    'https://images.pexels.com/photos/4468134/pexels-photo-4468134.jpeg?auto=compress&cs=tinysrgb&w=1400',
    'project-watermelon.jpg',
  ],
  [
    'https://images.pexels.com/photos/5945736/pexels-photo-5945736.jpeg?auto=compress&cs=tinysrgb&w=1400',
    'project-gherkins.jpg',
  ],
  [
    'https://images.pexels.com/photos/1437254/pexels-photo-1437254.jpeg?auto=compress&cs=tinysrgb&w=1400',
    'project-spices.jpg',
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
