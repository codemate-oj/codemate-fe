import React, { PropsWithChildren } from "react";
import { Tag as AntdTag, type TagProps } from "antd";
import { cn } from "@/lib/utils";

const Tag: React.FC<TagProps> = ({ children, className, ...props }) => {
  return (
    <AntdTag color="volcano" className={cn("!text-primary !bg-orange-50 !leading-4", className)} {...props}>
      {children}
    </AntdTag>
  );
};

export default Tag;
