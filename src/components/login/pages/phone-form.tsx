"use client";

import React, { useState } from "react";
import { phoneSchema } from "@/lib/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UnderlinedText from "@/components/common/underlined-text";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VerifyButton from "@/components/common/verify-button";
import { Icon } from "@iconify/react";

const formSchema = z.object({
  phone: phoneSchema,
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
  title = "请输入手机号码",
  description,
  buttonText,
  onSubmit,
  loading,
  error: errorText,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
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
        <form className="my-10" onSubmit={form.handleSubmit((values) => onSubmit?.(values.phone, ticket, randStr))}>
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="请输入电话号码" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              {buttonText ?? "下一步"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PhoneForm;
