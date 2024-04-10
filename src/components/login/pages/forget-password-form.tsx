import React from "react";
import UnderlinedText from "../../common/underlined-text";
import UserVerify, { EmailIcon, PhoneIcon, VERIFY_OPTIONS } from "./user-verify";
import { Button } from "../../ui/button";
import { DialogStatusName } from "../user-login";

interface IProps {
  onNextStep?: (option: VERIFY_OPTIONS) => void;
}

const ForgetPasswordForm: React.FC<IProps> = ({ onNextStep }) => {
  const [selected, setSelected] = React.useState<VERIFY_OPTIONS>(VERIFY_OPTIONS.PHONE);

  return (
    <div>
      <div className="w-fit">
        <UnderlinedText>忘记密码</UnderlinedText>
      </div>
      <div className="text-sm text-[#9E9E9E] my-3">请选择找回密码的方式</div>
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
      <Button onClick={() => onNextStep?.(selected)} className="mt-5 w-full block">
        下一步
      </Button>
    </div>
  );
};

export default ForgetPasswordForm;
