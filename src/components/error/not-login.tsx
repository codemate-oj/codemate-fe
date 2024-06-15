"use client";

import React from "react";
import UserLogin from "../login/user-login";
import { LockOutlined } from "@ant-design/icons";

const NotLogin = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-8">
      <LockOutlined className="text-6xl" />
      <h3 className="text-2xl text-primary">你还没有登录</h3>
      <p>该页面需要登录后才能访问</p>
      <UserLogin />
    </div>
  );
};

export default NotLogin;
