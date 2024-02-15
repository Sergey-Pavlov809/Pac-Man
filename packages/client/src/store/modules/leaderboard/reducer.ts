import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import yApiService from 'services/y-api-service'
import { message } from 'antd'
import { LeaderBoardState, RootState } from 'store/types'

const initialState: LeaderBoardState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchLeaderBoard = createAsyncThunk(
  'leaderboard/fetchLeaderBoard',
  async (_, { rejectWithValue }) => {
    try {
      return await yApiService.getLeaderBoard()
    } catch (error) {
      message.error(`Ошибка загрузки данных: ${error}`)
      return rejectWithValue(`Ошибка загрузки данных: ${error}`)
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
    addCase(fetchLeaderBoard.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    addCase(fetchLeaderBoard.fulfilled, (state, { payload }) => {
      state.items =
        payload?.map((item, i) => {
          return { rank: i + 1, key: i, ...item.data }
        }) ?? []
      state.status = 'succeeded'
    })
    addCase(fetchLeaderBoard.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
        ? String(action.payload)
        : 'Неизвестная ошибка'
    })
  },
})

const LeaderBoardReducer = leaderBoardSlice.reducer

export const selectLeaderBoard = (state: RootState): LeaderBoardState =>
  state.leaderBoard

export default LeaderBoardReducer
