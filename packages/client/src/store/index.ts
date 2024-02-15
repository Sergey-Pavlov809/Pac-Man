import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/reducer'
import gameReducer from './modules/game/reducer'
import leaderBoardReducer from './modules/leaderboard/reducer'
import { AppWindow } from 'types/Window'

// Объявите initialState здесь, если оно у вас есть, иначе установите его в значение по умолчанию
const initialState = {}

export const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  leaderBoard: leaderBoardReducer,
})

let preloadedState = initialState

if (typeof window !== 'undefined') {
  // Обновляем начальное состояние, если было что-то передано из SSR сборки с сервера
  preloadedState = (window as AppWindow)['__PRELOADED_STATE__'] ?? initialState
  delete (window as AppWindow)['__PRELOADED_STATE__']
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
})
