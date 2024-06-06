"use client";

import React from "react";
import UnderlinedText from "../../common/underlined-text";
import store from "@/store/login";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";
import { FormLocationSelect } from "@/components/form/location-select";
import { Button } from "@/components/ui/button";
import { FormUserRoleSelect } from "@/components/form/user-role-select";
import { UserRole } from "@/constants/misc";
import PasswordCreateInput from "@/components/form/password-create-input";
import { createPasswordSchema } from "@/lib/form";

const formSchema = z
  .object({
    verifyCode: z.string({ required_error: "请输入验证码" }).length(6, "验证码必须为6位"),
    // 用户名校验：不能包含汉字和特殊字符，只能包含数字、字母、下划线和短横线
    uname: z.string({ required_error: "请输入用户ID" }).regex(/^[a-zA-Z0-9_-]+$/, "用户ID不能包含汉字和特殊字符"),
    nickname: z.string().optional(),
    location: z.string().array(),
    userRole: z.number({ required_error: "请选择用户角色" }),
    password: createPasswordSchema,
    verifyPassword: z.string({ required_error: "请再次输入密码" }),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "两次输入的密码不一致",
    path: ["verifyPassword"],
  });

const UserInfoForm = () => {
  const currentContext = store.useCurrentContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verifyCode: "",
      uname: "",
      nickname: "",
      location: ["CN"],
      userRole: UserRole.PRIMARY_SCHOOL_STUDENT,
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
        <form className="space-y-4">
          <FormInput name="verifyCode" type="text" placeholder="请输入验证码" required />
          <FormInput
            required
            name="uname"
            type="text"
            label="用户ID"
            placeholder="请输入用户ID"
            description="用户ID不能包含汉字和特殊字符，一旦确定将无法更改"
            addressDescription
          />
          <FormInput name="nickname" type="text" label="昵称" placeholder="请输入昵称" />
          <FormLocationSelect name="location" label="选择地区" />
          <FormUserRoleSelect name="userRole" label="选择角色" />
          <PasswordCreateInput name="password" label="密码" showStrengthBar />
          <FormInput name="verifyPassword" type="password" label="确认密码" placeholder="请再次输入密码" />
          <Button type="submit" className="mt-4 w-full">
            确认并登录
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInfoForm;
