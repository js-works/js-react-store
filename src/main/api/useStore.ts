import React from 'react'
import observeStore from './observeStore'

const { useEffect, useState } = React

function useStore<T>(create: () => T): T {
   const
      [[store], set] = useState(() => {
        return [create()]
      })

    useEffect(() => {
      const unsubscribe = observeStore(store, () => {
        set([store])
      })

      return unsubscribe 
    }, [])

   return store
}

export default useStore
