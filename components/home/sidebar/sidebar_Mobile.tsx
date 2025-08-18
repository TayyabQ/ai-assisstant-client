import { Button } from '@/components/ui/button'
import { useChatContext } from '@/components/context_apis/chat_Context'

const Sidebar_Mobile = () => {

  const { chats, addChat, openChat, currentChatId } = useChatContext();

  const handleNewChat = () => {
    const newId = chats.length + 1;
    addChat(newId, [], `Chat ${newId}`);
  };

  return (
    <div className='w-[60%] absolute left-0 top-10 min-h-screen flex flex-col items-center justify-start py-4 px-2 bg-gray-background shadow-sm'>
      <div className='w-full p-4'>
        <Button className='w-full bg-header-purple' variant='default' size='default' onClick={handleNewChat}>New Chat</Button>
      </div>
      <div className='w-full flex flex-col items-center justify-center p-4'>
         {chats.map((chat) => (
          <div key={chat.chatId} className={`w-full text-[14px] flex items-center justify-start p-1 cursor-pointer ${currentChatId === chat.chatId ? 'bg-purple-200 rounded' : ''}`} onClick={() => openChat(chat.chatId)}>
            <p className='2xl:text-[18px]'>{chat.chatTitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar_Mobile
