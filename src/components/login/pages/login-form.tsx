"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";
import store from "@/store/login";

const formSchema = z.object({
  uname: z.string().min(1, { message: "请输入用户名" }),
  password: z.string().min(1, { message: "请输入密码" }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => store.login(values.uname, values.password))}>
        <div className="flex flex-col gap-y-8 items-start">
          <FormInput name="uname" type="text" placeholder="请输入用户名" />
          <FormInput name="password" type="password" placeholder="请输入密码" />
          <Button type="button" variant="link">
            短信验证码登录
          </Button>
          <Button type="submit" className="w-full block">
            登录
          </Button>
        </div>
      </form>
      <div className="w-full flex justify-between">
        <Button
          onClick={() =>
            store.dialogJumpTo("choose-verify", {
              title: "找回密码",
              description: "请选择找回密码的方式",
              hideLogo: true,
            })
          }
          type="button"
          variant="link"
          className="text-[#9E9E9E]"
        >
          忘记密码？
        </Button>
        <Button
          onClick={() =>
            store.dialogJumpTo("choose-verify", {
              title: "请选择注册方式",
            })
          }
          type="button"
          variant="link"
        >
          注册账号
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
