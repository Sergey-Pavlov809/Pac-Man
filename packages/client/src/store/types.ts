import { ForumComment, ForumTopic } from 'types/ForumApi'
import { store } from './index'
import { LeaderBoardItem } from 'types/FormApi'

export interface AuthState {
  id: number | null
  first_name: string | null
  second_name: string | null
  display_name: string | null
  login: string | null
  email: string | null
  password: string | null
  phone: string | null
  avatar: string | null
  authorizedStatus: string
  yandexOAuthId?: string
}

type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface LeaderBoardState {
  items: LeaderBoardItem[] | []
  status: AsyncStatus
  error: string | null
}

export interface ForumState {
  topics: Array<ForumTopic>
  topicsStatus: AsyncStatus
  createTopicStatus: AsyncStatus
  removeTopicStatus: AsyncStatus
  comments: Array<ForumComment>
  commentsStatus: AsyncStatus
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
