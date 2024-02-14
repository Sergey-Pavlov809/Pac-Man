import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ForumState, RootState } from 'store/types'
import { ForumApi } from 'services/index'
import { message } from 'antd'
import {
  CreateCommentPayload,
  CreateTopicPayload,
  ForumComment,
  ForumTopic,
  GetTopicCommentsPayload,
  RemoveTopicByIdPayload,
} from 'types/ForumApi'

const initialState: ForumState = {
  topics: [],
  comments: [],
  topicsStatus: 'idle',
  createTopicStatus: 'idle',
  removeTopicStatus: 'idle',
  commentsStatus: 'idle',
}

export const getTopics = createAsyncThunk(
  'forum/getTopics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await new ForumApi().getTopics()
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const result = await response.json()
      return result.data as ForumTopic[]
    } catch (error) {
      message.error(`Ошибка получения тем: ${error}`)
      return rejectWithValue(error)
    }
  }
)

export const postTopic = createAsyncThunk(
  'forum/postTopic',
  async (payload: CreateTopicPayload, { rejectWithValue }) => {
    try {
      const response = await new ForumApi().createTopic({
        title: payload.title.trim(),
        body: payload.body.trim(),
        user: payload.user,
      })
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const result = await response.json()
      return result.data as ForumTopic[]
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const removeTopicById = createAsyncThunk(
  'forum/removeTopicById',
  async (payload: RemoveTopicByIdPayload, { rejectWithValue }) => {
    try {
      const response = await new ForumApi().removeTopicById(payload)
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const result = await response.json()
      return result.data as ForumTopic[]
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getTopicComments = createAsyncThunk(
  'forum/getTopicComments',
  async (payload: GetTopicCommentsPayload, { rejectWithValue }) => {
    try {
      const response = await new ForumApi().getTopicComments(payload)
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const result = await response.json()
      return result.data.messages as ForumComment[]
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const postComment = createAsyncThunk(
  'forum/postComment',
  async (payload: CreateCommentPayload, { rejectWithValue }) => {
    try {
      const response = await new ForumApi().postComment(payload)
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const result = await response.json()
      return result.data as ForumComment[]
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getTopics.pending, state => {
      state.topicsStatus = 'loading'
    })
    addCase(getTopics.fulfilled, (state, { payload }) => {
      state.topicsStatus = 'succeeded'
      state.topics = payload
    })
    addCase(postTopic.pending, state => {
      state.createTopicStatus = 'loading'
    })
    addCase(postTopic.fulfilled, (state, { payload }) => {
      state.createTopicStatus = 'succeeded'
      state.topics = payload
    })
    addCase(removeTopicById.pending, state => {
      state.removeTopicStatus = 'loading'
    })
    addCase(removeTopicById.fulfilled, (state, { payload }) => {
      state.removeTopicStatus = 'succeeded'
      state.topics = payload
    })
    addCase(getTopicComments.pending, state => {
      state.commentsStatus = 'loading'
    })
    addCase(getTopicComments.fulfilled, (state, { payload }) => {
      state.commentsStatus = 'succeeded'
      state.comments = payload
    })
    addCase(postComment.fulfilled, (state, { payload }) => {
      state.commentsStatus = 'succeeded'
      state.comments = payload
    })
  },
})

const forumReducer = forumSlice.reducer

export const selectForum = (state: RootState): ForumState => state.forum

export default forumReducer
