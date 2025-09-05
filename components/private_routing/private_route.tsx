"use client";

import Login from "@/app/login/page";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import useFetch from "@/components/hooks/useFetch";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  console.log(session);
  const expiry = session?.expires;
  const user = session?.user;

  const { fetchdata } = useFetch();

  // Call NestJS API to save user data when session exists
  useEffect(() => {
    if (session && user) {
      const saveUser = async () => {
        fetchdata({
          url: "http://localhost:3001/user/save",
          method: "POST",
          body: {
            email: user.email,
            name: user.name,
            image: user.image,
            expiry: expiry,
          },
          onSuccess: async (response) => {
            const data = await response.json();
            console.log(data.message);
          },
          onFailure: () => {
            console.error("Failed to save user");
          },
        });
      };

      saveUser();
    }
  }, [session, user]);

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
