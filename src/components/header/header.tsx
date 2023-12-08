import styles from './styles.module.css'
import Logo from '../../assets/icons/FullLogoBlack.svg?react'
import { Button } from '../../UI/button/button.js'

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div>smth</div>
      <div>
        {' '}
        <Button>Вход</Button> <Button bg='primary'>Регистрация</Button>{' '}
      </div>
    </div>
  )
}
