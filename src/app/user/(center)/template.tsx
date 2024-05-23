"use client";
import { userCenterRoutes } from "@/constants/routes";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

const UserCenterTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <h3 className="text-[#3D3D3D] text-lg font-bold mb-5">
        {userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name ?? "我的中心"}
      </h3>
      {children}
    </>
  );
};

export default UserCenterTemplate;
