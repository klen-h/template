import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue3 Admin Template'

export function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
