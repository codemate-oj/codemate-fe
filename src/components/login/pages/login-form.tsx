"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";
import store from "@/store/login";
import { passwordSchema, unameSchema } from "@/lib/validate";
import { HydroError } from "@/lib/error";
import { useLockFn } from "ahooks";

const formSchema = z.object({
  uname: unameSchema,
  password: passwordSchema,
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const [errorText, setErrorText] = React.useState("");

  const handleSubmit = useLockFn(async (values: z.infer<typeof formSchema>) => {
    setErrorText("");
    try {
      await store.login(values.uname, values.password);
    } catch (e) {
      console.error(e);
      if (e instanceof HydroError) {
        setErrorText("用户名或密码错误");
      }
    }
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-8 items-start" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormInput name="uname" type="text" placeholder="请输入用户名 / 邮箱 / 手机号" />
        <FormInput name="password" type="password" placeholder="请输入密码" />
        {errorText && (
          <p className="px-1 flex gap-x-2 items-center text-sm text-red-500">
            <Icon inline icon="ic:baseline-error" />
            {errorText}
          </p>
        )}
        <Button type="button" variant="link">
          短信验证码登录
        </Button>
        <Button type="submit" className="w-full block">
          登录
        </Button>
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
              category: "register",
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
