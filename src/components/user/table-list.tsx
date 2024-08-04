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
    const items = [
      {
        title: routerConfig?.name ?? "我的中心",
        href: routerConfig?.href,
      },
    ];

    if (pathname.match(/^\/user\/plist\/[^/]+\/detail$/)) {
      items.push({
        title: "题目管理",
        href: "/user/plist/detail",
      });
    } else if (pathname.match(/^\/user\/plist\/[^/]+\/import$/)) {
      items.push({
        title: "添加题目",
        href: "/user/plist/import",
      });
    }

    setBreadcrumbItems(items);
  }, [pathname, routerConfig]);

  const breadcrumbRenderItems = breadcrumbItems.map((item, index) => ({
    key: index,
    title: item.href ? (
      <Link href={item.href}>
        <span
          className={
            index === breadcrumbItems.length - 1
              ? "text-xl font-bold text-orange-500"
              : "text-xl font-bold text-gray-800"
          }
        >
          {item.title}
        </span>
      </Link>
    ) : (
      <span
        className={
          index === breadcrumbItems.length - 1 ? "text-xl font-bold text-orange-500" : "text-xl font-bold text-gray-800"
        }
      >
        {item.title}
      </span>
    ),
  }));

  return (
    <div className="flex-1">
      <h2 className="mb-5 flex items-center justify-between font-bold">
        <Breadcrumb items={breadcrumbRenderItems} className="text-2xl" />
        {pathname === "/user/plist" && (
          <Button className="font-bold" onClick={() => setModalOpen(true)}>
            创建题单
          </Button>
        )}
        {pathname.match(/^\/user\/plist\/[^/]+\/detail$/) && (
          <div className="flex">
            <Space>
              <Link href={"/user/plist/import"}>
                <Button className="font-bold" type="primary">
                  添加
                </Button>
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
                <Button className="font-bold" type="primary">
                  添加
                </Button>
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
