import { $ } from '@core/dom'

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let value

    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({ right: -delta + 'px' })
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({ bottom: -delta + 'px' })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (type === 'col') {
        $parent.css({ width: value + 'px' })
        cells.forEach((el) => (el.style.width = value + 'px'))
        $resizer.css({ right: 0 })
      } else {
        $parent.css({ height: value + 'px' })
        $resizer.css({ bottom: 0 })
      }

      resolve({
        value,
        id: type === 'col' ? $parent.data.col : null,
      })
    }
  })
}
