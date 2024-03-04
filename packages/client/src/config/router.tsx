import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '../components'
import {
  Main,
  Profile,
  GamePage,
  SignUp,
  SignIn,
  LeaderBoard,
  Forum,
  Topic,
  NotFoundPage,
  ServerErrorPage,
} from '../pages'

import { routes } from 'config/routes'
import { useAppDispatch, useAppSelector } from 'hooks'
import { fetchUserData, selectIsAuthorized } from 'store/modules/auth/reducer'
import { ProtectedRoute } from './protected-route'

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuthorized = useAppSelector(selectIsAuthorized)

  React.useEffect(() => {
    if (!isAuthorized) {
      dispatch(fetchUserData())
    }
  }, [dispatch, isAuthorized])

  return (
    <Routes>
      <Route element={<AppLayout />} errorElement={<ServerErrorPage />}>
        <Route path={routes.app()} element={<Main />}></Route>
        <Route
          path={routes.profile()}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }></Route>
        <Route path={routes.game()} element={<GamePage />}></Route>
        <Route
          path={routes.leaderboard()}
          element={
            <ProtectedRoute>
              <LeaderBoard />
            </ProtectedRoute>
          }></Route>
        <Route
          path={routes.forum()}
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }></Route>
        <Route
          path={routes.topic()}
          element={
            <ProtectedRoute>
              <Topic />
            </ProtectedRoute>
          }></Route>
        <Route path={routes.signin()} element={<SignIn />}></Route>
        <Route path={routes.signup()} element={<SignUp />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  )
}
