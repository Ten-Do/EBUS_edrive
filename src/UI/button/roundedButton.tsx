import { ReactNode } from 'react'
import styles from './styles.module.css'

interface ButtonProps {
  bg?: 'primary' | 'secondary' | 'outlined'
  children: ReactNode
}

export const Button = ({ children, bg = 'secondary' }: ButtonProps) => {
  return <button className={styles.rounded_button + ' ' + styles[bg]}>{children}</button>
}
