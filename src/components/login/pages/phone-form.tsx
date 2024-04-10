"use client";

import React from "react";
import store from "@/store/login";
import { phoneSchema } from "@/lib/validate";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UnderlinedText from "@/components/common/underlined-text";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  phone: phoneSchema,
});

interface IProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

const PhoneForm: React.FC<IProps> = ({ title = "请输入手机号码", description, buttonText = "提交", onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });
  return (
    <>
      {title && (
        <div className="w-fit px-1">
          <UnderlinedText>{title}</UnderlinedText>
        </div>
      )}
      {description && <p className=" mt-3 text-sm text-[#797979]">{description}</p>}
      <Form {...form}>
        <form className="my-10" onSubmit={form.handleSubmit((values) => onSubmit?.(values))}>
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

            <Button type="submit" className="w-full block">
              {buttonText ?? "下一步"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PhoneForm;
