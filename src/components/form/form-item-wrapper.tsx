import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export interface CommonFormItemProps {
  label?: string;
  description?: string;
  addressDescription?: boolean;
  name: string;
  wrapperClassName?: string;
  required?: boolean;
  children: React.ReactElement;
}

const FormItemWrapper: React.FC<CommonFormItemProps> = ({
  wrapperClassName,
  label,
  name,
  description,
  addressDescription,
  required,
  children,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", wrapperClassName)}>
          {label && (
            <FormLabel className={cn(required && "after:ml-0.5 after:text-red-500 after:content-['*']")}>
              {label}
            </FormLabel>
          )}
          <FormControl>{React.cloneElement(children, field)}</FormControl>
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

export default FormItemWrapper;
