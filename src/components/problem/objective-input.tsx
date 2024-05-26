"use client";
import React, { useState } from "react";
import { useField } from "@formily/react";
import { Field as FormilyField } from "@formily/core"; // 导入 Field 的类型定义
import { Input } from "antd";

interface ObjectiveInputProps {
  title: string;
}

const ObjectiveInput: React.FC<ObjectiveInputProps> = ({ title }) => {
  const [content, setContent] = useState<string>("");
  const field = useField<FormilyField>(); // 确保字段是 FormilyField 类型

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    field.setValue(e.target.value); // 使用 setValue 方法
  };

  return (
    <div className="w-1/2">
      <span>{title}</span>
      <Input value={content} onChange={handleChange} />
    </div>
  );
};

export default ObjectiveInput;
