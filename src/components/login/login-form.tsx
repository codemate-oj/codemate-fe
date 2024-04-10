"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../form/form-input";
import store from "@/store/login";

const formSchema = z.object({
  uname: z.string().min(1, { message: "请输入用户名" }),
  password: z.string().min(1, { message: "请输入密码" }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { uname: "", password: "" },
  });

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
          onClick={() => store.dialogJumpTo("forget-password")}
          type="button"
          variant="link"
          className="text-[#9E9E9E]"
        >
          忘记密码？
        </Button>
        <Button onClick={() => store.dialogJumpTo("register")} type="button" variant="link">
          注册账号
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
