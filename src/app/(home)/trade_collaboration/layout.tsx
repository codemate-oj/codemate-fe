import type { Metadata } from "next";
import React, { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "商务合作 - CODEMATE",
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
