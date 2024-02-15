import * as React from 'react'

const isClient = typeof window !== 'undefined'
export const useIsomorphicLayoutEffect = isClient
  ? React.useLayoutEffect
  : React.useEffect
