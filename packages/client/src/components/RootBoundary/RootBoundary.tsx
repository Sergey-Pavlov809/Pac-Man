import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import ServerErrorPage from '../../pages/500/500'
import NotFoundPage from '../../pages/404/404'

function RootBoundary(): React.ReactElement {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />
    }

    if (error.status === 401) {
      return <div>You are not authorized to see this</div>
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>
    }

    if (error.status === 418) {
      return <div>🫖</div>
    }
  }

  return <ServerErrorPage />
}

export default RootBoundary
