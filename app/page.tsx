"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Dashboard from "./dashboard/page";
import Subscriptions from "./subscriptions/page";

export default function Component() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        {/* <Dashboard/> */}
        <Subscriptions />
        <br />
        <br />
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
