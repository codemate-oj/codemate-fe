import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IProps {
  onPhoneLogin?: () => void;
  onForgetPassword?: () => void;
  onRegister?: () => void;
}

const LoginForm: React.FC<IProps> = ({ onPhoneLogin, onForgetPassword, onRegister }) => {
  return (
    <>
      <form>
        <div className="flex flex-col gap-y-8 items-start">
          <Input name="username" type="text" placeholder="请输入用户名" />
          <Input name="password" type="password" placeholder="请输入密码" />
          <Button onClick={onPhoneLogin} type="button" variant="link">
            短信验证码登录
          </Button>
          <Button type="submit" className="w-full block">
            登录
          </Button>
        </div>
      </form>
      <div className="w-full flex justify-between">
        <Button onClick={onForgetPassword} type="button" variant="link" className="text-[#9E9E9E]">
          忘记密码？
        </Button>
        <Button onClick={onRegister} type="button" variant="link">
          注册账号
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
