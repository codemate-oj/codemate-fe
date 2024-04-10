"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";
import { request } from "@/lib/request";
import { useRequest } from "alova";

interface IProps {
  onPhoneLogin?: () => void;
  onForgetPassword?: () => void;
  onRegister?: () => void;
}

const formSchema = z.object({
  uname: z.string().min(1, { message: "请输入用户名" }),
  password: z.string().min(1, { message: "请输入密码" }),
});

const LoginForm: React.FC<IProps> = ({ onPhoneLogin, onForgetPassword, onRegister }) => {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const { send: handleLogin } = useRequest((data) => request.post("/login", data), { immediate: false });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => handleLogin(values))}>
        <div className="flex flex-col gap-y-8 items-start">
          <FormInput name="uname" type="text" placeholder="请输入用户名" />
          <FormInput name="password" type="password" placeholder="请输入密码" />
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
    </Form>
  );
};

export default LoginForm;
