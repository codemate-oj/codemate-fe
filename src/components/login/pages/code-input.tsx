import React, { useRef } from "react";
import { Input, InputRef } from "antd";

interface IProps {
  count?: number;
  onChange?: (value: string) => void;
}

const CodeInput: React.FC<IProps> = ({ count = 5, onChange }) => {
  const inputArr = new Array(count).fill("");
  const inputRefs = useRef<Array<InputRef>>([]);

  const getRef = (dom: InputRef) => {
    if (inputRefs?.current?.length === count) {
      return;
    }
    inputRefs.current.push(dom);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // 按删除键
    if (e?.key === "Backspace") {
      const currentInputRef = inputRefs?.current[index];
      if (!currentInputRef.input?.value && index > 0) {
        if (currentInputRef.input !== null) {
          currentInputRef.input.value = "";
          const preInput = inputRefs.current[index - 1];
          preInput?.select();
          e.preventDefault();
        }
      }
    }
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let code = "";
    inputRefs?.current?.forEach((ref: InputRef) => {
      const val = ref?.input?.value;
      if (val) {
        code += val;
      }
    });
    const currentValue = e?.target?.value;
    // currentValue有值，代表是输入
    if (currentValue && index < count - 1) {
      const nextInput = inputRefs.current[index + 1];
      nextInput?.focus();
    }
    if (!currentValue && index > 0) {
      const nextInput = inputRefs.current[index - 1];
      nextInput?.select();
    }
    onChange?.(code);
  };

  return (
    <div className="flex justify-between">
      {inputArr.map((_, index) => {
        return (
          <Input
            ref={getRef}
            key={index}
            className="text-center"
            style={{
              border: "none",
              borderRadius: "0px",
              width: "50px",
              height: "50px",
              borderBottom: "1px solid #F1F1F1",
            }}
            maxLength={1}
            onFocus={(e) => (e.target.style.borderBottomColor = "#FF7D37")}
            onBlur={(e) =>
              (e.target.style.borderBottomColor = inputRefs?.current[index]?.input?.value ? "#3D3D3D" : "#F1F1F1")
            }
            onChange={(e) => onValueChange(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};

export default CodeInput;
