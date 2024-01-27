export interface ITopic {
  id: number
  title: string
  content?: string
  createdAt: string
  updatedAt: string
}

export interface IComment {
  id: number
  createdAt: string
  content: string
  avatar?: string
  user: {
    avatar?: string
    username: string
  }
}

const TOPICS_MOCK: ITopic[] = [
  {
    id: 1,
    title: 'first topic',
    createdAt: '2023-01-02T14:22:22.000Z',
    updatedAt: '2023-01-02T14:22:22.000Z',
  },
  {
    id: 2,
    title: 'second topic',
    content: 'Совершенно не понимаю, как играть без клавиатуры',
    createdAt: '2023-01-02T14:22:22.000Z',
    updatedAt: '2023-01-02T14:22:22.000Z',
  },
  {
    id: 3,
    title: 'Боты слишком быстро двигаются',
    content: 'Сделайте их медленнее',
    createdAt: '2023-01-02T14:22:22.000Z',
    updatedAt: '2023-01-02T14:22:22.000Z',
  },
  {
    id: 4,
    title: 'Боты слишком медленно двигаются',
    content:
      'Сделайте их намного быстрее, потому что я итак поставил 100500 рекордов и мне скучно',
    createdAt: '2023-01-02T14:22:22.000Z',
    updatedAt: '2023-01-02T14:22:22.000Z',
  },
  {
    id: 5,
    title:
      'Pac-Man - классика аркадных игр: историческая справка, геймплей и советы по выживанию в опасном лабиринте',
    content:
      'Pac-Man - классика аркадных игр: историческая справка, геймплей и советы по выживанию в опасном лабиринте',
    createdAt: '2023-01-02T14:22:22.000Z',
    updatedAt: '2023-01-02T14:22:22.000Z',
  },
  {
    id: 6,
    title:
      'Pac-Man: ностальгический обзор классической аркады с советами по прохождению лабиринтов и поглощению точек',
    content:
      'Pac-Man: ностальгический обзор классической аркады с советами по прохождению лабиринтов и поглощению точек',
    createdAt: '2023-01-02T14:22:22.000Z',
    updatedAt: '2023-01-02T14:22:22.000Z',
  },
  {
    id: 7,
    title:
      'Как добиться лучших результатов в игре Pac-Man? Поделитесь своими стратегиями и хитростями.',
    content:
      'Как добиться лучших результатов в игре Pac-Man? Поделитесь своими стратегиями и хитростями.',
    createdAt: '2023-01-02T14:22:22.000Z',
    updatedAt: '2023-01-02T14:22:22.000Z',
  },
  {
    id: 8,
    title: 'История игры',
    content:
      'Pac-Man, известный также как Пак-Мэн, является аркадным видеоигрой, разработанной японской компанией Namco в 1980 году. Игра представляет собой классический головоломку, где главный герой, Пак-Мэн, должен собирать точки, избегая встречи с привидениями.',
    createdAt: '2023-01-02T14:22:22.000Z',
    updatedAt: '2023-01-02T14:22:22.000Z',
  },
]

export class ForumApi {
  async getTopics(): Promise<ITopic[]> {
    return TOPICS_MOCK
  }

  async getTopicById(id: number): Promise<ITopic | null> {
    return TOPICS_MOCK.find(topic => topic.id === id) ?? null
  }

  async getComments(): Promise<IComment[]> {
    const comments: IComment[] = []

    for (let i = 0; i < 20; i++) {
      comments.push({
        id: i,
        createdAt: new Date().toISOString(),
        content: `Тестовый комментарий ${i}`,
        user: {
          username: `Test user ${i}`,
        },
      })
    }

    return comments
  }
}
