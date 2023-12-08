import { useKeycloak } from '@react-keycloak/web'
import { Chat } from '../../components/chat/Chat.tsx'
import { Chats } from '../../components/chat/Chats.tsx'
import $api from '../../http/api.ts'
import styles from './styles.module.css'
import { useContext, useEffect, useState } from 'react'
import { CentrifugoContext } from '../../Auth.tsx'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ChatsState } from '../../state/messages.tsx'
export const ChatPage = ({close}: {close: () => void}) => {
  const centrifuge = useContext(CentrifugoContext)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(0)
  const [subs, setSubs] = useState([])
  const { keycloak } = useKeycloak()
  const [messages, setMessages] = useRecoilState(ChatsState)
  // Получение данных чата
  useEffect(() => {
    if (keycloak.token && centrifuge) {
      $api.get('chats', 'chats/', keycloak.token).then(data => {
        const chatsData = data.data.chats
        setChats(chatsData)
      })
    }
  }, [keycloak, centrifuge])

  useEffect(() => {
    // This effect will run only once after the chats data is fetched
    if (chats.length > 0 && centrifuge) {
      const newSubs = chats.map(chat => {
        const newSub = centrifuge.newSubscription('dialog#' + chat.UserID + ',' + chat.ReceiverID)

        newSub.on('publication', ctx => {
          setMessages(prevMessages => {
            // Creating a deep copy of the previous messages
            const updatedMessages = JSON.parse(JSON.stringify(prevMessages))

            // Ensure that the specific chat exists in the messages
            if (!updatedMessages[chat.ID]) {
              updatedMessages[chat.ID] = { messages: [] }
            }

            // Safely add the new message
            console.log(ctx.data.SentAt)
            updatedMessages[chat.ID].messages.push({
              message: ctx.data.Message,
              senderID: ctx.data.SenderID,
              senderName: ctx.data.SenderName,
              sentAt: ctx.data.SentAt,
            })

            return updatedMessages
          })
        })

        newSub.subscribe()
        return newSub
      })

      setSubs(newSubs)

      // Cleanup function
      return () => {
        newSubs.forEach(sub => {
          sub.unsubscribe()
          centrifuge.removeSubscription(sub)
        })
      }
    }
  }, [chats, centrifuge]) // This useEffect will trigger only when `chats` or `centrifuge` changes

  return (
    <Chat
      close={close}
      name='Связь с оператором'
      rout='228'
      bus='558'
      id={currentChat}
      // messages={}
    />
  )
}
