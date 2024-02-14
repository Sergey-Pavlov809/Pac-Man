import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ThemeState, RootState } from 'store/types'
import { UserTheme } from 'types/FormApi'

const initialState: ThemeState = {
  userTheme: 'light',
  status: 'idle',
  error: null,
}

export const fetchTheme = createAsyncThunk(
  'theme/fetchTheme',
  async (_userId: number, { rejectWithValue }) => {
    try {
      const theme: 'light' | 'dark' = 'light'
      return Promise.resolve(theme) //await backendService.getUserTheme(userId)
    } catch (error) {
      return rejectWithValue(`Ошибка загрузки данных: ${error}`)
    }
  }
)

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setUserTheme: (state, action) => {
      state.userTheme = action.payload
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchTheme.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    addCase(fetchTheme.fulfilled, (state, { payload }) => {
      state.userTheme = payload
      state.status = 'succeeded'
    })
    addCase(fetchTheme.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
        ? String(action.payload)
        : 'Неизвестная ошибка'
    })
  },
})

const themeReducer = themeSlice.reducer

export const selectTheme = (state: RootState): ThemeState => state.theme
export const { setUserTheme } = themeSlice.actions

export const getUserTheme = (state: RootState): UserTheme =>
  state.theme.userTheme

export default themeReducer
