import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const PhoneIcon = {
  default: "/svg/verify-phone.svg",
  active: "/svg/verify-phone-active.svg",
};
export const EmailIcon = {
  default: "/svg/verify-mail.svg",
  active: "/svg/verify-mail-active.svg",
};

export const enum VERIFY_OPTIONS {
  PHONE = 0,
  EMAIL = 1,
}

export interface VerifyOptionType {
  iconSrc: typeof PhoneIcon;
  width?: number;
  height?: number;
  text: string;
  onClick?: () => void;
}

interface IProps {
  accepts: VerifyOptionType[];
  value?: VERIFY_OPTIONS;
  onChange?: (value: VERIFY_OPTIONS) => void;
}

const UserVerify: React.FC<IProps> = ({ accepts, value, onChange }) => {
  return (
    <div className="w-full flex gap-4">
      {accepts.map((item, index) => (
        <button
          key={item.text}
          type="button"
          onClick={() => onChange?.(index)}
          className={cn(
            "flex-1 flex flex-col gap-5 items-center p-8 text-[#797979] rounded-lg border border-[#797979]",
            { "border-primary text-primary": value === index }
          )}
        >
          <Image
            src={value === index ? item.iconSrc.active : item.iconSrc.default}
            width={item.width}
            height={item.height}
            alt={`${item.text}-icon`}
          />
          <div>{item.text}</div>
        </button>
      ))}
    </div>
  );
};

export default UserVerify;
