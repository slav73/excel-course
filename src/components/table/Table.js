import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHtml() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const type = $resizer.data.resize

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          const value = coords.width + delta + 'px'
          $parent.css({ width: value })
          cells.forEach((el) => (el.style.width = value))
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta + 'px'
          $parent.css({ height: value })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
