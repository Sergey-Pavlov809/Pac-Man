import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Main, Profile, GamePage, SignUp, LeaderBoard } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import { routes } from './routes'
import { AppLayout, RootBoundary } from './components'
import 'antd/dist/reset.css'
import './index.css'
import NotFoundPage from './pages/404/404'
import { store } from './store'
import { Provider } from 'react-redux'
import {
  registerServiceWorker,
  unregisterServiceWorker,
} from './utils/serviceWorkerUtils'

/**
 * Активировать SW будем в production режиме, но для временно для тестов добавляю DEV
 */
if (import.meta.env.PROD || import.meta.env.DEV) {
  // TODO: при переходе на прод, убрать DEV
  registerServiceWorker(true)
} else {
  unregisterServiceWorker(true)
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: routes.app(),
        element: <App />,
      },
      {
        path: routes.profile(),
        element: <Profile />,
      },
      {
        path: routes.main(),
        element: <Main />,
      },
      {
        path: routes.game(),
        element: <GamePage />,
      },
      {
        path: routes.leaderboard(),
        element: <LeaderBoard />,
      },
      {
        path: routes.forum(),
        element: <div>/chat</div>,
      },
      {
        path: routes.topic(),
        element: <div>/topic</div>,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <AppLayout disableHeader />,
    children: [
      {
        path: routes.signin(),
        element: <SignIn />,
      },
      {
        path: routes.signup(),
        element: <SignUp />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<RootBoundary />} />
    </Provider>
  </React.StrictMode>
)
