"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <>
      <div className="w-[250px] md:w-[350px] lg:w-[500px] xl:w-[650px] 2xl:w-[1000px] flex flex-col items-center justify-center gap-10 py-10 shadow-header-purple shadow-lg">
        <p className="text-[18px] lg:text-[24px] xl:text-[32px] 2xl:text-[48px] text-header-purple font-bold">
          Login to AI Assisstant
        </p>
        <Button
          className="w-20% 2xl:text-[24px] bg-header-purple"
          variant="default"
          size="default"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      </div>
    </>
  );
};

export default Login;
