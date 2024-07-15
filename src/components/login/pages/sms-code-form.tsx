/**
 * 短信验证码
 */

"use client";

import React, { useState } from "react";
import { phoneSchema, smsCode } from "@/lib/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UnderlinedText from "@/components/common/underlined-text";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SendCodeButton from "@/components/form/send-code-btn";
import VerifyButton from "@/components/common/verify-button";
import { Icon } from "@iconify/react";
import { useLockFn } from "ahooks";
import { HydroError } from "@/lib/error";
import store from "@/store/login";

const formSchema = z.object({
  phone: phoneSchema,
  verifyCode: smsCode,
});

interface IProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (value: string, ticket: string, randStr: string) => void;
  loading?: boolean;
  error?: string;
}

const PhoneForm: React.FC<IProps> = ({
  title = "短信验证码登录",
  description,
  buttonText = "登录",
  loading,
  error,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      verifyCode: "",
    },
  });

  const [errorText, setErrorText] = React.useState(error);
  const [verifyPassed, setVerifyPassed] = useState(false);
  const [ticket, setTicket] = useState("");
  const [randStr, setRandStr] = useState("");
  const [tokenId, setTokenId] = useState("");
  useState;
  const handleSubmit = useLockFn(async (values: z.infer<typeof formSchema>) => {
    try {
      await store.loginSms(values.verifyCode, tokenId);
    } catch (e) {
      console.error(e);
      if (e instanceof HydroError) {
        setErrorText(e.message);
      }
    }
  });

  // 处理请求成功接收到的tokenId
  const handleSuccess = (tokenId: string) => {
    setTokenId(tokenId);
  };
  // 处理请求失败接收到的信息
  const handleFail = (e: string) => {
    setErrorText(e);
  };

  return (
    <>
      {title && (
        <div className="w-fit px-1">
          <UnderlinedText>{title}</UnderlinedText>
        </div>
      )}
      {description && <p className="mt-3 text-sm text-[#797979]">{description}</p>}
      <Form {...form}>
        <form className="my-10" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col space-y-8">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="请输入手机号码" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <FormField
                control={form.control}
                name="verifyCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="请输入短信验证码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute right-0 top-0 h-full">
                <SendCodeButton
                  phone={form.watch("phone")}
                  label="发送"
                  className="h-full"
                  disabled={!verifyPassed}
                  ticket={ticket}
                  randStr={randStr}
                  onSuccess={handleSuccess}
                  error={handleFail}
                />
              </div>
            </div>

            {errorText && (
              <p className="flex items-center gap-x-2 px-1 text-sm text-red-500">
                <Icon inline icon="ic:baseline-error" />
                {errorText}
              </p>
            )}
            <VerifyButton
              className="mb-2"
              onVerifySuccess={(e) => {
                setTicket(e.ticket);
                setRandStr(e.randstr);
                setVerifyPassed(true);
              }}
            />

            <Button type="submit" className="block w-full" disabled={!verifyPassed} loading={loading}>
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PhoneForm;
