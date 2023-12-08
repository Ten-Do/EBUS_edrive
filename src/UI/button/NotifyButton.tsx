import { ReactNode } from 'react'
import styles from './styles.module.css'
import BellSVG from '../../assets/icons/Bell.svg?react'

interface ButtonProps {
  bg?: 'primary' | 'danger' | 'outlined'
  children?: ReactNode
}

export const NotifyButton = ({ children, bg = 'outlined' }: ButtonProps) => {
  return (
    <button className={styles.square_button + ' ' + styles[bg]}>
      <BellSVG />
    </button>
  )
}
