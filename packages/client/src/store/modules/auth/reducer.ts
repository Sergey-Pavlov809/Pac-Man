import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AUTHORIZATION_STATUS } from '../../../utils/consts'
import { AuthState, RootState } from '../../types'
import yApiService from '../../../services/y-api-service'
import { message } from 'antd'
import { OAuthSingInData } from '../../../types/FormApi'

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
  yandexOAuthId: '',
}

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await yApiService.getUser()
      return response
    } catch (error) {
      message.error(`Ошибка загрузки информации о пользователе: ${error}`)
      return rejectWithValue(error)
    }
  }
)

export const fetchYandexId = createAsyncThunk<{ service_id: string }, string>(
  'fetchYandexId',
  async params => {
    const data = await yApiService.getOAuthId(params)
    return { service_id: data.service_id } // Assuming 'service_id' is present in the response data
  }
)

export const signInYandex = createAsyncThunk(
  'signInYandex',
  async (data: OAuthSingInData) => {
    await yApiService.postOAuthSignIn(data)
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.authorizedStatus = AUTHORIZATION_STATUS.LOADING
        state.authorizedStatus = AUTHORIZATION_STATUS.UNKNOWN
      })
      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.id = payload.id
        state.display_name = payload.display_name
        state.email = payload.email
        state.login = payload.login
        state.phone = payload.phone
        state.first_name = payload.first_name
        state.second_name = payload.second_name
        state.avatar = payload.avatar
        state.authorizedStatus = AUTHORIZATION_STATUS.AUTH
        state.yandexOAuthId = payload.id
      })
      .addCase(fetchUserData.rejected, state => {
        state.authorizedStatus = AUTHORIZATION_STATUS.NO_AUTH
      })
      .addCase(fetchYandexId.fulfilled, (state, { payload }) => {
        state.yandexOAuthId = payload.service_id
      })
  },
})

const authReducer = authSlice.reducer

export const selectAuth = (state: RootState): AuthState => state.auth

export const yandexOAuthIdSelector = (state: RootState): string =>
  state.auth.yandexOAuthId

export default authReducer
