"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import useFetch from "@/components/hooks/useFetch";

import { useSession } from "next-auth/react";

export type Message = {
  id: string;
  messageId?: number;
  content: string;
  isUser: boolean;
  timestamp: number;
};

export type Chat = {
  id?: number;
  chatId: number;
  chatTitle: string;
  messages: Message[];
};

type ChatContextType = {
  chats: Chat[];
  currentChatId: number | null;
  addChat: (chatId: number, messages: Message[], title: string) => void;
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
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  console.log(userEmail);

  useEffect(() => {
    if (status === "loading" || !userEmail) return; // don't fetch yet

    fetchdata({
      url: `http://localhost:3001/chats?email=${encodeURIComponent(userEmail)}`,
      method: "GET",
      onSuccess: async (response) => {
        const data = await response.json();
        const formatted = data.map((chat: Chat) => ({
          chatId: chat?.id,
          chatTitle: chat.chatTitle,
          messages: chat.messages.map((msg: Message) => ({
            id: msg?.messageId,
            content: msg.content,
            isUser: msg.isUser,
            timestamp: Number(msg.timestamp),
          })),
        }));
        setChats(formatted);
      },
      onFailure: () => {
        console.error("Failed to fetch chats");
      },
    });
  }, [status, userEmail]);

  // useEffect(() => {
  //   if (chats.length > 0) {
  //     // Filter out empty chats - only save chats that have at least one message
  //     const chatsWithMessages = chats.filter(
  //       (chat) => chat.messages && chat.messages.length > 0,
  //     );

  //     if (chatsWithMessages.length > 0) {
  //       // Renumber chat IDs to remove gaps (start from 1)
  //       const renumberedChats = chatsWithMessages.map((chat, index) => ({
  //         ...chat,
  //         chatId: index + 1,
  //       }));

  //       localStorage.setItem(
  //         "chats",
  //         JSON.stringify({ data: renumberedChats, timestamp: Date.now() }),
  //       );
  //     }
  //   }
  // }, [chats]);

  const addChat = (chatId: number, messages: Message[], title: string) => {
    const newChat = { chatId, messages, chatTitle: title };
    // let firstMessageContent = newChat.chatTitle;
    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(chatId);

    // Save to DB
    fetchdata({
      url: "http://localhost:3001/chats/save",
      method: "POST",
      body: {
        chat: newChat,
        userEmail: userEmail,
      },
      onSuccess: () => console.log("Chat saved successfully"),
      onFailure: () => console.error("Failed to save chat"),
    });

    // console.log(firstMessageContent);

    // addMessage(chatId, firstMessageContent);

    // // Create user message
    // const userMessage: Message = {
    //   id: `user_${Date.now()}`,
    //   content: firstMessageContent,
    //   isUser: true,
    //   timestamp: Date.now(),
    // };

    // // Add user message to chat immediately
    // setChats((prev) =>
    //   prev.map((chat) =>
    //     chat.chatId === chatId
    //       ? { ...chat, messages: [...chat.messages, userMessage] }
    //       : chat,
    //   ),
    // );

    // setTimeout(() => {
    //   // Message to DB
    // fetchdata({
    //   url: "http://localhost:3001/chats/save/message",
    //   method: "POST",
    //   body: {
    //     chatId: chatId,
    //     message: messages,
    //   },
    //   onSuccess: () => console.log("Message saved successfully"),
    //   onFailure: () => console.error("Failed to save message"),
    // });
    // }, 1000);
  };

  const addMessage = (chatId: number, message: string) => {
    // Create user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: message,
      isUser: true,
      timestamp: Date.now(),
    };

    console.log(userMessage);

    // Add user message to chat immediately
    setChats((prev) =>
      prev.map((chat) =>
        chat.chatId === chatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat,
      ),
    );

    console.log(chats);

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].chatId === chatId) {
        // Save message to DB
        fetchdata({
          url: "http://localhost:3001/chats/save/message",
          method: "POST",
          body: {
            chatId: chatId,
            message: userMessage,
            userEmail: userEmail,
          },
          onSuccess: () => console.log("Message saved successfully"),
          onFailure: () => console.error("Failed to save message"),
        });
      }
    }

    // Set chat title
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].chatId === chatId) {
        chats[i].chatTitle = message;
      }
    }

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

          for (let i = 0; i < chats.length; i++) {
            if (chats[i].chatId === chatId) {
              // Save message to DB
              fetchdata({
                url: "http://localhost:3001/chats/save/message",
                method: "POST",
                body: {
                  chatId: chatId,
                  message: aiMessage,
                  userEmail: userEmail,
                },
                onSuccess: () =>
                  console.log("AI response message saved successfully"),
                onFailure: () => console.error("Failed to save message"),
              });
            }
          }
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
