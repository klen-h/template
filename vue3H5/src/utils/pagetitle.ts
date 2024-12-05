import defaultSettings from '@/settings'

const { title } = defaultSettings

export function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
