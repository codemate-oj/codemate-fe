"use client";
import { userCenterRoutes } from "@/constants/routes";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Breadcrumb, Space } from "antd";
import CreateQuizModel from "./plist/create-quiz-model";
import DeleteQuizModel from "./plist/delete-quiz-modal";
import Link from "next/link";

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
    if (pathname.match(/^\/user\/plist\/[^/]+\/detail$/)) {
      setBreadcrumbItems([
        {
          title: routerConfig?.name ?? "我的中心",
          href: routerConfig?.href,
        },
        {
          title: "题目管理",
          href: "/user/plist/detail",
        },
      ]);
    }
    if (pathname.match(/^\/user\/plist\/[^/]+\/import$/)) {
      setBreadcrumbItems([
        {
          title: routerConfig?.name ?? "我的中心",
          href: routerConfig?.href,
        },
        {
          title: "添加题目",
          href: "/user/plist/import",
        },
      ]);
    }
  }, [pathname]);

  return (
    <div className="flex-1">
      <h2 className="mb-5 flex items-center justify-between text-4xl font-bold">
        <Breadcrumb items={breadcrumbItems} className="text-4xl" />
        {pathname === "/user/plist" && (
          <Button className="font-bold" onClick={() => setModalOpen(true)}>
            创建题单
          </Button>
        )}
        {pathname.match(/^\/user\/plist\/[^/]+\/detail$/) && (
          <div className="flex">
            <Space>
              <Link href={"/user/plist/import"}>
                <Button className="font-bold">添加</Button>
              </Link>
              <Button className="font-bold" onClick={() => setModalOpen(true)}>
                删除
              </Button>
            </Space>
          </div>
        )}
        {pathname.match(/^\/user\/plist\/[^/]+\/import$/) && (
          <div className="flex">
            <Space>
              <Link href={"/user/plist/import"}>
                <Button className="font-bold">添加</Button>
              </Link>
              <Button className="font-bold" onClick={() => setModalOpen(true)}>
                删除
              </Button>
            </Space>
          </div>
        )}
      </h2>

      {children}

      {pathname.match(/^\/user\/plist\/[^/]+\/detail$/) ? (
        <DeleteQuizModel
          ModalOpen={ModalOpen}
          onCancel={function (): void {
            setModalOpen(false);
          }}
          onCreate={function (): void {
            setModalOpen(false);
          }}
        ></DeleteQuizModel>
      ) : (
        <CreateQuizModel
          ModalOpen={ModalOpen}
          onCancel={function (): void {
            setModalOpen(false);
          }}
          onCreate={function (): void {
            setModalOpen(false);
          }}
        ></CreateQuizModel>
      )}
      {pathname.match(/^\/user\/plist\/[^/]+\/import$/) ? (
        <DeleteQuizModel
          ModalOpen={ModalOpen}
          onCancel={function (): void {
            setModalOpen(false);
          }}
          onCreate={function (): void {
            setModalOpen(false);
          }}
        ></DeleteQuizModel>
      ) : (
        <CreateQuizModel
          ModalOpen={ModalOpen}
          onCancel={function (): void {
            setModalOpen(false);
          }}
          onCreate={function (): void {
            setModalOpen(false);
          }}
        ></CreateQuizModel>
      )}
    </div>
  );
};

export default TableList;
