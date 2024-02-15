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

export type TopicIdPayload = {
  theme_id: ForumTopic['id']
}

export type CreateTopicPayload = Omit<ForumTopic, 'id' | 'user_id'>

export type CreateCommentPayload = Pick<ForumComment, 'message' | 'theme_id'>
