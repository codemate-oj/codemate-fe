"use client";

import React, { useState } from "react";
import { emailSchema } from "@/lib/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UnderlinedText from "@/components/common/underlined-text";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VerifyButton from "@/components/common/verify-button";

const formSchema = z.object({
  email: emailSchema,
});

interface IProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (value: string, ticket: string, randStr: string) => void;
  loading?: boolean;
}

const EmailForm: React.FC<IProps> = ({ title = "请输入邮箱", description, buttonText = "提交", onSubmit, loading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [verifyPassed, setVerifyPassed] = useState(false);
  const [ticket, setTicket] = useState("");
  const [randStr, setRandStr] = useState("");

  return (
    <>
      {title && (
        <div className="w-fit px-1">
          <UnderlinedText>{title}</UnderlinedText>
        </div>
      )}
      {description && <p className="mt-3 text-sm text-[#797979]">{description}</p>}
      <Form {...form}>
        <form className="my-10" onSubmit={form.handleSubmit((values) => onSubmit?.(values.email, ticket, randStr))}>
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
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
            <VerifyButton
              className="mb-2"
              onVerifySuccess={(e) => {
                setTicket(e.ticket);
                setRandStr(e.randstr);
                setVerifyPassed(true);
              }}
            />
            <Button type="submit" className="block w-full" disabled={!verifyPassed} loading={loading}>
              {buttonText ?? "下一步"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EmailForm;
