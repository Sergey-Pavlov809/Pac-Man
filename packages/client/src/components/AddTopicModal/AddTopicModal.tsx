import * as React from 'react'
import { Form, FormInstance, Input, Modal } from 'antd'
import { CreateTopicPayload } from 'types/ForumApi'
interface AddTopicModalProps {
  loading: boolean
  form: FormInstance
  isOpen: boolean
  handleSubmit: (values: CreateTopicPayload) => void
  handleClose: () => void
}

export const AddTopicModal: React.FC<AddTopicModalProps> = ({
  form,
  loading,
  handleSubmit,
  handleClose,
  isOpen,
}) => {
  return (
    <Modal
      title="Добавить новое обсуждение"
      centered
      open={isOpen}
      onCancel={handleClose}
      okText="Добавить"
      okType="primary"
      okButtonProps={{
        form: 'add_topic',
        htmlType: 'submit',
      }}
      confirmLoading={loading}
      cancelText="Закрыть"
      footer={(_, { OkBtn, CancelBtn }): React.ReactNode => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}>
      <Form id="add_topic" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Тема"
          name="title"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Введите название темы' }]}>
          <Input placeholder="Название темы" maxLength={30} />
        </Form.Item>

        <Form.Item
          label="Содержание"
          name="body"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Введите содержание темы' }]}>
          <Input.TextArea
            placeholder="Содержание темы"
            rows={4}
            maxLength={100}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
