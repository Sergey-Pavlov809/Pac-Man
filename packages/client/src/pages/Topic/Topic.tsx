import {
  Avatar,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Typography,
} from 'antd'
import { useEffect, useState, JSX } from 'react'
import { useLocation } from 'react-router-dom'

import defaultAvatar from '../../assets/defaultAvatar.png'
import { ForumApi, IComment, ITopic } from '../../services'
import css from './Topic.module.css'
import { getHumanReadableDate } from '../../utils/getHumanReadableDate'

const { Title, Text } = Typography

export function Topic(): JSX.Element {
  const { pathname } = useLocation()
  const path = pathname.split('/')
  const topicId = path[path.length - 1]
  const [form] = Form.useForm()
  const [topic, setTopic] = useState<ITopic | null>(null)
  const [comments, setComments] = useState<IComment[]>([])
  const forumApi = new ForumApi()
  const loadData = async (): Promise<void> => {
    const topic = await forumApi.getTopicById(Number(topicId))
    const comments = await forumApi.getComments()

    setTopic(topic)
    setComments(comments)
  }
  const addComment = ({ comment }: { comment: string }): void => {
    setComments(comments => [
      ...comments,
      {
        id: comments.length,
        createdAt: new Date().toDateString(),
        content: comment,
        user: {
          username: `Test user ${comments.length}`,
        },
      },
    ])
    form.resetFields()
  }

  useEffect(() => {
    loadData().then()
  }, [])

  return (
    <Flex className={css.topic} vertical={true}>
      <Title level={2}>{topic?.title}</Title>
      <Text className={css.topicContent}>{topic?.content}</Text>
      <List
        dataSource={comments}
        renderItem={({ user, content, createdAt }): JSX.Element => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={defaultAvatar} />}
              title={user.username}
              description={content}
            />
            <p>{getHumanReadableDate(createdAt)}</p>
          </List.Item>
        )}
      />
      <Divider />
      <Form form={form} className={css.form} onFinish={addComment}>
        <Form.Item
          name="comment"
          rules={[{ required: true, message: 'Введите комментарий' }]}>
          <Input.TextArea placeholder="Введите комментарий" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}
