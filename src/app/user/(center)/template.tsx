"use client";
import NotLogin from "@/components/error/not-login";
import NavigationTabs from "@/components/user/navigation-tabs";
import { userCenterRoutes } from "@/constants/routes";
import loginStore from "@/store/login";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

const UserCenterTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const user = loginStore.user.use();

  if (!user) {
    return (
      <div className="mt-10">
        <NotLogin />
      </div>
    );
  }

  return (
    <div className="flex gap-x-8">
      <NavigationTabs />
      <div className="flex-1">
        <h3 className="mb-5 text-lg font-bold text-[#3D3D3D]">
          {userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name ?? "我的中心"}
        </h3>
        {children}
      </div>
    </div>
  );
};

export default UserCenterTemplate;
