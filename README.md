# js-react-store

Very small store library to be used in React - mainly to be used locally within components

[![Licence](https://img.shields.io/badge/licence-LGPLv3-blue.svg?style=flat)](https://github.com/js-works/js-react-store/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/js-react-store.svg?style=flat)](https://www.npmjs.com/package/js-react-store)
[![Build status](https://travis-ci.com/js-works/js-react-store.svg)](https://travis-ci.org/js-works/js-react-store)
[![Coverage status](https://coveralls.io/repos/github/js-works/js-react-store/badge.svg?branch=master)](https://coveralls.io/github/js-works/js-react-store?branch=master)
![Dependencies](https://img.shields.io/badge/dependencies-none-green.svg?style=flat)

## Installation

npm install --save js-react-store

## Usage
```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, useStore } from 'js-react-store'

type CounterStore = { 
  count: number,
  increment(): void,
  decrement(): void
}

function createCounterStore() {
  return createStore<CounterStore>((self, update) => {
    function increase(delta: number) {
      update(() => {
        self.count += delta
      })
    }

    return {
      count: initialValue,

      increment() {
        increase(1)
      },

      decrement() {
        increase(-1)
      }
    }
  })
}

function Counter() {
  const
    store = useStore(createCounterStore),
    increment = useCallback(() => store.increment(), []),
    decrement = useCallback(() => store.decrement(), [])

  return (
    <div>
      <label>Counter: </label>
      <button onClick={decrement}>-</button>
      {` ${store.count} `}
      <button onClick={increment}>+</button>
    </div>
  )
}

ReactDOM.render(<Counter/>, document.getElementById('main-content'))
```

## License

"js-react-store" is licensed under LGPLv3.

## Project status

"js-react-store" is currently in alpha status.
