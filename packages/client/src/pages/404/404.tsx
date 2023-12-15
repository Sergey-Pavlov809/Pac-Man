import React from 'react'
import { ErrorComponent } from '../../components/error/error'

const NotFoundPage: React.FC = () => {
  return <ErrorComponent type={'404'} message={'Страница не Найдена'} />
}

export default NotFoundPage
