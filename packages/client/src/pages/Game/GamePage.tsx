import * as React from 'react'
import { Game } from './Game'
import { GameStart } from './GameStart'

type GameStatusType = 'idle' | 'in_progress' | 'finish'

export const GamePage: React.FC = () => {
  const [status, setStatus] = React.useState<GameStatusType>('idle')

  const setInProgressStatus = (): void => {
    setStatus('in_progress')
  }

  if (status === 'idle') {
    return <GameStart setInProgressStatus={setInProgressStatus} />
  }

  if (status === 'in_progress') {
    return <Game />
  }

  if (status === 'finish') {
    return <p>Игра закончена</p>
  }

  return null
}
