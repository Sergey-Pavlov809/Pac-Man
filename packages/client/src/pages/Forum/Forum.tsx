import { Button, Card, Flex, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'

import css from './Forum.module.css'
import { ForumApi, ITopic } from '../../services'
import { AddTopicModal } from '../../components'
import { getHumanReadableDate } from '../../utils/getHumanReadableDate'

const { Title } = Typography

export const Forum: FC = () => {
  const [topics, setTopics] = useState<ITopic[]>([])
  const forumApi = new ForumApi()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openAddTopicModal = (): void => setIsModalOpen(true)
  const closeAddTopicModal = (): void => setIsModalOpen(false)
  const handleAddTopic = (topic: ITopic): void => {
    setTopics(topics => [topic, ...topics])
  }

  useEffect(() => {
    forumApi.getTopics().then(topics => {
      setTopics(topics)
    })
  }, [])

  return (
    <Flex className={css.forum}>
      <Space direction="vertical" className={css.topicList}>
        <Flex className={css.forumHeader}>
          <Title level={2}>Обсуждения</Title>
          <Button onClick={openAddTopicModal}>Создать топик</Button>
        </Flex>
        <AddTopicModal
          isOpen={isModalOpen}
          handleAddTopic={handleAddTopic}
          closeAddTopicModal={closeAddTopicModal}
        />
        {topics.map(({ id, title, content, createdAt, updatedAt }) => (
          <Card
            key={id}
            className={css.topic}
            title={title}
            extra={
              <Link className={css.topicLink} to={`/forum/${id}`}>
                Читать подробнее
              </Link>
            }>
            <p className={css.topicTitle}>
              {content ?? 'Описание отсутствует'}
            </p>
            <span className={css.topicTime}>
              {content
                ? getHumanReadableDate(updatedAt)
                : getHumanReadableDate(createdAt)}
            </span>
          </Card>
        ))}
      </Space>
    </Flex>
  )
}
