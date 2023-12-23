import { Rule } from 'rc-field-form/lib/interface'

const loginValidator: Rule[] = [
  { required: true, message: 'Это обязательное поле' },
  { min: 3, max: 20, message: 'Длинна от 3 до 20' },
  {
    pattern: /^[a-zA-Z0-9-_]+$/,
    message:
      'Допустимые символы: латиница,цифры, дефис или нижнее подчеркивание',
  },
  { pattern: /[^0-9]/, message: 'Не должен состоять из одних цифр' },
]

const passwordValidator: Rule[] = [
  { required: true, message: 'Это обязательное поле' },
  { min: 8, max: 40, message: 'Длинна от 8 до 40' },
  { pattern: /[0-9]/, message: 'Должна быть хоть одна цифра' },
  { pattern: /[A-ZА-ЯЁ]/, message: 'Должна быть хоть одна буква' },
]

const loginValidationSchema = {
  login: loginValidator,
  password: passwordValidator,
}

export { loginValidationSchema }
