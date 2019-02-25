export default function createStore<T>(init: (store: T, update: (process: () => void) => void) => T): T {
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
    self: T = new Store() as T,

    update = (f: () => void) => {
      f()
      
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null

          for (let i = 0; i < observers.length; ++i) {
            observers[i](self)
          }
        }, 0)
      }
    }
 
  return Object.assign(self, init(self as any, update))
}
