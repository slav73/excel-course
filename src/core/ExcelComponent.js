import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.prepare()

    this.unsubscribers = []
  }

  //Настраиваем компонент до вызова init()
  prepare() {}

  //Возвращает шаблон компонента
  toHtml() {
    return ''
  }

  //Уведомляем слушателей про событие event
  $emit(event, ...args) {
    const unsub = this.emitter.emit(event, ...args)
    this.unsubscribers.push(unsub)
  }

  //Подписываемся на событие event
  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }

  //Инициализируем компонент
  //Добавляем ДОМ-слушателей
  init() {
    this.initDOMListeners()
  }

  //Удаляем компонент
  //Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
  }
}
