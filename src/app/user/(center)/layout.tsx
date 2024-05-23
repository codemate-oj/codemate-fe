import PageTitle from "@/components/common/page-title";
import SquareSideTabs from "@/components/common/square-side-tabs";
import NavigationTabs from "@/components/user/navigation-tabs";
import { userCenterRoutes } from "@/constants/routes";
import { type Metadata } from "next";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

export const metadata: Metadata = {
  title: "我的空间 - CODEMATE",
};

const UserCenterLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="m-auto max-w-screen-lg pb-10">
      <PageTitle>我的空间</PageTitle>
      <div className="flex gap-x-8">
        <NavigationTabs />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default UserCenterLayout;
