import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [isMount, setIsMount] = useState(false)
  const isFrontEnd = typeof window != 'undefined'
  const isDevEnv = isFrontEnd && window.location.href.includes('localhost')

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    if (isFrontEnd) {
      updateWindowWidth()
      window.addEventListener('resize', updateWindowWidth)

      return () => {
        window.removeEventListener('resize', updateWindowWidth)
      }
    }
  }, [isFrontEnd])

  useEffect(() => {
    setIsMount(true)
  }, [])

  return {
    isMount,
    isDevEnv,
    isFrontEnd,
    windowWidth,
  }
}
