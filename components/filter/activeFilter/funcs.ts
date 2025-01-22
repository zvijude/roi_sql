import { filterConfig } from './filterConfig'

export function formatFilter(filter) {
  const formattedFilter = [] as any

  for (const { key, title, formatter } of filterConfig) {
    const value = getNestedValue(filter, key)
    if (value !== undefined) {
      const formattedValue = formatter(value)
      if (formattedValue) {
        formattedFilter.push([title, formattedValue])
      }
    }
  }

  return formattedFilter
}

// Helper function to get nested value by key path (e.g., 'qr.qrNum')
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}
