import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { Provider } from 'react-redux'
import { setupStore } from './store'

import { AuthState } from 'store/types'
import { AppRouter } from 'config/router'

export async function render(uri: string): Promise<{
  initialStore: { auth: AuthState }
  renderResult: string
  styleText: string
}> {
  const cache = createCache()
  const styleText = extractStyle(cache)
  const store = setupStore()
  const initialStore = store.getState()

  const renderResult = renderToString(
    <Provider store={store}>
      <StyleProvider cache={cache}>
        <StaticRouter location={uri}>
          <AppRouter />
        </StaticRouter>
      </StyleProvider>
    </Provider>
  )
  return { initialStore, renderResult, styleText }
}
