import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AUTHORIZATION_STATUS } from '../../../utils/consts'
import { AuthState, RootState } from '../../types'
import yApiService from '../../../services/y-api-service'
import { message } from 'antd'

const initialState: AuthState = {
  id: null,
  display_name: null,
  email: null,
  login: null,
  phone: null,
  first_name: null,
  second_name: null,
  avatar: null,
  password: null,
  authorizedStatus: AUTHORIZATION_STATUS.UNKNOWN,
}

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async () => {
    try {
      const response = await yApiService.getUser()

      return response
    } catch (error) {
      message.error(`Ошибка загрузки файла: ${error}`)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchUserData.pending, state => {
      state.authorizedStatus = AUTHORIZATION_STATUS.LOADING
    })
    addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.id = payload.id
      state.display_name = payload.display_name
      state.email = payload.email
      state.login = payload.login
      state.phone = payload.phone
      state.first_name = payload.first_name
      state.second_name = payload.second_name
      state.avatar = payload.avatar
      state.authorizedStatus = AUTHORIZATION_STATUS.AUTH
    })
    addCase(fetchUserData.rejected, state => {
      state.authorizedStatus = AUTHORIZATION_STATUS.NO_AUTH
    })
  },
})

const authReducer = authSlice.reducer

export const selectAuth = (state: RootState): AuthState => state.authReducer

export default authReducer
