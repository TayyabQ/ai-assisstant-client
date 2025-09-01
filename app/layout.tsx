import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./SessionWrapper/page";
import { ChatProvider } from "@/components/context_apis/chat_Context";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AI Assisstant",
  description: "An ai chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <ChatProvider>
            <Toaster richColors />
            {children}
          </ChatProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
