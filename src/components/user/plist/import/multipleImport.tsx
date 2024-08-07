import React from "react";
import { Space, Button } from "antd";

/** @desc 批量导入 */
const MultipleImport = () => {
  return (
    <h2 className="mb-5 flex items-center justify-between font-bold">
      <div>
        <label htmlFor="single-import-input" className="text-gray-700">
          批量导入
        </label>
      </div>
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

export default MultipleImport;
