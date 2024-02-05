import { FC, useEffect } from 'react'
import { Table } from 'antd'

import css from './LeaderBoard.module.css'
import {
  fetchLeaderBoard,
  selectLeaderBoard,
} from '../../store/modules/leaderboard/reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { ratingFieldName } from '../../utils/consts'

const columns = [
  { title: 'Ранг', dataIndex: 'rank', key: 'rank' },
  { title: 'Имя пользователя', dataIndex: 'userName', key: 'userName' },
  {
    title: 'Количество очков',
    dataIndex: ratingFieldName,
    key: ratingFieldName,
  },
]

export const LeaderBoard: FC = () => {
  const { items } = useAppSelector(selectLeaderBoard)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLeaderBoard())
  }, [])

  return (
    <Table
      className={css.table}
      dataSource={items}
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
