import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'
import { Provider } from 'react-redux'
import {
  registerServiceWorker,
  unregisterServiceWorker,
} from 'utils/serviceWorkerUtils'
import { BrowserRouter } from 'react-router-dom'
import { ErrorComponent } from 'components/error/ErrorComponent'
import { ErrorBoundary } from 'react-error-boundary'
import { AppRouter } from 'config/router'
import { store } from 'store/index'
import { ConfigProvider, theme } from 'antd'
import React, { useEffect, useState } from 'react'

/**
 * Активировать SW будем в production режиме
 */
if (import.meta.env.PROD) {
  registerServiceWorker(true)
} else {
  unregisterServiceWorker(true)
}

const rootElement = document.getElementById('root') as HTMLElement
const MyApp = (): React.ReactElement => {
  const [currentTheme, setCurrentTheme] = useState(
    store.getState().theme?.userTheme
  )

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const userTheme = store.getState().theme?.userTheme
      if (userTheme !== currentTheme) {
        setCurrentTheme(userTheme)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [currentTheme])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary fallback={<ErrorComponent type="500" />}>
          <ConfigProvider
            direction="ltr"
            theme={{
              algorithm:
                currentTheme === 'dark'
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
            }}>
            <AppRouter />
          </ConfigProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.hydrateRoot(rootElement, <MyApp />)
