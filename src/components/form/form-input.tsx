import { cn } from "@/lib/utils";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formInstance: UseFormReturn<any>;
  label?: string;
  name: string;
}

const FormInput: React.FC<InputProps> = ({ className, children, name, label, formInstance, ...props }) => {
  return (
    <FormField
      control={formInstance.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
