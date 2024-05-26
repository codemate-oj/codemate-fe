import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="my-10 w-full text-center">
      <Spin />
      <p className="mt-5 text-sm text-gray-500">加载中</p>
    </div>
  );
};

export default Loading;
