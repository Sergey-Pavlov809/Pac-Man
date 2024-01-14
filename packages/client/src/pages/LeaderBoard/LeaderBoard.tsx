import { FC } from 'react'
import { Table } from 'antd'

import css from './LeaderBoard.module.css'

interface ILeaderBoardField {
  userName: string
  highScore: number
  rank: number
}

const leadersMock: ILeaderBoardField[] = [
  { rank: 1, userName: 'test user 1', highScore: 100500 },
  { rank: 2, userName: 'test user 2', highScore: 82000 },
  { rank: 3, userName: 'test user 3', highScore: 77000 },
  { rank: 4, userName: 'test user 4', highScore: 56000 },
  { rank: 5, userName: 'test user 5', highScore: 42000 },
  { rank: 6, userName: 'test user 6', highScore: 28000 },
  { rank: 7, userName: 'test user 7', highScore: 12300 },
  { rank: 8, userName: 'test user 8', highScore: 12000 },
  { rank: 9, userName: 'test user 9', highScore: 8600 },
  { rank: 10, userName: 'test user 10', highScore: 4200 },
  { rank: 11, userName: 'test user 11', highScore: 6500 },
  { rank: 12, userName: 'test user 12', highScore: 1200 },
]

export const LeaderBoard: FC = () => {
  const dataSource: Array<ILeaderBoardField & { key: number }> =
    leadersMock.map(item => ({ ...item, key: item.rank }))
  const columns = [
    { title: 'Ранг', dataIndex: 'rank', key: 'rank' },
    { title: 'Имя пользователя', dataIndex: 'userName', key: 'userName' },
    {
      title: 'Количество очков',
      dataIndex: 'highScore',
      key: 'highScore',
      sorter: (a: ILeaderBoardField, b: ILeaderBoardField): number =>
        b.highScore - a.highScore,
    },
  ]

  return (
    <Table
      className={css.table}
      dataSource={dataSource}
      columns={columns}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 15, 20],
        locale: { items_per_page: '/ страницу' },
      }}
    />
  )
}
