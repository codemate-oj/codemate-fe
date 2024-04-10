"use client";

import React from "react";
import UserVerify, { EmailIcon, PhoneIcon, VERIFY_OPTIONS } from "./user-verify";
import { Button } from "../../ui/button";

interface IProps {
  onNextStep?: (option: VERIFY_OPTIONS) => void;
}

const RegisterForm: React.FC<IProps> = ({ onNextStep }) => {
  const [selected, setSelected] = React.useState<VERIFY_OPTIONS>(VERIFY_OPTIONS.PHONE);
  return (
    <div className="flex flex-col gap-8">
      <div className="text-lg text-[#3D3D3D] font-bold">请选择注册方式</div>
      <UserVerify
        value={selected}
        onChange={setSelected}
        accepts={[
          {
            iconSrc: PhoneIcon,
            width: 38,
            height: 48,
            text: "手机号码注册",
          },
          {
            iconSrc: EmailIcon,
            text: "邮箱注册",
            width: 50,
            height: 42,
          },
        ]}
      />
      <Button onClick={() => onNextStep?.(selected)} className="w-full block">
        下一步
      </Button>
    </div>
  );
};

export default RegisterForm;
