"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserPopup, { LinkItem } from "./user-popup";

const userLinks: LinkItem[] = [
  {
    name: "我的训练",
    href: "/user/record",
    icon: <Image src="/svg/popup-train.svg" alt="my-record" width={20} height={20} />,
  },
  {
    name: "我的题单",
    href: "/user/plist",
    icon: <Image src="/svg/popup-list.svg" alt="my-plist" width={17} height={20} />,
  },
  {
    name: "我的比赛",
    href: "/user/contest",
    icon: <Image src="/svg/popup-competition.svg" alt="my-contest" width={20} height={20} />,
  },
  {
    name: "个人设置",
    href: "/user/setting",
    icon: <Image src="/svg/popup-setting.svg" alt="my-setting" width={20} height={20} />,
  },
  {
    name: "我的账户",
    href: "/user/wallet",
    icon: <Image src="/svg/popup-account.svg" alt="my-account" width={20} height={22} />,
  },
];

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
        <HoverCardContent className="min-w-[287px] rounded-lg p-0">
          <UserPopup displayName="user" onLogout={() => setIsLogin(false)} links={userLinks} />
        </HoverCardContent>
      </HoverCard>
    );
  }
};

export default UserLogin;
