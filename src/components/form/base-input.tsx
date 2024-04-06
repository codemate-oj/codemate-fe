import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: React.InputHTMLAttributes<HTMLInputElement>["type"] | "idcard";
}

const BaseInput: React.FC<InputProps> = ({ className, children, ...props }) => {
  return (
    <input className={cn("input input-bordered w-full invalid:input-error", className)} {...props}>
      {children}
    </input>
  );
};

export default BaseInput;
