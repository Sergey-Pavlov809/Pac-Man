import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <div>/sign-up</div>,
  },
  {
    path: '/profile',
    element: <div>/profile</div>,
  },
  {
    path: '/main',
    element: <div>/main</div>,
  },
  {
    path: '/game',
    element: <div>/game</div>,
  },
  {
    path: '/leaderboard',
    element: <div>/leaderboard</div>,
  },
  {
    path: '/chat',
    element: <div>/chat</div>,
  },
  {
    path: '/topic',
    element: <div>/topic</div>,
  },
  {
    path: '*',
    element: <div>*</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
