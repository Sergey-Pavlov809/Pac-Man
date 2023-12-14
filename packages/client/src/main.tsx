import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Main } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import './index.css'
import 'antd/dist/reset.css'
import { RootBoundary } from './components/RootBoundary'

const router = createBrowserRouter([
  {
    path: routes.app(),
    element: <App />,
  },
  {
    path: routes.signin(),
    element: <div>/sign-in</div>,
  },
  {
    path: routes.signup(),
    element: <div>/sign-up</div>,
  },
  {
    path: routes.profile(),
    element: <div>/profile</div>,
  },
  {
    path: routes.main(),
    element: <Main />,
  },
  {
    path: routes.game(),
    element: <div>/game</div>,
  },
  {
    path: routes.leaderboard(),
    element: <div>/leaderboard</div>,
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
    element: <div>*</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} fallbackElement={RootBoundary} />
  </React.StrictMode>
)
