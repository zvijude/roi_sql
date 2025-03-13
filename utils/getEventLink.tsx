export function getEventLink({ filter, event }) {
  const newFilter = { ...filter }
  delete newFilter.status
  if (!filter) return event

  return `${event}?filter=${JSON.stringify(newFilter)}`
}
