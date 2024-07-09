"use client";

import Image from "next/image";
import React from "react";

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
  const isDialogShow = store.isDialogShow.use();
  const userContext = store.user.use();
  const currentDialogPage = store.useCurrentContext();

  const handleOpenChange = (open: boolean) => {
    store.isDialogShow.set(open);
    if (!open) {
      store.dialogReset();
    }
  };

  if (!userContext) {
    return (
      <Dialog open={isDialogShow} onOpenChange={handleOpenChange}>
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
