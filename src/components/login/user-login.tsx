"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserPopup from "../user/user-popup";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginRegisterModal from "./login-register-modal";
import { userCenterRoutes } from "@/constants/routes";
import store from "@/store/login";

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
      <Dialog modal={true} open={isDialogShow} onOpenChange={handleOpenChange}>
        <div className="flex gap-x-5">
          <DialogTrigger asChild>
            <Button onClick={() => store.dialogJumpTo("login")}>登录</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => store.dialogJumpTo("register")}>
              注册
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-w-[400px]">
          <LoginRegisterModal hideLogo={currentDialogPage?.hideLogo}>{currentDialogPage?.component}</LoginRegisterModal>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <HoverCard openDelay={100}>
        <HoverCardTrigger asChild>
          <Avatar>
            <AvatarImage src={userContext?.avatarUrl ?? "/img/avatar.png"} />
            <AvatarFallback>
              <Image src="/img/avatar.png" alt="avatar" width={32} height={32} />
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="min-w-[287px] rounded-lg p-0">
          <UserPopup displayName="user" links={userCenterRoutes} onLogout={store.logout} />
        </HoverCardContent>
      </HoverCard>
    );
  }
};

export default UserLogin;
