import {
  CreateCommentPayload,
  CreateTopicPayload,
  ForumComment,
  RemoveTopicByIdPayload,
} from 'types/ForumApi'

export class ForumApi {
  static API = `${import.meta.env.VITE_API_ENDPOINT}/forum`

  async getTopics(): Promise<Response> {
    return fetch(`${ForumApi.API}/themes`, {
      method: 'GET',
      credentials: 'include',
    })
  }

  async removeTopicById(values: RemoveTopicByIdPayload): Promise<Response> {
    return fetch(`${ForumApi.API}/themes/${values.theme_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ user: values.user }),
    })
  }

  async getTopicComments(themeId: number): Promise<Response> {
    return fetch(`${ForumApi.API}/messages/${themeId}`, {
      method: 'GET',
      credentials: 'include',
    })
  }

  async createTopic(content: CreateTopicPayload): Promise<Response> {
    return fetch(`${ForumApi.API}/themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(content),
    })
  }

  async postComment(content: CreateCommentPayload): Promise<Response> {
    return fetch(`${ForumApi.API}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(content),
    })
  }
}
