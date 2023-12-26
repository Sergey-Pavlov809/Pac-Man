import { Button, Form, Input, Flex, Card } from 'antd'
import yApiService from '../../services/y-api-service'
import { LoginFromApi } from '../../types/FormApi'
import { loginValidationSchema } from '../../utils/ruleSchemes'
import { useNavigate } from 'react-router-dom'

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
}

const SignIn: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: LoginFromApi): Promise<void> => {
    console.log('Received values of form: ', values)
    try {
      const response = await yApiService.login(values)
      console.log('Result login', response)
      await checkUserAuth()
    } catch (error) {
      console.log('Error login', error)
    }
  }

  const checkUserAuth = async (): Promise<void> => {
    try {
      const response = await yApiService.getUser()
      console.log('Result getUser', response)
    } catch (error) {
      console.log('Error getUser', error)
    }
  }

  const navigateToSiguUp = (): void => {
    navigate('/sign-up')
  }

  return (
    <Flex
      style={{ minHeight: '700px' }}
      gap="middle"
      align="center"
      justify="center"
      vertical>
      <Card
        title="Авторизация"
        size="small"
        headStyle={{ textAlign: 'center' }}
        style={{ width: 410 }}>
        <Form form={form} name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="login"
            label="Логин"
            rules={loginValidationSchema.login}>
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={loginValidationSchema.password}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="link"
              htmlType="submit"
              block
              onClick={navigateToSiguUp}>
              Нет аккаунта?
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}

export default SignIn
