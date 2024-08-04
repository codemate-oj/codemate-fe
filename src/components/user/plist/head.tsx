import React from "react";
import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface HeaderProps {
  title: string;
  content: string;
}

const HeaderComponent = (Props: HeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between rounded bg-white p-4 shadow-md">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">{Props.title || "题单名"}</h1>
        <span className="ml-4 text-gray-500">{Props.content || "题单描述"}</span>
      </div>
      <Tooltip title="编辑">
        <Button type="link" className="text-orange-500" icon={<EditOutlined style={{ fontSize: "20px" }} />} />
      </Tooltip>
    </div>
  );
};

export default HeaderComponent;
