import {
  Avatar,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Row,
  Col,
  Empty,
  Typography,
  Skeleton,
} from 'antd'
import * as React from 'react'
import { useParams } from 'react-router-dom'

import defaultAvatar from 'assets/defaultAvatar.png'
import { getHumanReadableDate } from 'utils/getHumanReadableDate'
import {
  useAppDispatch,
  useAppSelector,
  useIsomorphicLayoutEffect,
} from 'hooks'
import {
  selectCommentsByTopicId,
  selectTopicById,
} from 'store/modules/forum/selectors'
import { ForumTopic } from 'components/ForumTopic'
import {
  getTopicComments,
  getTopics,
  postComment,
  selectForum,
} from 'store/modules/forum/reducer'

import css from './Topic.module.css'

export const Topic: React.FC = () => {
  const params = useParams()
  const theme_id = Number(params.forumId)
  const scrollableRef = React.useRef<HTMLDivElement | null>(null)

  const topic = useAppSelector(selectTopicById(theme_id))
  const isTopicLoading = useAppSelector(selectForum).topicsStatus === 'loading'
  const comments = useAppSelector(selectCommentsByTopicId(theme_id))

  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  React.useEffect(() => {
    dispatch(getTopics())
    dispatch(getTopicComments({ theme_id }))
  }, [dispatch, theme_id])

  useIsomorphicLayoutEffect(() => {
    scrollableRef.current?.scrollTo({
      left: 0,
      top: scrollableRef.current?.scrollHeight,
      behavior: 'smooth',
    })
  }, [comments])

  const addComment = ({ message }: { message: string }): void => {
    dispatch(
      postComment({
        message: message.trim(),
        theme_id,
      })
    )
    form.resetFields()
  }

  if (isTopicLoading) {
    return (
      <Row>
        <Col span={4} />
        <Col span={18}>
          <Skeleton />
        </Col>
        <Col span={4} />
      </Row>
    )
  }

  if (!topic) {
    return (
      <Empty
        description={
          <Typography.Text>Похоже, здесь ничего нет</Typography.Text>
        }
      />
    )
  }

  return (
    <Row style={{ height: '100%' }}>
      <Col span={4} />
      <Col span={18} style={{ height: '100%' }}>
        <Flex className={css.topic} vertical={true}>
          <ForumTopic {...topic} extra={false} />
          <div ref={scrollableRef} className={css.scrollable}>
            <List
              dataSource={comments}
              locale={{ emptyText: 'Здесь еще ни одного комментария' }}
              renderItem={({
                user_display_name,
                message,
                createdAt,
              }): React.ReactNode => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={defaultAvatar} />}
                    title={user_display_name}
                    description={message}
                  />
                  <p>{getHumanReadableDate(createdAt)}</p>
                </List.Item>
              )}
            />
          </div>
          <Divider />
          <Form form={form} className={css.form} onFinish={addComment}>
            <Form.Item
              name="message"
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
      </Col>
      <Col span={4} />
    </Row>
  )
}
