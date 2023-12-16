import { Button, Checkbox, Form, Input } from 'antd'
import './Styless.css'

const onFinish = (values: unknown): void => {
  // eslint-disable-next-line no-console
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: unknown): void => {
  // eslint-disable-next-line no-console
  console.log('Failed:', errorInfo)
}

type FieldType = {
  username?: string
  password?: string
  remember?: string
}
//
function SignIn(): JSX.Element {
  return (
    <div className="container">
      <h1>Авторизация</h1>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Логин"
            name="username"
            rules={[
              { required: true, message: 'Пожалуйста, заполните поле' },
              { len: 3, message: 'Длинна должна быть больше 3' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, заполните поле' },
              { len: 5, message: 'Длинна должна быть больше 5' },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
