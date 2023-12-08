import styles from '../styles.module.css'
import CloseSVG from '../../../assets/icons/Close.svg?react'
import RoundSVG from '../../../assets/icons/Round.svg?react'
import { Button } from '../../../UI/button/button.tsx'
import { useState } from 'react'
import { InputField } from '../../../UI/input/inputField.tsx'
import $api from '../../../http/api.ts'
import { useKeycloak } from '@react-keycloak/web'

export const AccidentCard = ({
  coordinates,
  close,
  token
}: {
  coordinates: number[]
  close: () => void
  token: string
}) => {
  const [name, setName] = useState('')
  const [sd, setsd] = useState('')
  const [ed, seted] = useState('')

  return (
    <form className={styles.card} onSubmit={e => {
      e.preventDefault()
      const start = new Date(sd), end = new Date(ed)
      $api.post('accident', 'accident/', token, { Lat: coordinates[0], Lon: coordinates[1], Name: name, EndDate: end.toISOString(), StartDate: start.toISOString() })
    }}>
      <div className={styles.head}>
        <p>Новый инцедент</p>
        <button type='button' onClick={close}>
          <CloseSVG />
        </button>
      </div>
      <div className={styles.body}>
        <InputField config={{ placeholder: 'Название', onChange: e => setName(e.target.value), name: 'accidentName' }} label='Название инцидента' />
        <InputField config={{ placeholder: 'Название', onChange: e => setsd(e.target.value), name: 'sd', type: 'datetime-local' }} label='Начало инцидента' />
        <InputField config={{ placeholder: 'Название', onChange: e => seted(e.target.value), name: 'ed', type: 'datetime-local' }} label='Конец инцидента' />

      </div>
      <div>
        <Button clickHandler={() => { }
        } bg='primary'>Добавить</Button>
      </div>
    </form>
  )
}
