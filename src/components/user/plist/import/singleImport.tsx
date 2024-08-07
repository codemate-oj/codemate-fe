import React from "react";
import { Space, Input, Button } from "antd";
// import { useRequest } from "ahooks";
// import { useUrlParamState } from "@/hooks/useUrlParamState";
// import { request } from "@/lib/request";
/** @desc 单独导入组件 */
const SingleImport: React.FC = () => {
  return (
    <h2 className="mb-5 flex items-center justify-between font-bold">
      <Space>
        <label htmlFor="single-import-input" className="text-gray-700">
          单独导入
        </label>
        <Input
          type="text"
          id="single-import-input"
          placeholder="请输入单据编号"
          className="rounded border-gray-300 p-2"
        />
      </Space>
      <div className="flex">
        <Space>
          <Button className="font-bold" type="primary">
            确认导入
          </Button>
          <Button className="font-bold">删除</Button>
        </Space>
      </div>
    </h2>
  );
};

export default SingleImport;
