import * as React from 'react'
import { Card, Flex, Modal, Skeleton, message } from 'antd'
import { useAppDispatch, useAppSelector } from 'hooks'
import { removeTopicById, selectForum } from 'store/modules/forum/reducer'
import { selectAuth } from 'store/modules/auth/reducer'
import { ForumTopic } from 'components/index'

export const ForumTopicsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const topics = useAppSelector(selectForum).topics
  const userId = useAppSelector(selectAuth).id
  const isTopicsLoading = useAppSelector(selectForum).topicsStatus === 'loading'

  const createModal = (topicId: number): void => {
    Modal.confirm({
      title: 'Удаление темы',
      content: 'Вы уверены, что хотите удалить тему?',
      okText: 'Да, удалить',
      onOk: (): Promise<void> =>
        dispatch(
          removeTopicById({
            theme_id: topicId,
            user: {
              id: userId,
            },
          })
        )
          .unwrap()
          .then(() => {
            message.success('Тема удалена')
          })
          .catch(() => {
            message.error('Ошибка удаления темы')
          }),
      okButtonProps: { danger: true },
      cancelText: 'Отменить',
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    })
  }

  if (isTopicsLoading) {
    return [...Array(5)].map((_, idx) => (
      <Flex vertical gap={4} key={idx}>
        <Card>
          <Skeleton loading={isTopicsLoading} paragraph={{ rows: 2 }} active />
        </Card>
      </Flex>
    ))
  }

  if (topics.length !== 0) {
    return topics.map(({ id, title, body, user_id }) => {
      const isRemovable = userId === user_id

      return (
        <ForumTopic
          key={id}
          id={id}
          title={title}
          body={body}
          isRemovable={isRemovable}
          onActionClick={(): void => createModal(id)}
        />
      )
    })
  }
}
