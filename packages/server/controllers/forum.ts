import { ForumMessage, ForumMessageReaction, ForumTheme } from '../db'

import type { Request, Response } from 'express'

async function createFirstForumTheme(res: Response): Promise<void> {
  const themeData = {
    user_id: 224437,
    title: 'Вопросы разработчикам',
    body: 'Какой-то текст',
  }
  const messageData = {
    theme_id: 1,
    user_id: 224437,
    user_avatar:
      '/2185cd69-d06c-43c4-815e-20a7e1fa59c8/0ec6586e-6519-4e27-a1c3-d52fc90ec9a4_mainPhoto.jpg',
    user_display_name: 'Evg',
    message: 'Оставьте свой вопрос разработчикам!',
  }
  const reactionData = {
    theme_id: 1,
    message_id: 1,
    user_id: 224437,
  }

  try {
    await ForumTheme.create(themeData)
    await ForumMessage.create(messageData)
    await ForumMessageReaction.create(reactionData)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export const Forum = {
  getThemes: async (_req: Request, res: Response): Promise<void> => {
    try {
      let themes = await ForumTheme.findAll()
      if (!themes.length) {
        await createFirstForumTheme(res)
        themes = await ForumTheme.findAll()
      }
      res.status(200).json({ data: themes })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },
  postTheme: async (req: Request, res: Response): Promise<void> => {
    try {
      const user_id = req.body.user.id
      const title = req.body.title
      const body = req.body.body
      await ForumTheme.create({ user_id, title, body })
      const themes = await ForumTheme.findAll()
      res.status(200).json({ data: themes })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },
  deleteTheme: async (req: Request, res: Response): Promise<void> => {
    try {
      const theme_id = +req.params.theme_id
      const theme = await ForumTheme.findByPk(theme_id)
      //@ts-ignore
      if (theme?.user_id === req.body.user.id) {
        await theme?.destroy()
        const themes = await ForumTheme.findAll()
        res.status(200).json({ data: themes })
      } else {
        res.status(400).json({ error: 'Пользователь не найден!' })
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },
  getMessages: async (req: Request, res: Response): Promise<void> => {
    try {
      const theme_id = +req.params.theme_id
      const messages = await ForumMessage.findAll({ where: { theme_id } })
      const reactions = await ForumMessageReaction.findAll({
        where: { theme_id },
      })
      res.status(200).json({ data: { messages, reactions } })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },
  postMessage: async (req: Request, res: Response): Promise<void> => {
    try {
      const theme_id = +req.body.theme_id

      // eslint-disable-next-line no-unsafe-optional-chaining
      const { display_name, avatar, id } = req?.body?.user
      const messageData = {
        message: req.body.message,
        user_id: id,
        user_display_name: display_name,
        user_avatar: avatar,
        theme_id,
      }
      await ForumMessage.create({ ...messageData })
      const themes = await ForumMessage.findAll({ where: { theme_id } })
      res.status(200).json({ data: themes })
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },
}
