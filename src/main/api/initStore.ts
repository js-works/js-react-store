import { observable, observe } from '@nx-js/observer-util'

export default function initStore<T extends object>(base: T): [T, (f: () => void) => void] {
  let
    observers: ((store: T) => void)[] = [] as any,
    timeout: any = null

  class Store {
    static __subscribe(observer: (store: T) => {}) {
      const newObserver = observer.bind(null)
      observers.push(newObserver)

      return () => {
        observers = observers.filter(it => it !== newObserver)
      }
    }
  }

  const
    self: T = observable(new Store() as T),

    update = (f: () => void) => {
      f()
      emit()
    },

    emit = () => {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null

          for (let i = 0; i < observers.length; ++i) {
            observers[i](self)
          }
        }, 0)
      }
    }

    

  Object.assign(self, base)

  let isFirstTime = true

  // TODO - optimize
  observe(() => {
    // this is really ugly - sorry (wil be fixed soon)
    JSON.stringify(self)

    if (!isFirstTime && !timeout) {
      emit()
    }

    isFirstTime = false
  })

  return [self, update]
}
