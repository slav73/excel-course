import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.prepare()
    this.storeSub = null
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

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
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
    this.unsubscribers.forEach((unsub) => unsub())
    this.storeSub.unsubscribe()
  }
}
