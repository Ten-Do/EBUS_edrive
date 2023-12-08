import styles from './styles.module.css'
import CloseSVG from '../../assets/icons/Close.svg?react'
import { InputField } from '../../UI/input/inputField.js'
import { Button } from '../../UI/button/button.js'
import SendSVG from '../../assets/icons/Send.svg?react'
import { useKeycloak } from '@react-keycloak/web'
import $api from '../../http/api.ts'
import { useContext, useEffect, useState } from 'react'
import { CentrifugoContext } from '../../Auth.tsx'
import { useRecoilState, useRecoilValue } from 'recoil'
import TimeAgo from 'javascript-time-ago'
import { ChatsState } from '../../state/messages.tsx'

import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(ru)
interface ChatProps {
  close: () => void
  id: number
  name: string
  bus: string
  rout: string
  // ReceiverID: string
  // UserID: string
  messages: {
    // chatID: number
    // id: number
    message: string
    senderID: string
    senderName: string
    sentAt: string
  }[]
}

export const Chat = ({ close, id, name, bus, rout }: ChatProps) => {
  const [val, setVal] = useState('')
  const messages = useRecoilValue(ChatsState)
  const { keycloak } = useKeycloak()
  const timeAgo = new TimeAgo('ru-RU')

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div>
          <p>{name}</p>
          <p className={styles.subtext}>
            Электробус {bus}, маршрут №{rout}
          </p>
        </div>
        <button onClick={close}>
          <CloseSVG />
        </button>
      </div>
      <div className={styles.body}>
        {messages[id]
          ? messages[id].messages.map(message => {
              return (
                <div
                  className={
                    styles.message_container +
                    (message.senderID === keycloak.tokenParsed?.sub ? ' ' + styles.sent : '')
                  }
                >
                  <div className={styles.message}>
                    <p>{message.message}</p>
                    <span>
                      {timeAgo.format(
                        Date.now() - (Date.now() - new Date(Date.parse(message.sentAt))),
                        'round-minute',
                      )}
                    </span>
                  </div>
                </div>
              )
            })
          : []}
        {/* <div className={styles.message_container + ' ' + styles.sent}>
          <div className={styles.message}>
            <p>Lorem ipillo.</p>
            <span>15:03</span>
          </div>
        </div> */}
      </div>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          if (!val) return
          $api.post('chats', 'chats/' + id + '/', keycloak.token!, {
            message: val,
          })
          setVal('')
        }}
      >
        <InputField
          config={{
            name: '',
            placeholder: 'Текст',
            value: val,
            onChange: ({ target }) => {
              setVal(target.value)
            },
          }}
        />
        <Button bg='primary'>
          <SendSVG />
        </Button>
      </form>
    </div>
  )
}
