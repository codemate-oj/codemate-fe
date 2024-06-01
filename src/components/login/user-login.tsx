"use client";

import Image from "next/image";
import React, { useEffect } from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { userCenterRoutes } from "@/constants/routes";
import store from "@/store/login";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import UserPopup from "../user/user-popup";
import LoginRegisterModal from "./login-register-modal";
import { remoteUrl } from "@/lib/utils";

const UserLogin = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const isDialogShow = store.isDialogShow.use();
  const userContext = store.user.use();
  const currentDialogPage = store.useCurrentContext();

  const handleOpenChange = (open: boolean) => {
    store.isDialogShow.set(open);
    if (!open) {
      store.dialogReset();
    }
  };

  useEffect(() => {
    // 登录是纯客户端行为 为防止闪动 在服务端屏蔽渲染
    store.renew().then(() => {
      // 进入时先刷新登录态，再显示组件
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (!userContext) {
    return (
      <Dialog modal={true} open={isDialogShow} onOpenChange={handleOpenChange}>
        <div className="flex gap-x-5">
          <DialogTrigger asChild>
            <Button onClick={() => store.dialogJumpTo("login")}>登录</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() =>
                store.dialogJumpTo("choose-verify", {
                  title: "请选择注册方式",
                  category: "register",
                })
              }
            >
              注册
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-w-[400px]">
          <LoginRegisterModal>{currentDialogPage?.component}</LoginRegisterModal>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <HoverCard openDelay={100}>
        <HoverCardTrigger asChild>
          <Avatar>
            <AvatarImage src={remoteUrl(userContext?.avatarUrl) ?? "/img/avatar.png"} />
            <AvatarFallback>
              <Image src="/img/avatar.png" alt="avatar" width={32} height={32} />
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="min-w-[287px] rounded-lg p-0">
          <UserPopup displayName={userContext.uname} links={userCenterRoutes} onLogout={store.logout} />
        </HoverCardContent>
      </HoverCard>
    );
  }
};

export default UserLogin;
