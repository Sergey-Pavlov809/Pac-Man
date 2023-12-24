import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo } from '../../../api/auth'
import { AUTHORIZATION_STATUS } from '../../../utils/consts'
import { AuthState } from '../../types'

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

export const fetchUserData = createAsyncThunk('fetchUserData', async () => {
  const response = await getUserInfo()

  return response
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchUserData.pending, state => {
      state.authorizedStatus = AUTHORIZATION_STATUS.UNKNOWN
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

export default authSlice.reducer
