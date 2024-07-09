import { BRANCH_NAME } from "@/constants/misc";
import type { Metadata } from "next";
import React, { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: `用户登录/注册 - ${BRANCH_NAME}`,
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
