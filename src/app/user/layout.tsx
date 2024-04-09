"use client";

import PageTitle from "@/components/common/page-title";
import NavigationTabs from "@/components/user/navigation-tabs";
import { userCenterRoutes } from "@/constants/routes";
import { Metadata } from "next";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const UserCenterLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  const navItems = useMemo<NavItemType[]>(() => {
    return userCenterRoutes?.map((r) => ({ ...r, isActive: pathname.startsWith(r.href) }));
  }, [pathname]);
  return (
    <div className="m-auto max-w-screen-lg pb-10">
      <PageTitle>我的空间</PageTitle>
      <div className="flex gap-x-8">
        <NavigationTabs items={navItems} />
        <div>
          <h3 className="text-[#3D3D3D] text-lg font-bold mb-5">
            {navItems.find((r) => r.isActive)?.name ?? "我的中心"}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserCenterLayout;
