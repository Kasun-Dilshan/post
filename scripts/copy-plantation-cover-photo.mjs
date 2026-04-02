import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const src =
  'C:\\Users\\Kasun\\.cursor\\projects\\c-Users-Kasun-post-1\\assets\\c__Users_Kasun_AppData_Roaming_Cursor_User_workspaceStorage_92ceb95b613d2e512ed610caa9adc580_images_cover_photo-d4c152f4-5cfc-4f07-b4bf-f4995feea7ee.png'

const dst = join(
  process.cwd(),
  'public',
  'site-assets',
  'plantation',
  'plantation-cover.png'
)

mkdirSync(dirname(dst), { recursive: true })
copyFileSync(src, dst)
console.log('Copied cover photo to:', dst)

