export interface ForumTopic {
  id: number
  title: string
  body: string
  user_id: number
}

export interface ForumComment {
  id: number
  createdAt: string
  message: string
  avatar?: string
  theme_id: number
  user_display_name: string
  user_id: number
}

type UserInfoPayload = {
  user: { id: number | null }
}

export type RemoveTopicByIdPayload = {
  theme_id: ForumTopic['id']
} & UserInfoPayload

export type GetTopicCommentsPayload = ForumTopic['id']

export type CreateTopicPayload = Omit<ForumTopic, 'id' | 'user_id'> &
  UserInfoPayload

export type CreateCommentPayload = Pick<
  ForumComment,
  'message' | 'theme_id'
> & {
  user: {
    avatar: string | null
    display_name: string | null
  }
  user_id: number | null
}
