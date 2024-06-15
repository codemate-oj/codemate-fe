import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import PasswordStrengthBar from "react-password-strength-bar";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  wrapperClassName?: string;
  showStrengthBar?: boolean;
}

const PasswordCreateInput: React.FC<InputProps> = ({ wrapperClassName, name, label, showStrengthBar, ...props }) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", wrapperClassName)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type="password" {...field} {...props} />
          </FormControl>
          {showStrengthBar && (
            <PasswordStrengthBar
              password={field.value}
              shortScoreWord="密码长度不足"
              scoreWords={["弱密码", "弱密码", "合格", "合格", "强密码"]}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordCreateInput;
