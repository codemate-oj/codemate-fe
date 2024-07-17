"use client";

import React, { useState, useEffect } from "react";
import { smsCode } from "@/lib/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UnderlinedText from "@/components/common/underlined-text";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import CodeInput from "./code-input";
import store from "@/store/login";
import useCountdown from "@/hooks/useCountdown";
import { useLockFn } from "ahooks";
import { request } from "@/lib/request";
import { HydroError } from "@/lib/error";

const formSchema = z.object({
  code: smsCode,
});

interface IProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (value: string, ticket: string, randStr: string) => void;
  loading?: boolean;
  error?: string;
}

const CodeForm: React.FC<IProps> = ({ title = "请输入验证码", buttonText = "下一步", loading, error }) => {
  const currentContext = store.useCurrentContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const [errorText, setErrorText] = useState(error);
  const [tokenId, setTokenId] = useState(currentContext?.token);

  const { countdown, resetCountdown, isCoolingDown } = useCountdown(60);

  useEffect(() => {
    resetCountdown(countdown);
  }, [countdown, resetCountdown]);

  // 重新发送请求
  const reSend = useLockFn(async () => {
    try {
      const token = await request.post(
        "/user/lostpass",
        {
          emailOrPhone: currentContext?.sendTo,
        },
        {
          transformData: ({ data }) => data.tokenId,
        }
      );
      setTokenId(token);
      resetCountdown(60);
    } catch (e) {
      console.error(e);
      if (e instanceof HydroError) {
        setErrorText(e.message);
      }
    }
  });

  // 下一步处理
  const handleSubmit = useLockFn(async (values: z.infer<typeof formSchema>) => {
    setErrorText("");
    try {
      const token = await request.post(
        "/user/lostpass/with_code",
        {
          tokenId: tokenId,
          verifyCode: values.code,
          emailOrPhone: currentContext?.sendTo,
        },
        {
          transformData: ({ data }) => data.tokenId,
        }
      );
      store.dialogJumpTo("reset-pass", {
        token: token,
        hideLogo: true,
      });
    } catch (e) {
      console.error(e);
      if (e instanceof HydroError) {
        setErrorText(e.message);
      } else {
        setErrorText("验证码输入错误！");
      }
    }
  });

  const getCodeInput = (value: string) => {
    form.setValue("code", value);
  };

  return (
    <>
      {title && (
        <div className="w-fit px-1">
          <UnderlinedText>{title}</UnderlinedText>
        </div>
      )}
      <p className="mt-3 text-sm text-[#797979]">验证码已经发送至：{currentContext?.sendTo}</p>
      <Form {...form}>
        <form className="my-10" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="code"
              render={() => (
                <FormItem>
                  <FormControl>
                    <CodeInput count={6} onChange={getCodeInput} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-[#797979]">
              {isCoolingDown ? (
                <div>{<span className="text-[#FF7D37]">{countdown}秒</span>}后可重新发送</div>
              ) : (
                <button className="text-[#FF7D37]" onClick={reSend}>
                  重新发送
                </button>
              )}
            </div>
            {errorText && (
              <p className="flex items-center gap-x-2 px-1 text-sm text-red-500">
                <Icon inline icon="ic:baseline-error" />
                {errorText}
              </p>
            )}

            <Button type="submit" className="block w-full" loading={loading}>
              {buttonText ?? "下一步"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CodeForm;
