import store from "@/store/login";
import React from "react";
import UserVerify, { EmailIcon, PhoneIcon, VERIFY_OPTIONS } from "../user-verify";
import { PrivacyAgreement } from "@/constants/agreements";
import { Button } from "@/components/ui/button";
import UnderlinedText from "@/components/common/underlined-text";

const ChooseVerifyForm = () => {
  const [selected, setSelected] = React.useState<VERIFY_OPTIONS>(VERIFY_OPTIONS.PHONE);
  const currentContext = store.useCurrentContext();

  const handleNextStep = () => {
    switch (currentContext?.category) {
      case "register":
        store.dialogJumpTo("input-email-or-phone", {
          category: selected,
          title: "注册账户",
          buttonText: "同意协议并注册",
          agreements: [PrivacyAgreement],
          purpose: "register",
        });
        break;

      case "reset":
        store.dialogJumpTo("input-email-or-phone", {
          category: selected,
          title: "忘记密码",
          description: selected === VERIFY_OPTIONS.PHONE ? "请输入手机号码" : "请输入邮箱",
          hideLogo: true,
          purpose: "reset",
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="w-fit pt-2">
        <UnderlinedText>{currentContext?.title}</UnderlinedText>
      </div>
      {currentContext?.description && <div className="text-sm text-[#9E9E9E]">{currentContext?.description}</div>}
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
      <Button onClick={handleNextStep} className="block w-full">
        下一步
      </Button>
    </div>
  );
};

export default ChooseVerifyForm;
