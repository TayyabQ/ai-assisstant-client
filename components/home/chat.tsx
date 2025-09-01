import { useRef } from "react";
import { useChatContext } from "@/components/context_apis/chat_Context";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

const Chat = () => {
  const {
    chats,
    addChat,
    setCurrentChat,
    currentChatId,
    updateName,
    addMessage,
  } = useChatContext();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentChat = chats.find((c) => c.chatId === currentChatId);

  const handleSend = () => {
    if (inputRef.current?.value && currentChat) {
      addMessage(currentChat.chatId, inputRef.current.value);
      updateName(currentChat.chatId, inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const handleNewDefaultChat = () => {
    if (inputRef.current?.value) {
      const newId = chats.length + 1;
      // Create a new chat
      addChat(newId, [], inputRef.current.value);
      // Set it as current chat
      setCurrentChat(newId, [], inputRef.current.value);
      addMessage(newId, inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  if (!currentChat) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-10 md:px-20 lg:px-40">
        <p className="text-[24px] md:text-[28px] lg:text-[40px] xl:text-[48px] 2xl:text-[72px] text-header-purple font-bold my-2">
          Welcome to AI Assisstant
        </p>
        <p className="text-[11px] md:text-[18px] 2xl:text-[28px]">
          I am your assisstant. You can ask me anything you want to ask!
        </p>
        <Textarea
          ref={inputRef}
          className="min-h-28 2xl:min-h-40 mt-8 border-header-purple shadow-sm"
          placeholder="Enter prompt ..."
        />
        <Button
          onClick={handleNewDefaultChat}
          className="w-50 mt-2 2xl:text-[24px] bg-header-purple text-white"
          variant="default"
          size="default"
        >
          Go
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-10 md:px-20 lg:px-40">
      <p className="text-[24px] md:text-[28px] lg:text-[40px] xl:text-[48px] 2xl:text-[72px] text-header-purple font-bold my-2">
        Welcome to AI Assisstant
      </p>
      <p className="text-[11px] md:text-[18px] 2xl:text-[28px]">
        I am your assisstant. You can ask me anything you want to ask!
      </p>

      <div className="text-[14px] md:text-[24px] xl:text-[28px] 2xl:text-[36px] text-header-purple font-bold mt-8">
        {currentChat.chatTitle}
      </div>

      <div className="w-full overflow-y-auto p-4">
        {currentChat.messages.map((msg, idx) => (
          <div key={idx} className="p-2 mb-2 bg-white rounded shadow-sm">
            {msg}
          </div>
        ))}
      </div>

      <Textarea
        ref={inputRef}
        className="min-h-28 2xl:min-h-40 mt-8 border-header-purple shadow-sm"
        placeholder="Enter prompt ..."
      />
      <Button
        onClick={handleSend}
        className="w-50 mt-2 2xl:text-[24px] bg-header-purple text-white"
        variant="default"
        size="default"
      >
        Go
      </Button>
    </div>
  );
};

export default Chat;
