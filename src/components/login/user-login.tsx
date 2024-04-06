"use client";

import React, { createContext, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserPopup, { NavItemWithIcon } from "../user/user-popup";
import { showDialog } from "../ui/headless-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import LoginRegisterModal from "./login-register-modal";
import { userCenterRoutes } from "@/constants/routes";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ForgetPasswordForm from "./forget-password-form";
import EmailPhoneForm from "./email-phone-form";
import { VERIFY_OPTIONS } from "./user-verify";
import { PrivacyAgreement } from "@/constants/agreements";
import UserInfoForm from "./user-info-form";
import { useLoginStore } from "@/providers/login-store-provider";

export type DialogStatusName =
  | "login"
  | "phone-login"
  | "register"
  | "forget-password"
  | "input-email-register"
  | "input-email-reset"
  | "input-phone-register"
  | "input-phone-reset"
  | "verify-code"
  | "reset-password"
  | "user-info";

export interface DialogStatus {
  name: DialogStatusName;
  component: React.ReactNode;
  hideLogo?: boolean;
}

const UserLogin = () => {
  const isLogin = useLoginStore((state) => state.isLogIn);
  const [currentModal, setCurrentModal] = useState<DialogStatus>();

  const actionStack = useRef<DialogStatus[]>([]);

  const pushStack = (name: DialogStatusName) => {
    const target = modalStatuses.find((m) => m.name === name);
    if (!target) return;
    actionStack.current.push(target);
    setCurrentModal(target);
  };

  const handleBack = () => {
    if (actionStack.current.length <= 1) return;
    actionStack.current.pop();
    setCurrentModal(actionStack.current[actionStack.current.length - 1]);
  };

  const modalStatuses: DialogStatus[] = [
    {
      name: "login",
      component: (
        <LoginForm
          onRegister={() => pushStack("register")}
          onForgetPassword={() => pushStack("forget-password")}
          onPhoneLogin={() => pushStack("phone-login")}
        />
      ),
    },
    {
      name: "register",
      component: (
        <RegisterForm
          onNextStep={(opt) => {
            if (opt === VERIFY_OPTIONS.PHONE) {
              pushStack("input-phone-register");
            } else {
              pushStack("input-email-register");
            }
          }}
        />
      ),
    },
    {
      name: "forget-password",
      component: (
        <ForgetPasswordForm
          onNextStep={(opt) => {
            if (opt === VERIFY_OPTIONS.PHONE) {
              pushStack("input-phone-reset");
            } else {
              pushStack("input-email-reset");
            }
          }}
        />
      ),
      hideLogo: true,
    },
    {
      name: "input-email-register",
      component: (
        <EmailPhoneForm
          title="注册账户"
          buttonText="同意协议并注册"
          agreements={[PrivacyAgreement]}
          category={VERIFY_OPTIONS.EMAIL}
          onNextStep={(id) => {
            pushStack("user-info");
          }}
        />
      ),
    },
    {
      name: "input-phone-register",
      component: (
        <EmailPhoneForm
          title="注册账户"
          buttonText="同意协议并注册"
          agreements={[PrivacyAgreement]}
          category={VERIFY_OPTIONS.PHONE}
          onNextStep={() => {
            pushStack("user-info");
          }}
        />
      ),
    },
    {
      name: "input-email-reset",
      component: <EmailPhoneForm title="重置密码" description="请输入您绑定的邮箱" category={VERIFY_OPTIONS.EMAIL} />,
      hideLogo: true,
    },
    {
      name: "input-phone-reset",
      component: <EmailPhoneForm title="重置密码" description="请输入您绑定的手机号" category={VERIFY_OPTIONS.PHONE} />,
      hideLogo: true,
    },
    {
      name: "user-info",
      component: <UserInfoForm />,
      hideLogo: true,
    },
  ];

  if (!isLogin) {
    return (
      <Dialog
        modal={true}
        onOpenChange={(open) => {
          if (!open) {
            actionStack.current.length = 0;
          }
        }}
      >
        <div className="flex gap-x-5">
          <DialogTrigger asChild>
            <Button onClick={() => pushStack("login")}>登录</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => pushStack("register")}>
              注册
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-w-[400px]">
          <LoginRegisterModal
            hideLogo={currentModal?.hideLogo}
            historyStack={actionStack.current}
            onGoBack={handleBack}
          >
            {currentModal?.component}
          </LoginRegisterModal>
        </DialogContent>
      </Dialog>
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
          <UserPopup displayName="user" links={userCenterRoutes} />
        </HoverCardContent>
      </HoverCard>
    );
  }
};

export default UserLogin;
