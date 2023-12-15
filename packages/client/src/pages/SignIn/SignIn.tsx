import { Button, Checkbox, Form, Input } from 'antd'
import './Styless.css'

const onFinish = (values: unknown): undefined => {
  // eslint-disable-next-line no-console
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: unknown): undefined => {
  // eslint-disable-next-line no-console
  console.log('Failed:', errorInfo)
}

type FieldType = {
  username?: string
  password?: string
  remember?: string
}
//
function SignIn(): React.FC {
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
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { len: 3, message: 'Length should be more then 3' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { len: 5, message: 'Length should be more then 5' },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
