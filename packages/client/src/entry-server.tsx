import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { Provider } from 'react-redux'
import { store } from './store'

import { AppRouter } from 'config/router'
import { ConfigProvider, theme } from 'antd'
import { UserTheme } from 'types/FormApi'
import { ThemeState } from 'store/types'

export async function render(
  uri: string,
  themeCookie: UserTheme
): Promise<{
  initialStore: ReturnType<typeof store.getState>
  renderResult: string
  styleText: string
}> {
  const cache = createCache()
  const initialStore = {
    ...store.getState(),
    theme: {
      userTheme: themeCookie,
      status: 'idle',
      error: null,
    } as ThemeState,
  }

  const renderResult = renderToString(
    <Provider store={store}>
      <StyleProvider cache={cache} hashPriority="high">
        <StaticRouter location={uri}>
          <ConfigProvider
            direction="ltr"
            theme={{
              algorithm:
                themeCookie === 'dark'
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
            }}>
            <AppRouter />
          </ConfigProvider>
        </StaticRouter>
      </StyleProvider>
    </Provider>
  )
  return { initialStore, renderResult, styleText: extractStyle(cache) }
}
