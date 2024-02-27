import * as React from 'react'

type HookType = {
  start?: number
  end?: number
  onEnd: (...args: unknown[]) => void
}

export const useGameCountDown = ({
  start = 3,
  end = 0,
  onEnd,
}: HookType): Array<number> => {
  const [secondsLeft, setSecondsLeft] = React.useState(start)

  React.useEffect(() => {
    let timer: NodeJS.Timeout

    if (secondsLeft > end) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1)
      }, 1000)
    } else {
      onEnd()
    }

    return (): void => {
      timer && clearInterval(timer)
    }
  }, [secondsLeft])

  return [secondsLeft]
}
