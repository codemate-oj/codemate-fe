"use client";

import React, { useContext, useState } from "react";
import { VERIFY_OPTIONS } from "./user-verify";
import UnderlinedText from "../common/underlined-text";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useLoginStore } from "@/providers/login-store-provider";

const emailSchema = z.object({
  email: z.string().email({ message: "请输入正确的邮箱" }),
});

const phoneSchema = z.object({
  phone: z.string().regex(/^1[3456789]\d{9}$/, { message: "请输入正确的手机号" }),
});

interface IProps {
  title?: string;
  description?: string;
  buttonText?: string;
  agreements?: AgreementType[];
  category: VERIFY_OPTIONS;
  onNextStep?: (identifier?: string) => void;
}

const EmailPhoneForm: React.FC<IProps> = ({ title, category, buttonText, agreements, description, onNextStep }) => {
  const isEmail = category === VERIFY_OPTIONS.EMAIL;

  const [agreed, setAgreed] = useState(false);
  const setLastRegisterIdentifier = useLoginStore((state) => state.setLastRegisterIdentifier);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSubmit = (values: any) => {
    setAgreed(true);
    const value = isEmail ? values.email : values.phone;
    // console.log(value);
    setLastRegisterIdentifier(value);
    onNextStep?.(value);
  };

  return (
    <div className="flex flex-col">
      {title && (
        <div className="w-fit px-1">
          <UnderlinedText>{title}</UnderlinedText>
        </div>
      )}
      {description && <p className=" mt-3 text-sm text-[#797979]">{description}</p>}
      {isEmail ? (
        <Form {...emailForm}>
          <form className="my-10" onSubmit={emailForm.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-8">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="请输入邮箱地址" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full block">
                {buttonText ?? "下一步"}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...phoneForm}>
          <form className="my-10" onSubmit={phoneForm.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-8">
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="tel" placeholder={`请输入电话号码`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full block">
                {buttonText ?? "下一步"}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {agreements && agreements.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <Checkbox id="agreement" checked={agreed} onClick={() => setAgreed(!agreed)} />
          <label htmlFor="agreement">
            我已阅读并同意
            {agreements.map((i) => (
              <a href={i.href} target="_blank" key={i.href} className={cn("text-[#FF7D37]", i.className)}>
                《{i.title}》
              </a>
            ))}
          </label>
        </div>
      )}
    </div>
  );
};

export default EmailPhoneForm;
