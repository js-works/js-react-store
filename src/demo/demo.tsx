import React from 'react'
import ReactDOM from 'react-dom'

const { useCallback } = React

import { initES5Store, initStore, useStore } from '../main/js-react-store'

function createStore(initialValue: number) {
  const [self] = initStore({
    count: initialValue,

    increment() {
      self.count++
      console.log('++') 
    },

    decrement() {
      self.count--
      console.log('--') 
    }
  })
 
  return self
}

function createES5Store(initialValue: number) {
  const [self, update] = initES5Store({
    count: initialValue,

    increment() {
      increase(1)
    },

    decrement() {
      increase(-1)
    }
  })
 
  // --- private functions ------------------------------------------

  function increase(delta: number) {
    update(() => {
      self.count += delta
    })
  }

  // --- return -----------------------------------------------------

  return self
}

function Counter({ initialValue = 0, label = 'Counter'}) {
  const
    store = useStore(() => createStore(initialValue)),
    onIncrement = useCallback(() => store.increment(), []),
    onDecrement = useCallback(() => store.decrement(), [])

  return (
    <div>
      <label>{` ${label}: `}</label>
      <button onClick={onDecrement}>-</button>
      {` ${store.count} `}
      <button onClick={onIncrement}>+</button>
    </div>
  )
}

function ES5Counter({ initialValue = 0, label = 'Counter'}) {
  const
    store = useStore(() => createES5Store(initialValue)),
    onIncrement = useCallback(() => store.increment(), []),
    onDecrement = useCallback(() => store.decrement(), [])

  return (
    <div>
      <label>{` ${label}: `}</label>
      <button onClick={onDecrement}>-</button>
      {` ${store.count} `}
      <button onClick={onIncrement}>+</button>
    </div>
  )
}

function Demo() {
  return (
    <div>
      <h3>Modern Store (ECMAScript ^2015 - proxy based)</h3>
      <Counter/>
      <br/>
      <br/>
      <h3>Classic Store (ECMAScript 5)</h3>
      <ES5Counter/>
    </div>
  )
}

ReactDOM.render(<Demo/>, document.getElementById('main-content'))
