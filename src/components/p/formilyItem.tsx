import { connect, mapProps } from "@formily/react";
import { Select, Input, Checkbox, InputProps, Radio } from "antd";

import { SelectProps } from "antd/lib/select";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ObjectiveInput } from "@/components/p/objectiveInput";

// 自定义选择题组件

const CustomInput = connect(
  ObjectiveInput,
  mapProps((props: any, field: any) => {
    console.log(field.dataSource); // 日志输出数据源以便调试
    return {
      ...props,
      options: field.dataSource, // 映射 dataSource 作为 options
    };
  })
);

// 自定义多行简答题组件
const CustomTextarea = connect(Input.TextArea);

export { CustomInput, CustomTextarea };
