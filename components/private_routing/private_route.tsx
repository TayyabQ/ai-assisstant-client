"use client";

import Login from "@/app/login/page";
import { useSession } from "next-auth/react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  if (session) {
    return children;
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Login />
      </div>
    </>
  );
}
