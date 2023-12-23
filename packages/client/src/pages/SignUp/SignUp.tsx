import { Button, Form, Input } from 'antd'
import css from './SignUp.module.css'

const onFinish = (values: unknown): void => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: unknown): void => {
  console.log('Failed:', errorInfo)
}

const SignUp = (): React.FC => {
  return (
    <div className={css.container}>
      <div className={css.form}>
        <Form
          name="registration"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ marginTop: '20px' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Имя"
            name="first_name"
            rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Фамилия"
            name="second_name"
            rules={[
              { required: true, message: 'Пожалуйста, введите фамилию' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email' },
              {
                type: 'email',
                message: 'Пожалуйста, введите правильный email',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль' },
              { min: 5, message: 'Пароль должен содержать минимум 5 символов' },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Телефон"
            name="phone"
            rules={[
              { required: true, message: 'Пожалуйста, введите номер телефона' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRadius: '20px' }}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
