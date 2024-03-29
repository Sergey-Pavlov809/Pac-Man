import React from 'react'
import { ErrorComponent } from 'components/error/ErrorComponent'

export const NotFoundPage: React.FC = () => {
  return <ErrorComponent type={'404'} message={'Страница не найдена'} />
}

export default NotFoundPage
