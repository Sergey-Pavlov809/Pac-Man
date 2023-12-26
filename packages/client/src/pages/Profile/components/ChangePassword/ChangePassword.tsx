import * as React from 'react'
import { Modal, Form, Input, Button, Flex } from 'antd'
import { RuleObject } from 'antd/lib/form'
import { changePassword, passwordValidator } from '../../utils'
import { PasswordsType } from '../../types'

type ChangePasswordType = {
  isOpen: boolean
  closePopup: () => void
}

export const ChangePassword: React.FC<ChangePasswordType> = ({
  isOpen,
  closePopup,
}: ChangePasswordType) => {
  const [form] = Form.useForm()

  const handleChangeSuccess = (): void => {
    closePopup()
    form.resetFields()
  }

  const onFinish = (values: PasswordsType): void => {
    const { confirmNewPassword: _, ...ostData } = values
    changePassword(ostData, handleChangeSuccess)
  }

  return (
    <Modal title="Смена пароля" open={isOpen} footer="" onCancel={closePopup}>
      <Form name="changePasswordForm" onFinish={onFinish} form={form}>
        <Form.Item
          name="oldPassword"
          rules={[{ required: true, message: 'Введите старый пароль' }]}>
          <Input.Password placeholder="Старый пароль" />
        </Form.Item>
        <Form.Item name="newPassword" rules={passwordValidator}>
          <Input.Password placeholder="Новый пароль" />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          rules={[
            { required: true, message: 'Повторите новый пароль' },
            ({ getFieldValue }): RuleObject => ({
              validator(_: unknown, value: string): Promise<string | void> {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Новые пароли не совпадают')
              },
            }),
          ]}>
          <Input.Password placeholder="Повторите новый пароль" />
        </Form.Item>
        <Flex justify="end">
          <Button htmlType="submit" type="primary">
            Изменить
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}
