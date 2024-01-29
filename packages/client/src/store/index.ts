import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/reducer'
import { AppWindow } from 'types/Window'

export const rootReducer = combineReducers({
  auth: authReducer,
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setupStore = () => {
  const preloadedState =
    typeof window !== 'undefined'
      ? (window as AppWindow).__PRELOADED_STATE__
      : undefined

  if (typeof window !== 'undefined') {
    delete (window as AppWindow).__PRELOADED_STATE__
  }

  return configureStore({
    reducer: rootReducer,
    /** Загружаем начальное состояние, которое было передано из SSR сборки с сервера */
    preloadedState,
  })
}
