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
import { passwordSchema, unameSchema } from "@/lib/form";
import { HydroError } from "@/lib/error";
import { useLockFn } from "ahooks";
import VerifyButton from "@/components/common/verify-button";

const formSchema = z.object({
  uname: unameSchema,
  password: passwordSchema,
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const [errorText, setErrorText] = React.useState("");
  const [verifyPassed, setVerifyPassed] = React.useState(false);

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
      <form className="flex flex-col items-start gap-1" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormInput name="uname" type="text" wrapperClassName="mb-4" placeholder="请输入用户名 / 邮箱 / 手机号" />
        <FormInput name="password" type="password" placeholder="请输入密码" />
        {errorText && (
          <p className="flex items-center gap-x-2 px-1 text-sm text-red-500">
            <Icon inline icon="ic:baseline-error" />
            {errorText}
          </p>
        )}
        <Button type="button" variant="link" className="mb-4 mt-2 p-0 pl-1">
          短信验证码登录
        </Button>
        <VerifyButton
          className="mb-2"
          onVerifySuccess={() => {
            setVerifyPassed(true);
          }}
        />
        <Button type="submit" className="block w-full" disabled={!verifyPassed}>
          登录
        </Button>
      </form>
      <div className="mt-4 flex w-full justify-between">
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
