"use client";

import React from "react";
import Image from "next/image";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogStatus } from "./user-login";

interface IProps {
  hideLogo?: boolean;
  historyStack: DialogStatus[];
  onGoBack?: () => void;
}

const LoginRegisterModal: React.FC<React.PropsWithChildren<IProps>> = ({
  hideLogo,
  historyStack,
  onGoBack,
  children,
}) => {
  return (
    <>
      {!hideLogo && (
        <DialogHeader className="flex flex-col items-center mb-10">
          <Image src="/img/logo.png" alt="website-logo" width={120} height={120} />
          <DialogTitle>AI推题，高效有趣玩OJ</DialogTitle>
        </DialogHeader>
      )}
      {historyStack.length > 1 && (
        <button className="flex items-center gap-3 px-1 mb-2 w-fit" onClick={onGoBack}>
          <Image src="/svg/gray-arrow-left.svg" alt="go-back" width={5.33} height={9.33} />
          <span className="text-sm text-[#797979]">返回</span>
        </button>
      )}
      {children}
    </>
  );
};

export default LoginRegisterModal;
