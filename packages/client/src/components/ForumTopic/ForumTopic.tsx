import * as React from 'react'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { Card, Typography } from 'antd'
import { Link } from 'react-router-dom'

interface ForumTopicProps {
  id: number
  title: string
  body: string
  isRemovable?: boolean
  onActionClick?: () => void
  extra?: boolean
}

export const ForumTopic: React.FC<ForumTopicProps> = ({
  id,
  title,
  body,
  isRemovable = false,
  extra = true,
  onActionClick,
}) => (
  <Card
    key={id}
    title={title}
    actions={[isRemovable && <DeleteOutlined onClick={onActionClick} />].filter(
      Boolean
    )}
    extra={extra ? <Link to={`/forum/${id}`}>Читать подробнее</Link> : null}>
    <Typography.Text>{body}</Typography.Text>
  </Card>
)
