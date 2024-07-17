"use client";
import React from "react";
import UnderlinedText from "../../common/underlined-text";
import store from "@/store/login";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";
import { message } from "antd";
import { Button } from "@/components/ui/button";
import { createPasswordSchema } from "@/lib/form";
import { request } from "@/lib/request";
import { useLockFn } from "ahooks";
import { HydroError } from "@/lib/error";

const formSchema = z
  .object({
    password: createPasswordSchema,
    verifyPassword: z.string({ required_error: "请再次输入密码" }),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "两次输入的密码不一致",
    path: ["verifyPassword"],
  });

interface IProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (value: string, ticket: string, randStr: string) => void;
  loading?: boolean;
  error?: string;
}

const RestPassForm: React.FC<IProps> = ({}) => {
  const currentContext = store.useCurrentContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      verifyPassword: "",
    },
  });

  const handleSubmit = useLockFn(async (values: z.infer<typeof formSchema>) => {
    try {
      await request.post("/user/lostpass/reset", {
        tokenId: currentContext?.token,
        password: values.password,
      });
      message.success("重置成功");
      window.location.reload();
    } catch (e) {
      console.error(e);
      if (e instanceof HydroError) {
        message.error(e.message);
      }
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="w-fit px-1">
        <UnderlinedText>重新设置密码</UnderlinedText>
      </div>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormInput name="password" type="text" placeholder="请输入新密码" required />
          <FormInput required name="verifyPassword" type="text" placeholder="请再次输入" />
          <p className="text-[#FF0000]">* 特别提示：必须同时包含数字和字母 注意区分字母大小写。</p>
          <Button type="submit" className="mt-4 w-full">
            确认重置
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RestPassForm;
