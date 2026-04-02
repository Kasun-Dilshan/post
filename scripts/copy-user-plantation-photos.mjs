import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const outDir = join(process.cwd(), 'public', 'site-assets', 'plantation')
mkdirSync(outDir, { recursive: true })

const copies = [
  {
    src: 'C:\\Users\\Kasun\\.cursor\\projects\\c-Users-Kasun-post-1\\assets\\c__Users_Kasun_AppData_Roaming_Cursor_User_workspaceStorage_92ceb95b613d2e512ed610caa9adc580_images_vanilla-f8d45f37-e960-474c-8ec7-b9f30bf83e2b.png',
    dst: join(outDir, 'project-vanilla.png'),
  },
  {
    src: 'C:\\Users\\Kasun\\.cursor\\projects\\c-Users-Kasun-post-1\\assets\\c__Users_Kasun_AppData_Roaming_Cursor_User_workspaceStorage_92ceb95b613d2e512ed610caa9adc580_images_spices-1fac1f41-312e-4035-ade3-2e9f5cd8935e.png',
    dst: join(outDir, 'project-spices.png'),
  },
  {
    src: 'C:\\Users\\Kasun\\.cursor\\projects\\c-Users-Kasun-post-1\\assets\\c__Users_Kasun_AppData_Roaming_Cursor_User_workspaceStorage_92ceb95b613d2e512ed610caa9adc580_images_our_mission-7f3ed79c-d0ed-45eb-a883-f50bf565beba.png',
    dst: join(outDir, 'mission.png'),
  },
  {
    src: 'C:\\Users\\Kasun\\.cursor\\projects\\c-Users-Kasun-post-1\\assets\\c__Users_Kasun_AppData_Roaming_Cursor_User_workspaceStorage_92ceb95b613d2e512ed610caa9adc580_images_company_overview-fbccbccd-07ea-411d-a6c7-0e8a593b575e.png',
    dst: join(outDir, 'company-overview.png'),
  },
]

for (const { src, dst } of copies) {
  copyFileSync(src, dst)
  console.log('Copied:', dst)
}

