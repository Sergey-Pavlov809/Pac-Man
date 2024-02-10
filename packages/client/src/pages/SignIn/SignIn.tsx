import { Button, Form, Input, Flex, Card } from 'antd'
import { loginValidationSchema } from '../../utils/ruleSchemes'
import { useNavigate } from 'react-router-dom'

import useSignIn from './hooks/useSignIn'
import yApiService from '../../services/y-api-service'
import { useEffect } from 'react'
import { ServiceIdApi } from '../../types/FormApi'
import {
  fetchYandexId,
  loginWithYandex,
  selectAuth,
} from '../../store/modules/auth/reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'

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

  const { login } = useSignIn()

  const navigateToSiguUp = (): void => {
    navigate('/sign-up')
  }

  const userData = useAppSelector(selectAuth)

  const dispatch = useAppDispatch()

  const oauthLogin = async (): Promise<void> => {
    await dispatch(fetchYandexId())
    await dispatch(
      loginWithYandex({
        code: String(userData.yandexOAuthId),
        redirect_uri: 'http://localhost:3000/',
      })
    )
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
        <Form form={form} name="login" onFinish={login} layout="vertical">
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
            <Button type="link" htmlType="submit" block onClick={oauthLogin}>
              Войти с помощью yandex
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
