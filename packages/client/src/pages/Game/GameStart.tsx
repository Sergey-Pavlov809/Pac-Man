import * as React from 'react'
import { Button, Steps, Card } from 'antd'

import css from './Game.module.css'
import { GAME_RULES } from './const'

type GameStartProps = {
  setInProgressStatus: () => void
}

export const GameStart: React.FC<GameStartProps> = ({
  setInProgressStatus,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0)

  const handleNext = React.useCallback((): void => {
    setCurrentStep(currentStep + 1)
  }, [currentStep])

  const handlePrev = React.useCallback((): void => {
    setCurrentStep(currentStep - 1)
  }, [currentStep])

  const handleReady = React.useCallback((): void => {
    setInProgressStatus()
    setCurrentStep(0)
  }, [setInProgressStatus])

  const items = GAME_RULES.map(item => ({ key: item.title, title: item.title }))

  const actionButtons = React.useMemo(
    () =>
      [
        currentStep < GAME_RULES.length - 1 && (
          <Button key="next" type="primary" onClick={handleNext}>
            Далее
          </Button>
        ),
        currentStep === GAME_RULES.length - 1 && (
          <Button key="start" type="primary" onClick={handleReady}>
            Начать игру
          </Button>
        ),
        currentStep > 0 && (
          <Button key="prev" onClick={handlePrev}>
            Назад
          </Button>
        ),
      ].filter(Boolean),
    [currentStep, handleNext, handlePrev, handleReady]
  )

  return (
    <section className={css.gameContainer}>
      <Steps current={currentStep} items={items} />
      <Card className={css.gameRules} actions={actionButtons}>
        {GAME_RULES[currentStep].content}
      </Card>
    </section>
  )
}
