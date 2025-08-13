import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./SessionWrapper/page";

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
        {children}
      </body>
      </SessionWrapper>
    </html>
  );
}
