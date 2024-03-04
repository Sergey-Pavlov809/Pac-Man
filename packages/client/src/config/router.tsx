import * as React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

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
import { useAppDispatch, useAppSelector, useQuery } from 'hooks'
import {
  fetchUserData,
  loginWithYandex,
  selectIsAuthorized,
} from 'store/modules/auth/reducer'
import { ProtectedRoute } from './protected-route'

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const search = useQuery()
  const isAuthorized = useAppSelector(selectIsAuthorized)

  React.useEffect(() => {
    const code = search.get('code')
    if (code) {
      dispatch(
        loginWithYandex({
          code,
          redirect_uri: window.location.origin,
        })
      )
        .unwrap()
        .then(() => {
          navigate(routes.app())
        })
    }
    if (!code && !isAuthorized) {
      dispatch(fetchUserData())
    }
  }, [dispatch, isAuthorized, navigate, search])

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
        <Route
          path={routes.game()}
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }></Route>
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
