import { $ } from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  let value

  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta + 'px'
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta + 'px'
      $resizer.css({ bottom: -delta + 'px' })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({ width: value })
      cells.forEach((el) => (el.style.width = value))
      $resizer.css({ right: 0 })
    } else {
      $parent.css({ height: value })
      $resizer.css({ bottom: 0 })
    }
  }
}