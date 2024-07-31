"use client";
import { Modal } from "antd";
import React, { useState } from "react";
import LABLEVALUEMAP from "./labelValueMap";

interface DialogPropsType extends React.ComponentProps<typeof Modal> {
  onChange?: (activeValues: string[]) => void;
  onOk?: (e: React.MouseEvent<HTMLElement>, activeValues?: string[]) => void;
}
const activeClassNames = "bg-primary text-white font-bold";
const PromblemTagFilterDialog: React.FC<DialogPropsType> = (props) => {
  const { onChange, onOk, ...rest } = props;
  const [active, setActive] = useState<string[]>([]);

  return (
    <Modal
      {...rest}
      onOk={(e) => {
        onOk && onOk(e, active);
        setActive([]);
      }}
    >
      {LABLEVALUEMAP.map((item) => {
        return (
          <div key={item.title}>
            <header className="my-4 text-xs text-slate-600">{item.title}</header>
            <div className="flex flex-wrap">
              {item.option.map((tagItem) => (
                <span
                  key={tagItem.value}
                  onClick={() => {
                    setActive((prev) => {
                      if (prev.includes(tagItem.value)) {
                        onChange && onChange(prev.filter((item) => item !== tagItem.value));
                        return prev.filter((item) => item !== tagItem.value);
                      } else {
                        onChange && onChange([...prev, tagItem.value]);
                        return [...prev, tagItem.value];
                      }
                    });
                  }}
                  className={
                    "mb-4 mr-4 cursor-pointer rounded-lg border px-2 py-1 text-sm font-medium " +
                    (active.includes(tagItem.value) ? activeClassNames : "text-black")
                  }
                >
                  {tagItem.label}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </Modal>
  );
};

export default PromblemTagFilterDialog;
