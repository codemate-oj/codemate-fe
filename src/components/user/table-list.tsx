"use client";
import { userCenterRoutes } from "@/constants/routes";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button, Modal, Input, Breadcrumb } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableList = ({ children }: any) => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="flex-1">
      <h3 className="mb-5 flex items-center justify-between text-lg font-bold text-[#3D3D3D]">
        <span>{userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name ?? "我的中心"}</span>
        {userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name === "我的题单" && (
          <>
            <Breadcrumb
              items={[
                {
                  title: "Home",
                },
                {
                  title: <a href="">Application Center</a>,
                },
                {
                  title: <a href="">Application List</a>,
                },
                {
                  title: "An Application",
                },
              ]}
            />
            <Button className="font-bold" onClick={createQuiz}>
              创建题单
            </Button>
          </>
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
  );
};

export default TableList;
