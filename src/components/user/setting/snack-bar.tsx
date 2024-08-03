import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IProps {
  theme: "success" | "error";
  className?: string;
}

const THEME_VARS: Record<IProps["theme"], { backgroundColor: string; foregroundColor: string; icon: JSX.Element }> = {
  success: {
    backgroundColor: "rgba(255, 125, 55, 0.0588)",
    foregroundColor: "#FF7D37",
    icon: <Image src="/svg/orange-check-circle.svg" alt="ok" width={20} height={20} />,
  },
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.12)",
    foregroundColor: "#CE1126",
    icon: <Image src="/svg/red-warning.svg" alt="warning" width={20} height={20} />,
  },
};

const SnackBar: React.FC<React.PropsWithChildren<IProps>> = ({ theme, className, children }) => {
  const themeVars = THEME_VARS[theme];
  return (
    <div
      className={cn("flex w-full items-center space-x-3 rounded-lg px-4 py-5", className)}
      style={{
        backgroundColor: themeVars.backgroundColor,
        color: themeVars.foregroundColor,
      }}
    >
      {themeVars.icon}
      <div>{children}</div>
    </div>
  );
};

export default SnackBar;
