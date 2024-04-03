"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserPopup from "./user-popup";

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) {
    return (
      <div className="flex gap-x-5">
        <Button onClick={() => setIsLogin(true)}>登录</Button>
        <Button variant="outline">注册</Button>
      </div>
    );
  } else {
    return (
      <HoverCard openDelay={100}>
        <HoverCardTrigger asChild>
          <Avatar>
            <AvatarImage src="/img/avatar.png" />
            <AvatarFallback>
              <Image src="/img/avatar.png" alt="avatar" width={32} height={32} />
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent>
          <UserPopup displayName="user" onLogout={() => setIsLogin(false)} />
        </HoverCardContent>
      </HoverCard>
    );
  }
};

export default UserLogin;
