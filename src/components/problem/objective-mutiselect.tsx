"use client";
import { useState, useEffect } from "react";
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

export const ObjectiveMutiSelect = (props: ObjectiveInputProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const field = useField<FormilyField>(); // 确保字段是 FormilyField 类型

  useEffect(() => {
    // 初始化时同步表单字段的值到组件状态
    if (field.value !== undefined && field.value !== null) {
      setSelectedIndex(field.value);
    }
  }, [field.value]);

  const handleButtonClick = (index: number) => {
    let newArr;
    if (selectedIndex.includes(index)) newArr = selectedIndex.filter((i) => i != index);
    else newArr = [...selectedIndex, index];

    setSelectedIndex(newArr);
    field.setValue(newArr); // 更新字段的值
  };

  return (
    <div className="flex flex-col w-1/2">
      <div>{props.title}</div>
      {props.options.map((option, index) => (
        <Button
          key={index}
          value={option.label}
          variant={selectedIndex.includes(index) ? undefined : "outline"}
          className="mb-2 justify-start text-wrap"
          onClick={() => handleButtonClick(index)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
