"use client";

import React from "react";
import UnderlinedText from "../../common/underlined-text";

const UserInfoForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-fit px-1">
        <UnderlinedText>注册账户</UnderlinedText>
      </div>
      <div className="text-sm text-[#9E9E9E]">验证码已发送</div>
    </div>
  );
};

export default UserInfoForm;
