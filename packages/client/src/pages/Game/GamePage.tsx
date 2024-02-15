import * as React from 'react'
import { Game } from './Game'
import { GameStart } from './GameStart'
import { GameFinish } from './GameFinish'
import { GameStatus } from './const'

type GameStatusType = keyof typeof GameStatus

export const GamePage: React.FC = () => {
  const [status, setStatus] = React.useState<GameStatusType>(GameStatus.idle)

  const setInProgressStatus = (): void => {
    setStatus(GameStatus.in_progress)
  }
  const setIdleStatus = (): void => {
    setStatus(GameStatus.idle)
  }
  const setFinishStatus = (): void => {
    setStatus(GameStatus.finish)
  }

  if (status === GameStatus.idle) {
    return <GameStart setInProgressStatus={setInProgressStatus} />
  }

  if (status === GameStatus.in_progress) {
    return <Game setFinishStatus={setFinishStatus} />
  }

  if (status === GameStatus.finish) {
    return (
      <GameFinish
        setIdleStatus={setIdleStatus}
        setInProgressStatus={setInProgressStatus}
      />
    )
  }

  return null
}
