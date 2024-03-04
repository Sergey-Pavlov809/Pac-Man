import { useAppSelector } from 'hooks'
import { selectIsAuthorized } from 'store/modules/auth/reducer'
import { Navigate } from 'react-router'
import { routes } from './routes'

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (!isAuthorized) {
    return <Navigate to={routes.signin()} replace />
  }

  return children
}
