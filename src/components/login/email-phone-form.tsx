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
import useLoginStore from "@/store/login";

const schema = z.object({
  email: z
    .string()
    .email({
      message: "请输入正确的邮箱地址",
    })
    .optional(),
  phone: z.string().length(11, { message: "请输入正确的手机号码" }).optional(),
});

interface IProps {
  title?: string;
  buttonText?: string;
  agreements?: AgreementType[];
  category: VERIFY_OPTIONS;
  onNextStep?: () => void;
}

const EmailPhoneForm: React.FC<IProps> = ({ title, category, buttonText, agreements, onNextStep }) => {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const [agreed, setAgreed] = useState(false);
  const setIdentifier = useLoginStore((state) => state.setLastRegisterIdentifier);

  return (
    <div className="flex flex-col gap-8">
      {title && (
        <div className="w-fit px-1">
          <UnderlinedText>{title}</UnderlinedText>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            setAgreed(true);
            setIdentifier(category === VERIFY_OPTIONS.EMAIL ? values.email! : values.phone!);
            onNextStep?.();
          })}
        >
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="email"
              render={(filed) => (
                <FormItem className={category === VERIFY_OPTIONS.EMAIL ? "block" : "hidden"}>
                  <FormControl>
                    <Input type="email" placeholder="请输入邮箱地址" {...filed} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={(filed) => (
                <FormItem className={category === VERIFY_OPTIONS.PHONE ? "block" : "hidden"}>
                  <FormControl>
                    <Input type="tel" placeholder={`请输入电话号码`} {...filed} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full block">
              {buttonText ?? "下一步"}
            </Button>
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
        </form>
      </Form>
    </div>
  );
};

export default EmailPhoneForm;
