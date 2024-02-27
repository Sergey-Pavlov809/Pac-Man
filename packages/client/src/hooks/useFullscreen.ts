import * as React from 'react'

export const useFullscreen = <T extends HTMLElement>(
  target: React.RefObject<T>
): boolean => {
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    const element = target.current

    const detectFKey = (e: KeyboardEvent): void => {
      if (e.code === 'KeyF') {
        toggleFullScreen()
      }
    }

    const toggleFullScreen = (): void => {
      setIsFullscreen(Boolean(document.fullscreenElement))
      if (!document.fullscreenElement) {
        element?.requestFullscreen()
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    window.addEventListener('keydown', detectFKey)

    return (): void => {
      window.removeEventListener('keydown', detectFKey)
    }
  }, [target])

  return isFullscreen
}
