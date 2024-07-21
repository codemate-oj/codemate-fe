import PageTitle from "@/components/common/page-title";
import { BRANCH_NAME } from "@/constants/misc";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `我的空间 - ${BRANCH_NAME}`,
};

const UserCenterLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="m-auto max-w-screen-lg pb-10">
      <PageTitle>我的空间</PageTitle>
      {children}
    </div>
  );
};

export default UserCenterLayout;
