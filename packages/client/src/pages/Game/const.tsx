import { Typography } from 'antd'

export const GAME_RULES = [
  {
    title: 'Цель',
    content: (
      <>
        Игрок управляет Пакманом, персонажем в виде круглой иконки, с помощью
        клавиш <Typography.Text keyboard>w</Typography.Text>
        <Typography.Text keyboard>a</Typography.Text>
        <Typography.Text keyboard>s</Typography.Text>
        <Typography.Text keyboard>d</Typography.Text>, чтобы пройти через
        лабиринт и съесть все желтые шарики, раскиданные по уровню.
      </>
    ),
  },
  {
    title: 'Враги',
    content:
      'По лабиринту двигаются призраки, пытаясь поймать Пакмана. Если призрак догоняет Пакмана, игрок теряет жизнь. Всего у игрока 3 жизни.',
  },
  {
    title: 'Очки',
    content:
      'Очки зарабатываются за поедание шариков, и призраков. Игрок стремится достичь максимального счета, прежде чем закончатся все жизни.',
  },
]

export const GameStatus = {
  idle: 'idle',
  in_progress: 'in_progress',
  finish: 'finish',
} as const

export const GAME_CONFIG = {
  heartImg: '❤️',
  baseSpeed: 5,
  gameWidth: 440,
  gameHeight: 520,
  totalLife: 3,
  totalScore: 0,
  countdown_max_percent: 75,
  countdown_seconds_start: 3,
  countdown_seconds_end: 0,
}
