"use client";
import React, { PropsWithChildren } from "react";

import NotLogin from "@/components/error/not-login";
import NavigationTabs from "@/components/user/navigation-tabs";
import loginStore from "@/store/login";
import TableList from "@/components/user/table-list";

const UserCenterTemplate: React.FC<PropsWithChildren> = ({ children }) => {
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
      <TableList>{children}</TableList>
    </div>
  );
};

export default UserCenterTemplate;
