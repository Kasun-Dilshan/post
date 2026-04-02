/**
 * Local photos under public/site-assets/plantation/
 * Populate with: npm run download:plantation-photos
 */
import { SITE_ASSETS } from '../assets/siteAssets.js'

export const PLANTATION_IMAGE_ASSETS = [
  { path: SITE_ASSETS.PLANTATION.COVER, filename: 'plantation-cover.png' },
  { path: SITE_ASSETS.PLANTATION.ABOUT_MAIN, filename: 'about-main.jpg' },
  { path: SITE_ASSETS.PLANTATION.ABOUT_BADGE, filename: 'about-badge.jpg' },
  { path: SITE_ASSETS.PLANTATION.COMPANY_OVERVIEW, filename: 'company-overview.png' },
  { path: SITE_ASSETS.PLANTATION.MISSION, filename: 'mission.png' },
  { path: SITE_ASSETS.PLANTATION.PROJECT_VANILLA, filename: 'project-vanilla.png' },
  { path: SITE_ASSETS.PLANTATION.PROJECT_BANANA, filename: 'project-banana.jpg' },
  { path: SITE_ASSETS.PLANTATION.PROJECT_WATERMELON, filename: 'project-watermelon.jpg' },
  { path: SITE_ASSETS.PLANTATION.PROJECT_GHERKINS, filename: 'project-gherkins.jpg' },
  { path: SITE_ASSETS.PLANTATION.PROJECT_SPICES, filename: 'project-spices.png' },
]

export const PLANTATION_HERO_BG = SITE_ASSETS.PLANTATION.COVER
