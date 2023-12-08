import { InputHTMLAttributes, MouseEventHandler, useState } from 'react'
import Eye from '../../assets/icons/Eye.svg?react'
import EyeClosed from '../../assets/icons/EyeClosed.svg?react'
import styles from './styles.module.css'

interface InputFieldProps {
  label?: string
  error?: string
  config: InputHTMLAttributes<HTMLInputElement>
}

const ToggleButton = ({
  state,
  toggler,
}: {
  state: string
  toggler: MouseEventHandler<SVGSVGElement>
}) => {
  if (state === 'text') return <Eye className={styles.password_toggler} onClick={toggler} />
  return <EyeClosed className={styles.password_toggler} onClick={toggler} />
}

export const InputField = ({ config, label, error }: InputFieldProps) => {
  const [state, setState] = useState('password')
  return (
    <div className={styles.input_container + (error ? ' ' + styles.error : '')}>
      {label && <label htmlFor={config.name}>{label}</label>}
      {config.type === 'password' ? (
        <>
          <input placeholder={label} {...config} type={state} id={config.name} />
          <ToggleButton
            state={state}
            toggler={() => setState(curr => (curr === 'password' ? 'text' : 'password'))}
          />
        </>
      ) : (
        <input placeholder={label} {...config} id={config.name} className={styles.input} />
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}
// EXAMPLE
// <InputField config={{ name: 'first', type: 'text' }} error='Логин стрем' label='Логин' /> <br />
// <InputField config={{ name: 'second', type: 'password' }} label='Пароль' />
