import * as React from 'react'
import { Button, Flex, Typography, Form, message, Row, Col } from 'antd'
import css from './Forum.module.css'
import { AddTopicModal, ForumTopicsList } from 'components/index'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getTopics, postTopic, selectForum } from 'store/modules/forum/reducer'
import { CreateTopicPayload } from 'types/ForumApi'
import { selectAuth } from 'store/modules/auth/reducer'
const { Title } = Typography

export const Forum: React.FC = () => {
  const dispatch = useAppDispatch()
  const isCreateTopicLoading =
    useAppSelector(selectForum).createTopicStatus == 'loading'
  const userId = useAppSelector(selectAuth).id

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [form] = Form.useForm()

  React.useEffect(() => {
    dispatch(getTopics())
  }, [dispatch])

  const openAddTopicModal = (): void => setIsModalOpen(true)
  const closeAddTopicModal = (): void => setIsModalOpen(false)

  const handleClose = (): void => {
    form.resetFields()
    closeAddTopicModal()
  }

  const handleSubmit = (values: CreateTopicPayload): void => {
    if (isCreateTopicLoading) {
      return
    }

    dispatch(postTopic({ ...values, user: { id: userId } }))
      .unwrap()
      .then(() => {
        message.success('Тема успешно создана')
        handleClose()
      })
      .catch(() => {
        message.error('Не удалось создать тему')
      })
  }

  return (
    <Row>
      <Col span={4} />
      <Col span={18}>
        <Flex justify="space-between" align="center" className={css.forum}>
          <Title level={2}>Обсуждения</Title>
          <Button onClick={openAddTopicModal}>Создать топик</Button>
        </Flex>
        <Flex vertical gap="middle">
          <ForumTopicsList />
        </Flex>
        <AddTopicModal
          loading={isCreateTopicLoading}
          form={form}
          handleSubmit={handleSubmit}
          isOpen={isModalOpen}
          handleClose={handleClose}
        />
      </Col>
      <Col span={4} />
    </Row>
  )
}
