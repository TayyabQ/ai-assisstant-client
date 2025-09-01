"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type Chat = {
  chatId: number;
  chatTitle: string;
  messages: string[];
};

type ChatContextType = {
  chats: Chat[];
  currentChatId: number | null;
  addChat: (chatId: number, messages: string[], title: string) => void;
  setCurrentChat: (chatId: number, messages: string[], title: string) => void;
  updateName: (chatId: number, title: string) => void;
  addMessage: (chatId: number, message: string) => void;
  openChat: (chatId: number) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("chats");
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      const now = Date.now();

      // Chat will be automatically removed 24 hours
      if (now - timestamp < 24 * 60 * 60 * 1000) {
        setChats(data);
      } else {
        localStorage.removeItem("chats");
      }
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem(
        "chats",
        JSON.stringify({ data: chats, timestamp: Date.now() }),
      );
    }
  }, [chats]);

  const addChat = (chatId: number, messages: string[], title: string) => {
    setChats((prev) => [...prev, { chatId, messages, chatTitle: title }]);
    setCurrentChatId(chatId);
  };

  const setCurrentChat = (
    chatId: number,
    messages: string[],
    title: string,
  ) => {
    setChats((prev) => {
      const exists = prev.some((chat) => chat.chatId === chatId);

      if (exists) {
        return prev;
      } else {
        return [...prev, { chatId, messages, chatTitle: title }];
      }
    });

    setCurrentChatId(chatId);
  };

  const updateName = (chatId: number, title: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.chatId === chatId ? { ...chat, chatTitle: title } : chat,
      ),
    );
  };

  const addMessage = (chatId: number, message: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.chatId === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat,
      ),
    );
  };

  const openChat = (chatId: number) => {
    setCurrentChatId(chatId);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        addChat,
        setCurrentChat,
        updateName,
        addMessage,
        openChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatContext must be used inside ChatProvider");
  }
  return ctx;
};
