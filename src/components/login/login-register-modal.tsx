"use client";

import React from "react";
import Image from "next/image";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import store from "@/store/login";

const LoginRegisterModal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const shouldShowGoBack = store.dialogContextStack.use().length > 1;
  const shouldHideLogo = store.useCurrentContext()?.hideLogo;

  return (
    <div>
      {!shouldHideLogo && (
        <DialogHeader className="mb-10 flex flex-col items-center">
          <Image src="/img/logo.png" alt="website-logo" width={120} height={120} />
          <DialogTitle>AI推题，高效有趣玩OJ</DialogTitle>
        </DialogHeader>
      )}
      {shouldShowGoBack && (
        <button className="mb-2 flex w-fit items-center gap-3 px-1" onClick={store.dialogGoBack}>
          <Image src="/svg/gray-arrow-left.svg" alt="go-back" width={5.33} height={9.33} />
          <span className="text-sm text-[#797979]">返回</span>
        </button>
      )}
      {children}
    </div>
  );
};

export default LoginRegisterModal;
