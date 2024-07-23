"use client";
import { userCenterRoutes } from "@/constants/routes";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Breadcrumb } from "antd";
import CreateQuizModel from "./plist/create-quiz-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableList = ({ children }: any) => {
  const pathname = usePathname();

  const [ModalOpen, setModalOpen] = useState(false);
  // TODO: 存入全局store中
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    {
      title: "我的中心",
    },
  ]);
  const createQuiz = () => {
    setModalOpen(true);
  };
  useEffect((): void => {
    switch (userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name) {
      case "我的题单":
        setBreadcrumbItems([
          {
            title: "我的题单",
          },
        ]);
        break;
      case "其他页面":
        break;
      default:
        const home = userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name ?? "我的中心";
        setBreadcrumbItems([
          {
            title: home,
          },
        ]);
    }
  }, []);

  return (
    <div className="flex-1">
      <h3 className="mb-5 flex items-center justify-between text-lg font-bold text-[#3D3D3D]">
        <Breadcrumb items={breadcrumbItems} />
        {userCenterRoutes.find((r) => pathname.startsWith(r.href))?.name === "我的题单" && (
          <Button className="font-bold" onClick={createQuiz}>
            创建题单
          </Button>
        )}
      </h3>
      {children}
      <CreateQuizModel ModalOpen={ModalOpen}></CreateQuizModel>
    </div>
  );
};

export default TableList;
