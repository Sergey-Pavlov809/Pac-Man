import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/reducer'
import gameReducer from './modules/game/reducer'
import LeaderBoardReducer from './modules/leaderboard/reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    leaderBoard: LeaderBoardReducer,
  },
})
