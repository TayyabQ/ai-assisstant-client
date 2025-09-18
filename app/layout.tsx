import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "../components/private_routing/session_wrapper";
import { ChatProvider } from "@/components/context_apis/chat_Context";
import { Toaster } from "sonner";
import PrivateRoute from "@/components/private_routing/private_route";

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
            <PrivateRoute>{children}</PrivateRoute>
          </ChatProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
