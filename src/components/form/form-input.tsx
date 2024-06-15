/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { CommonFormItemProps } from "./form-item-wrapper";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  addressDescription?: boolean;
  name: string;
  wrapperClassName?: string;
}

const FormInput: React.FC<InputProps> = ({
  className,
  wrapperClassName,
  children,
  name,
  label,
  description,
  addressDescription,
  ...props
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", wrapperClassName)}>
          {label && (
            <FormLabel className={cn(props.required && "after:ml-0.5 after:text-red-500 after:content-['*']")}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          {description && (
            <FormDescription
              className={cn("text-xs", addressDescription ? "text-red-500 before:mr-0.5 before:content-['*']" : "")}
            >
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
