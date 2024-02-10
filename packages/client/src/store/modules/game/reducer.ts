import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/types'

type GameState = {
  score: number
}

const initialState: GameState = {
  score: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<GameState['score']>) => {
      state.score = action.payload
    },
  },
})

export const selectGame = (state: RootState): GameState => state.game

export const { setScore } = gameSlice.actions

export default gameSlice.reducer
