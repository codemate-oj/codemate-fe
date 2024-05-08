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
        <DialogHeader className="flex flex-col items-center mb-10">
          <Image src="/img/logo.png" alt="website-logo" width={120} height={120} />
          <DialogTitle>AI推题，高效有趣玩OJ</DialogTitle>
        </DialogHeader>
      )}
      {shouldShowGoBack && (
        <button className="flex items-center gap-3 px-1 mb-2 w-fit" onClick={store.dialogGoBack}>
          <Image src="/svg/gray-arrow-left.svg" alt="go-back" width={5.33} height={9.33} />
          <span className="text-sm text-[#797979]">返回</span>
        </button>
      )}
      {children}
    </div>
  );
};

export default LoginRegisterModal;
