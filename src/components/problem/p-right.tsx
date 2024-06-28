"use client";
import loginStore from "@/store/login";
import Link from "next/link";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";

const OnlineCode = dynamic(() => import("@/components/online_code/online-code"), {
  ssr: false,
  loading: () => <Spin />,
});

interface PRightProps {
  pid: string;
}

const PRight: React.FC<PRightProps> = ({ pid }) => {
  const user = loginStore.user.use();

  const [showOnlineCode, setShowOnlineCode] = useState(false);

  const toggleOnlineCodeVisibility = () => {
    setShowOnlineCode((prevShowOnlineCode) => !prevShowOnlineCode);
  };

  const list = [
    {
      name: "进入在线编程模式",
      content: (
        <button onClick={toggleOnlineCodeVisibility} className="mr-2">
          进入在线编程模式
        </button>
      ),
    },
    { name: "文字题讲解", href: "#" },
    { name: "讲题视频", href: "#" },
    { name: "名师评题（预约）", href: "#" },
    { name: "知识点讲解视频", href: "#" },
    { name: "名师讲解知识点（预约）", href: "#" },
    { name: "复制该题", href: "#" },
    { name: "去论坛看看该题", href: "#" },
    { name: "提交记录", href: `/record?pid=${pid}&uidOrName=${user?._id}` },
  ];
  return (
    <div>
      {list.map((item, index) => {
        return item.href ? (
          <Link href={item.href} className="block py-2 font-yahei hover:text-primary" key={item.name} target="_blank">
            {item.name}
          </Link>
        ) : (
          <div className="block py-2 font-yahei hover:text-primary" key={index}>
            {item.content}
            {showOnlineCode && <OnlineCode toggleOnlineCodeVisibility={toggleOnlineCodeVisibility} />}
          </div>
        );
      })}
    </div>
  );
};
export default PRight;
