import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Main, Profile, GamePage, SignUp } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import { routes } from './routes'
import { AppLayout, RootBoundary } from './components'
import 'antd/dist/reset.css'
import './index.css'
import NotFoundPage from './pages/404/404'

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
    <RouterProvider router={router} fallbackElement={<RootBoundary />} />
  </React.StrictMode>
)
