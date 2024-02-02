import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/reducer'
import gameReducer from './modules/game/reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
})
