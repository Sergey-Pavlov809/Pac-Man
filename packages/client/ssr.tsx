import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { setupStore } from './src/store'

//import { RootBoundary } from 'components/RootBoundary'
import { AppRouter } from 'config/router'
import { AuthState } from 'store/types'

export async function render(
  uri: string
): Promise<{ initialStore: { auth: AuthState }; renderResult: string }> {
  const store = setupStore()
  const initialStore = store.getState()
  const renderResult = renderToString(
    <Provider store={store}>
      <StaticRouter location={uri}>
        <AppRouter />
      </StaticRouter>
    </Provider>
  )
  return { initialStore, renderResult }
}
