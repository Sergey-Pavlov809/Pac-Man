import { Button, Form, Input, Modal } from 'antd'
import { FC } from 'react'
import { ITopic } from 'services/index'

interface AddTopicModalProps {
  isOpen: boolean
  handleAddTopic: (topic: ITopic) => void
  closeAddTopicModal: () => void
}

export const AddTopicModal: FC<AddTopicModalProps> = ({
  isOpen,
  handleAddTopic,
  closeAddTopicModal,
}) => {
  const [form] = Form.useForm()
  const submit = (values: { title: string; content?: string }): void => {
    handleAddTopic({
      ...values,
      id: Math.round(Math.random() * 100) + 100,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    })
    form.resetFields()
    closeAddTopicModal()
  }
  const onCancel = (): void => {
    form.resetFields()
    closeAddTopicModal()
  }

  return (
    <Modal
      title="Добавить новое обсуждение"
      centered
      open={isOpen}
      onCancel={onCancel}
      footer={[]}>
      <Form form={form} onFinish={submit}>
        <Form.Item label="Тема" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Вопрос" name="content">
          <Input.TextArea placeholder="Опишите свое предложение или вопрос" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
