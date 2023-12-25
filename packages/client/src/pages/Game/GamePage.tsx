import * as React from 'react'
import { Game } from './Game'
import { GameStart } from './GameStart'
import { GameStatus } from './const'

type GameStatusType = keyof typeof GameStatus

export const GamePage: React.FC = () => {
  const [status, setStatus] = React.useState<GameStatusType>(GameStatus.idle)

  const setInProgressStatus = (): void => {
    setStatus(GameStatus.in_progress)
  }

  if (status === GameStatus.idle) {
    return <GameStart setInProgressStatus={setInProgressStatus} />
  }

  if (status === GameStatus.in_progress) {
    return <Game />
  }

  if (status === GameStatus.finish) {
    return <p>Игра закончена</p>
  }

  return null
}
