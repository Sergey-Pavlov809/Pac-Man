import * as React from 'react'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { Card, Flex, Typography } from 'antd'
import { Link } from 'react-router-dom'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'

import css from './ForumTopic.module.css'
interface ForumTopicProps {
  id: number
  title: string
  body: string
  isRemovable?: boolean
  onActionClick?: () => void
  extra?: boolean
}

type EmojiStateType = {
  id: number
  emoji: string
}

export const ForumTopic: React.FC<ForumTopicProps> = ({
  id,
  title,
  body,
  isRemovable = false,
  extra = true,
  onActionClick,
}) => {
  const [emojis, setEmojis] = React.useState<EmojiStateType[]>([])

  const handlePickEmoji =
    (id: number) =>
    ({ emoji }: EmojiClickData): void =>
      setEmojis(prev => {
        return [
          ...prev,
          {
            id,
            emoji,
          },
        ]
      })

  return (
    <Card
      key={id}
      title={title}
      actions={[
        <EmojiPicker
          key="emoji"
          reactionsDefaultOpen
          lazyLoadEmojis
          onReactionClick={handlePickEmoji(id)}
          onEmojiClick={handlePickEmoji(id)}
        />,
        isRemovable && <DeleteOutlined onClick={onActionClick} />,
      ].filter(Boolean)}
      extra={extra ? <Link to={`/forum/${id}`}>Читать подробнее</Link> : null}>
      <Typography.Text>{body}</Typography.Text>
      <Flex
        gap="small"
        justify="flex-end"
        wrap="wrap"
        style={{ marginTop: '20px' }}>
        {emojis
          .filter(({ id: topicId }) => topicId === id)
          .map(({ emoji }) => (
            <span key={emoji} className={css.emoji}>
              {emoji}
            </span>
          ))}
      </Flex>
    </Card>
  )
}
