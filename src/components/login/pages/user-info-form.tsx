"use client";

import React from "react";
import UnderlinedText from "../../common/underlined-text";
import store from "@/store/login";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";

const formSchema = z.object({
  verifyCode: z.string({ required_error: "请输入验证码" }).length(6, "验证码必须为6位"),
  nickname: z.string().optional(),
  location: z.string().array().length(3, "请选择国家和地区"),
  userRole: z.string({ required_error: "请选择用户角色" }),
  password: passwordSchema,
  verifyPassword: z.string({ required_error: "请再次输入密码" }),
});

const UserInfoForm = () => {
  const currentContext = store.useCurrentContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verifyCode: "",
      nickname: "",
      location: ["cn"],
      userRole: "",
      password: "",
      verifyPassword: "",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="w-fit px-1">
        <UnderlinedText>注册账户</UnderlinedText>
      </div>
      <div className="text-sm text-[#9E9E9E]">验证码已发送至：{currentContext?.sendTo}</div>
      <Form {...form}>
        <FormInput name="verifyCode" type="text" placeholder="请输入验证码" />
      </Form>
    </div>
  );
};

export default UserInfoForm;
