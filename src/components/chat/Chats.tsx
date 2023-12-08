export const Chats = ({chats, setCurrentChat}: any) => {
    return chats.map((chat) => (
        <div onClick={() => {setCurrentChat(chat.ID)}}>
            {chat.ReceiverID}
        </div>
    )) 
}