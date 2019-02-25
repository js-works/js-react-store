import React from 'react'
import ReactDOM from 'react-dom'

const { useCallback } = React

import { initStore, useStore } from '../main/js-react-store'

function createStore(initialValue: number) {
  const [self, update] = initStore({
    count: initialValue,

    increment() {
      increase(1)
    },

    decrement() {
      increase(-1)
    }
  })
 
  return self

  // --- private functions ------------------------------------------

  function increase(delta: number) {
    update(() => {
      self.count += delta
    })
  }

  return self
}

function Counter({ initialValue = 0, label = 'Counter'}) {
  const
    store = useStore(() => createStore(initialValue)),
    increment = useCallback(() => store.increment(), []),
    decrement = useCallback(() => store.decrement(), [])

  return (
    <div>
      <label>{` ${label}: `}</label>
      <button onClick={decrement}>-</button>
      {` ${store.count} `}
      <button onClick={increment}>+</button>
    </div>
  )
}

function Demo() {
  return (
    <div>
      <h3>js-react-store demo</h3>
      <Counter/>
    </div>
  )
}

ReactDOM.render(<Demo/>, document.getElementById('main-content'))
