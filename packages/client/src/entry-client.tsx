import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'
import { setupStore } from './store'
import { Provider } from 'react-redux'
import {
  registerServiceWorker,
  unregisterServiceWorker,
} from 'utils/serviceWorkerUtils'
import { BrowserRouter } from 'react-router-dom'
import { ErrorComponent } from 'components/error/ErrorComponent'
import { ErrorBoundary } from 'react-error-boundary'
import { AppRouter } from 'config/router'

/**
 * Активировать SW будем в production режиме, но для временно для тестов добавляю DEV
 */
if (import.meta.env.PROD || import.meta.env.DEV) {
  // TODO: при переходе на прод, убрать DEV
  registerServiceWorker(true)
} else {
  unregisterServiceWorker(true)
}

const store = setupStore()

const rootElement = document.getElementById('root') as HTMLElement
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorComponent type="500" />}>
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
)

ReactDOM.hydrateRoot(rootElement, app)
