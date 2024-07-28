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
      href: "any",
    },
  ]);

  const routerConfig = userCenterRoutes.find((r) => pathname.startsWith(r.href));

  useEffect((): void => {
    setBreadcrumbItems([
      {
        title: routerConfig?.name ?? "我的中心",
        href: routerConfig?.href,
      },
    ]);
    if (pathname === "/user/plist/detail") {
      setBreadcrumbItems([
        {
          title: routerConfig?.name ?? "我的中心",
          href: routerConfig?.href,
        },
        {
          title: "题目详情",
          href: "/user/plist/detail",
        },
      ]);
    }
  }, []);

  return (
    <div className="flex-1">
      <h3 className="mb-5 flex items-center justify-between text-lg font-bold text-[#3D3D3D]">
        <Breadcrumb items={breadcrumbItems} />
        {pathname === "/user/plist" && (
          <Button className="font-bold" onClick={() => setModalOpen(true)}>
            创建题单
          </Button>
        )}
      </h3>
      {children}
      <CreateQuizModel
        ModalOpen={ModalOpen}
        onCancel={function (): void {
          setModalOpen(false);
        }}
        onCreate={function (): void {
          setModalOpen(false);
        }}
      ></CreateQuizModel>
    </div>
  );
};

export default TableList;
