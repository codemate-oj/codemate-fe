"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useField } from "@formily/react";
import { GeneralField } from "@formily/core";
import { Field as FormilyField } from "@formily/core/esm/models/Field";

interface Option {
  label: string;
  value: string;
}

interface ObjectiveInputProps {
  options: Option[];
  title: string;
}

export const ObjectiveSelect = (props: ObjectiveInputProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const field = useField<FormilyField>(); // 确保字段是 FormilyField 类型

  useEffect(() => {
    // 初始化时同步表单字段的值到组件状态
    if (field.value !== undefined && field.value !== null) {
      setSelectedIndex(field.value);
    }
  }, [field.value]);

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
    field.setValue(index); // 更新字段的值
  };

  return (
    <div className="flex flex-col w-1/2">
      <div>
        {" "}
        <span className="text-primary">【题目描述】</span>
        {props.title}
      </div>
      {props.options.map((option, index) => (
        <Button
          key={index}
          value={option.label}
          variant={selectedIndex === index ? undefined : "outline"}
          className="mb-2 justify-start text-wrap my-2"
          onClick={() => handleButtonClick(index)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
