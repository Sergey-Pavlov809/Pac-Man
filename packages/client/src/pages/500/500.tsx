import React from 'react'
import { ErrorComponent } from 'components/error/ErrorComponent'

export const ServerErrorPage: React.FC = () => {
  return (
    <ErrorComponent
      type={'500'}
      message={'Что-то Пошло Не Так... Уже Чиним!'}
    />
  )
}

export default ServerErrorPage
