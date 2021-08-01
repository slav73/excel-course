import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.prepare()
    this.unsubscribers = []
    this.storeSub = null
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
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
    this.storeSub.unsubscribe()
    this.unsubscribers.forEach((unsub) => unsub())
  }
}
