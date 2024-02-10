import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import yApiService from '../../../services/y-api-service'
import { message } from 'antd'
import { LeaderBoardState, RootState } from '../../types'

const initialState: LeaderBoardState = {
  items: [],
}

export const fetchLeaderBoard = createAsyncThunk(
  'leaderboard/fetchLeaderBoard',
  async _ => {
    try {
      const response = await yApiService.getLeaderBoard()
      return response
    } catch (error) {
      message.error(`Ошибка загрузки данных: ${error}`)
    }
  }
)

export const postScores = createAsyncThunk(
  'leaderboard/postScores',
  async (
    { login, scores }: { login: string; scores: number },
    { rejectWithValue }
  ) => {
    try {
      await yApiService.postScores(login, scores)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchLeaderBoard.fulfilled, (state, { payload }) => {
      state.items =
        payload?.map((item, i) => {
          return { rank: i + 1, key: i, ...item.data }
        }) ?? []
    })
  },
})

const LeaderBoardReducer = leaderBoardSlice.reducer

export const selectLeaderBoard = (state: RootState): LeaderBoardState =>
  state.leaderBoard

export default LeaderBoardReducer
