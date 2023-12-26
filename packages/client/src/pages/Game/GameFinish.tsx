import * as React from 'react'
import { Button, Typography, Card } from 'antd'

import css from './Game.module.css'

type GameStartProps = {
  setIdleStatus: () => void
  setInProgressStatus: () => void
}

export const GameFinish: React.FC<GameStartProps> = ({
  setInProgressStatus,
  setIdleStatus,
}) => {
  const handleTryAgain = (): void => {
    setInProgressStatus()
  }

  const handleOpenRules = (): void => {
    setIdleStatus()
  }

  return (
    <section className={css.gameContainer}>
      <Card
        className={css.gameRules}
        actions={[
          <Button type="primary" key="again" onClick={handleTryAgain}>
            Попробовать ещё
          </Button>,
          <Button key="rules" onClick={handleOpenRules}>
            Прочитать правила
          </Button>,
        ]}>
        <Typography.Title level={3}>Игра завершена</Typography.Title>
        <Typography.Paragraph>
          Всего вы заработали [количество_очков] очков.
        </Typography.Paragraph>
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          Попробовать ещё раз?
        </Typography.Paragraph>
      </Card>
    </section>
  )
}
