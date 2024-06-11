"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";

const OnlineCode = dynamic(() => import("@/components/online_code/online-code"), {
  ssr: false,
  loading: () => <Spin />,
});

interface PRightProps {}

const PRight: React.FC<PRightProps> = (props) => {
  const {} = props;
  const [showOnlineCode, setShowOnlineCode] = useState(true);

  const toggleOnlineCodeVisibility = () => {
    setShowOnlineCode(!showOnlineCode);
  };
  const list = [
    {
      content: (
        <button onClick={toggleOnlineCodeVisibility} className="mr-2">
          进入在线编程模式
        </button>
      ),
    },
    { content: "文字题讲解" },
    { content: "讲题视频" },
    { content: "名师评题（预约）" },
    { content: "知识点讲解视频" },
    { content: "名师讲解知识点（预约）" },
    { content: "复制该题" },
    { content: "去论坛看看该题" },
    { content: "提交记录" },
  ];
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div className="py-2 font-yahei" key={index}>
            {typeof item.content === "string" ? (
              item.content
            ) : (
              <>
                {item.content}
                {showOnlineCode && <OnlineCode toggleOnlineCodeVisibility={toggleOnlineCodeVisibility} />}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default PRight;
