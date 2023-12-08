import { ReactNode } from 'react'
import styles from './styles.module.css'

interface ButtonProps {
  bg?: 'primary' | 'secondary' | 'outlined'
  children: ReactNode
  clickHandler: () => void
}

export const Button = ({ children, bg = 'secondary', clickHandler = () => {} }: ButtonProps) => {
  return (
    <button className={styles.button + ' ' + styles[bg]} onClick={clickHandler}>
      {children}
    </button>
  )
}
