import { Rule } from 'rc-field-form/lib/interface'

const nameValidator: Rule[] = [
  { required: true, message: 'Это обязательное поле' },
  {
    pattern: /^[a-zA-Zа-яА-ЯЁё-]+$/,
    message: 'Допустимые символы: латиница, кириллица или дефис',
  },
  { pattern: /^[^a-zа-яё-]/, message: 'Первая буква должна быть заглавная' },
  {
    pattern: /^.[^A-ZА-ЯЁ]*$/,
    message: 'Только первая буква должна быть заглавная',
  },
]

const emailValidator: Rule[] = [
  { required: true, message: 'Это обязательное поле' },
  {
    pattern: /^[a-zA-Z0-9_~!@#$%^&*()-+={};:'"\\|,./<>?]+$/,
    message: 'Допустимые символы: латиница, может включать цифры и спецсимволы',
  },
  { pattern: /@/, message: 'Обязательно должна быть собака' },
  { pattern: /^[^@]*@[^@]*$/, message: 'Собака должна быть только одна' },
  {
    pattern: /^[^@]*@[^@]+\..*$/,
    message: 'После собаки должна быть точка и между ними хоть одна буква',
  },
]

const phoneValidator: Rule[] = [
  { required: true, message: 'Это обязательное поле' },
  { min: 10, max: 15, message: 'Длинна от 10 до 15' },
  {
    pattern: /^\+*[0-9]*$/,
    message: 'Только цифры, первым символом может быть +',
  },
]

const loginValidator: Rule[] = [
  { required: true, message: 'Это обязательное поле' },
  { min: 3, max: 20, message: 'Длина от 3 до 20' },
  {
    pattern: /^[a-zA-Z0-9-_]+$/,
    message:
      'Допустимые символы: латиница,цифры, дефис или нижнее подчеркивание',
  },
  { pattern: /[^0-9]/, message: 'Не должен состоять из одних цифр' },
]

const passwordValidator: Rule[] = [
  { required: true, message: 'Это обязательное поле' },
  { min: 8, max: 40, message: 'Длина от 8 до 40' },
  { pattern: /[0-9]/, message: 'Должна быть хоть одна цифра' },
  { pattern: /[A-ZА-ЯЁ]/, message: 'Должна быть хоть одна буква' },
]

const registerValidationSchema = {
  firstName: nameValidator,
  secondName: nameValidator,
  login: loginValidator,
  email: emailValidator,
  password: passwordValidator,
  phone: phoneValidator,
}

const loginValidationSchema = {
  login: loginValidator,
  password: passwordValidator,
}

export { registerValidationSchema, loginValidationSchema }
