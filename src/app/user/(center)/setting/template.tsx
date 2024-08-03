"use client";
import { userSettingRoutes } from "@/constants/routes";
import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

const UserCenterSettingTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <Tabs
        items={userSettingRoutes.map((route) => ({ key: route.href, label: route.name }))}
        activeKey={pathname}
        onChange={(key) => router.push(key)}
      />
      {children}
    </div>
  );
};

export default UserCenterSettingTemplate;
