"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <>
      <div className="m-2">
        <Button
          className="w-20% 2xl:text-[24px] bg-header-purple"
          variant="default"
          size="default"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </>
  );
};

export default Logout;
