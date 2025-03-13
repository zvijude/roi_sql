export function getNavLink({ filter, event }) {
  const newFilter = { ...filter }
  delete newFilter.status
  delete newFilter.item
  delete newFilter.isActive

  if (!filter) return event

  return `${event}?filter=${JSON.stringify(newFilter)}`
}
