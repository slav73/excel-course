export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}
