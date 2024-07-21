import { BRANCH_NAME } from "@/constants/misc";
import type { Metadata } from "next";
import React, { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: `商务合作 - ${BRANCH_NAME}`,
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="max-w-[950px]">{children}</div>;
};

export default Layout;
