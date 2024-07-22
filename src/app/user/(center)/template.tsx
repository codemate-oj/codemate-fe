"use client";
import NotLogin from "@/components/error/not-login";
import NavigationTabs from "@/components/user/navigation-tabs";
import { userCenterRoutes } from "@/constants/routes";
import loginStore from "@/store/login";
import { Button, Modal, Input } from "antd";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useState } from "react";

const UserCenterTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const user = loginStore.user.use();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!user) {
    return (
      <div className="mt-10">
        <NotLogin />
      </div>
    );
  }

  const createQuiz = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex gap-x-8">
      <NavigationTabs />
      <div className="flex-1">
        <h3 className="mb-5 flex items-center justify-between text-lg font-bold text-[#3D3D3D]">
          <span>{userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name ?? "我的中心"}</span>
          {userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name === "我的题单" && (
            <Button className="font-bold" onClick={createQuiz}>
              创建题单
            </Button>
          )}
        </h3>
        {children}
        {/* // TODO: DDL 2024/07/22 修改为组件 */}
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>题单名称</p>
          <Input />
          <p>题单描述</p>
          <Input />
        </Modal>
      </div>
    </div>
  );
};

export default UserCenterTemplate;
