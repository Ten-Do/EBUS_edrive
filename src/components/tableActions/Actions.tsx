import { ReactNode, useState } from 'react'
import { Button } from '../../UI/button/button.js'
import { InputField } from '../../UI/input/inputField.js'
import styles from './styles.module.css'
import AddRoundedSVG from '../../assets/icons/AddRounded.svg?react'
import { FormCard } from '../cards/bus/FormCard.js'

export const Actions = ({
  children,
  formConfig,
  action,
  button_text,
}: {
  button_text: string
  children?: ReactNode
  formConfig?: {
    [key: string]: {
      label?: string | undefined
      placeholder?: string | undefined
      options?: { id: string; text: string }[] | undefined
    }
  }
  action?: string
}) => {
  const [showCard, setShowCard] = useState(false)
  return (
    <div className={styles.container}>
      {action && formConfig && showCard && (
        <FormCard
          action={action}
          config={formConfig}
          close={() => {
            setShowCard(false)
          }}
        >
          {children}
        </FormCard>
      )}
      <div className={styles.search}>
        <InputField config={{ name: 'search', placeholder: 'Поиск' }} />
        <Button bg='primary'>Найти</Button>
      </div>
      <div>
        {action && formConfig && (
          <Button
            bg='primary'
            clickHandler={() => {
              setShowCard(true)
            }}
          >
            <div className={styles.addButton}>
              <AddRoundedSVG />
              <p>{button_text}</p>
            </div>
          </Button>
        )}
      </div>
    </div>
  )
}
