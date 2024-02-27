import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AUTHORIZATION_STATUS } from 'utils/consts'
import { AuthState, RootState } from 'store/types'
import yApiService from 'services/y-api-service'
import { message } from 'antd'
import { OauthSignInRequest } from '../../../types/FormApi'

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
      return await yApiService.getUser()
    } catch (error) {
      message.error(`Ошибка загрузки информации о пользователе: ${error}`)
      return rejectWithValue(error)
    }
  }
)

export const fetchYandexId = createAsyncThunk(
  'auth/fetchYandexId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await yApiService.getServiceID()
      console.log(response)
      return response
    } catch (error) {
      message.error(`Ошибка загрузки информации ServiceID: ${error}`)
      return rejectWithValue(error)
    }
  }
)

export const loginWithYandex = createAsyncThunk(
  'auth/loginWithYandex',
  async (data: OauthSignInRequest, { rejectWithValue }) => {
    try {
      const response = await yApiService.loginWithYandex(data)
      console.log(response)
      return response
    } catch (error) {
      message.error(`Ошибка загрузки информации ServiceID: ${error}`)
      return rejectWithValue(error)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAvatar: (state, { payload }: PayloadAction<string>) => {
      state.avatar = payload
    },
  },
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
    addCase(fetchYandexId.fulfilled, (state, { payload }) => {
      state.yandexOAuthId = payload?.service_id
    })
  },
})

const authReducer = authSlice.reducer

export const { setAvatar } = authSlice.actions

export const selectAuth = (state: RootState): AuthState => state.auth

// Селектор для получения id пользователя
export const getId = (state: RootState): number | null => selectAuth(state).id

export default authReducer
