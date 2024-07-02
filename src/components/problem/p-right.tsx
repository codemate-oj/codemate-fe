"use client";
import loginStore from "@/store/login";
import Link from "next/link";
import React from "react";

interface PRightProps {
  pid: string;
}
const PRight: React.FC<PRightProps> = ({ pid }) => {
  const user = loginStore.user.use();

  const list = [
    { name: "进入在线编程模式", href: "#" },
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
      {list.map((item) => {
        return (
          <Link href={item.href} className="block py-2 font-yahei hover:text-primary" key={item.name} target="_blank">
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};
export default PRight;
