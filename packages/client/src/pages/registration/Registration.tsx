import { Button, Form, Input, Flex, Card } from 'antd'
import { registerValidationSchema } from '../../utils/ruleSchemes'
import { RuleObject } from 'rc-field-form/lib/interface'
import yApiService from '../../services/y-api-service'
import { RegistrationFromApi } from '../../types/FromApi'

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

const Registration: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = async (values: RegistrationFromApi): Promise<void> => {
    console.log('Received values of form: ', values)
    try {
      const response = await yApiService.register(values)
      console.log('Result register', response.data)
      await checkUserRegistration()
    } catch (error) {
      console.log('Error register', error)
    }
  }

  const checkUserRegistration = async (): Promise<void> => {
    try {
      const response = await yApiService.getUser()
      console.log('Result getUser', response.data)
    } catch (error) {
      console.log('Error getUser', error)
    }
  }

  return (
    <Flex
      style={{ minHeight: '100%' }}
      gap="middle"
      align="center"
      justify="center"
      vertical>
      <Card
        title="Регистрация"
        size="small"
        headStyle={{ textAlign: 'center' }}
        style={{ width: 410 }}>
        <Form
          // className={css.form}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ prefix: '86' }}
          layout="vertical"
          scrollToFirstError>
          <Form.Item
            name="first_name"
            label="Имя"
            tooltip="латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
            rules={registerValidationSchema.firstName}>
            <Input />
          </Form.Item>

          <Form.Item
            name="second_name"
            label="Фамилия"
            tooltip="латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)"
            rules={registerValidationSchema.secondName}>
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Почтовый ящик"
            tooltip="латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы"
            rules={registerValidationSchema.email}>
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
            tooltip="от 10 до 15 символов, состоит из цифр, может начинаться с плюса"
            rules={registerValidationSchema.phone}>
            <Input />
          </Form.Item>

          <Form.Item
            name="login"
            label="Логин"
            tooltip="от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)"
            rules={registerValidationSchema.login}>
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            tooltip="от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
            rules={registerValidationSchema.password}
            hasFeedback>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите свой пароль !',
              },
              ({ getFieldValue }): RuleObject => ({
                validator(_: RuleObject, value: string): Promise<void> {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'))
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block>
              Регистрация
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}

export default Registration
