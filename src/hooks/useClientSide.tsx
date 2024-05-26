import { useEffect, useState } from 'react'

export const useClientSide = () => {
  const [isMount, setIsMount] = useState(false)
  const isFrontEnd = typeof window != 'undefined'
  const isDevEnv = isFrontEnd && window.location.href.includes('localhost')

  useEffect(() => {
    setIsMount(true)
  }, [])

  return {
    isMount,
    isDevEnv,
    isFrontEnd,
  }
}
