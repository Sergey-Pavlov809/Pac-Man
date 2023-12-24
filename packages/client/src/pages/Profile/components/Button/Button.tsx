import * as React from 'react'

import css from './Button.module.css'

type ButtonProps = {
  children: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button className={css.button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}
