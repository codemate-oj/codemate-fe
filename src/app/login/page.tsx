"use client";
import loginStore from "@/store/login";
import React, { useEffect } from "react";
import Image from "next/image";

const LoginPage = () => {
  const currentDialogPage = loginStore.useCurrentContext();
  const shouldShowGoBack = loginStore.dialogContextStack.use().length > 1;
  const shouldHideLogo = loginStore.useCurrentContext()?.hideLogo;

  useEffect(() => {
    loginStore.dialogJumpTo("login");
    return () => {
      loginStore.dialogReset();
    };
  }, []);

  return (
    <div className="m-auto mt-[10vh] max-w-[350px]">
      {!shouldHideLogo && (
        <div className="mb-10 flex flex-col items-center">
          <Image src="/img/logo.png" alt="website-logo" width={120} height={120} />
          <h2>AI推题，高效有趣玩OJ</h2>
        </div>
      )}
      {shouldShowGoBack && (
        <button className="mb-2 flex w-fit items-center gap-3 px-1" onClick={loginStore.dialogGoBack}>
          <Image src="/svg/gray-arrow-left.svg" alt="go-back" width={5.33} height={9.33} />
          <span className="text-sm text-[#797979]">返回</span>
        </button>
      )}
      {currentDialogPage?.component}
    </div>
  );
};

export default LoginPage;
