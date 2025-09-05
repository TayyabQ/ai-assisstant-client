"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import useFetch from "@/components/hooks/useFetch";

export type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: number;
};

export type Chat = {
  chatId: number;
  chatTitle: string;
  messages: Message[];
};

type ChatContextType = {
  chats: Chat[];
  currentChatId: number | null;
  addChat: (chatId: number, messages: Message[], title: string) => void;
  setCurrentChat: (chatId: number, messages: Message[], title: string) => void;
  updateName: (chatId: number, title: string) => void;
  addMessage: (chatId: number, message: string) => void;
  openChat: (chatId: number) => void;
  isLoading: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchdata } = useFetch();

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

  const addChat = (chatId: number, messages: Message[], title: string) => {
    setChats((prev) => [...prev, { chatId, messages, chatTitle: title }]);
    setCurrentChatId(chatId);
  };

  const setCurrentChat = (
    chatId: number,
    messages: Message[],
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
    // Create user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: message,
      isUser: true,
      timestamp: Date.now(),
    };

    // Add user message to chat immediately
    setChats((prev) =>
      prev.map((chat) =>
        chat.chatId === chatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat,
      ),
    );

    // Set loading state
    setIsLoading(true);

    // Send message to API
    fetchdata({
      url: "http://localhost:3001/chat",
      method: "POST",
      body: { message: message },
      onSuccess: async (response) => {
        try {
          const data = await response.json();
          console.log(data);

          // Create AI response message
          const aiMessage: Message = {
            id: `ai_${Date.now()}`,
            content: data.reply || "No response received",
            isUser: false,
            timestamp: Date.now(),
          };

          // Add AI response to chat
          setChats((prev) =>
            prev.map((chat) =>
              chat.chatId === chatId
                ? { ...chat, messages: [...chat.messages, aiMessage] }
                : chat,
            ),
          );
        } catch (error) {
          console.error("Error parsing API response:", error);

          // Add error message
          const errorMessage: Message = {
            id: `error_${Date.now()}`,
            content:
              "Sorry, I couldn't process your request. Please try again.",
            isUser: false,
            timestamp: Date.now(),
          };

          setChats((prev) =>
            prev.map((chat) =>
              chat.chatId === chatId
                ? { ...chat, messages: [...chat.messages, errorMessage] }
                : chat,
            ),
          );
        } finally {
          setIsLoading(false);
        }
      },
      onFailure: () => {
        // Add error message on API failure
        const errorMessage: Message = {
          id: `error_${Date.now()}`,
          content:
            "Sorry, I couldn't connect to the server. Please try again later.",
          isUser: false,
          timestamp: Date.now(),
        };

        setChats((prev) =>
          prev.map((chat) =>
            chat.chatId === chatId
              ? { ...chat, messages: [...chat.messages, errorMessage] }
              : chat,
          ),
        );
        setIsLoading(false);
      },
    });
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
        isLoading,
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
