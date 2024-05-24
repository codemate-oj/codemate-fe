"use client";
import { connect, mapProps } from "@formily/react";
import { Input } from "antd";

import { ObjectiveSelect } from "@/components/problem/objective-select";
import ObjectiveInput from "@/components/problem/objective-input";
import { ObjectiveMutiSelect } from "@/components/problem/objective-mutiselect";

// 自定义选择题组件

const CustomSelect = connect(
  ObjectiveSelect,
  mapProps((props: any, field: any) => {
    return {
      ...props,
      options: field.dataSource, // 映射 dataSource 作为 options
      title: field.title,
    };
  })
);

const CustomMutiSelect = connect(
  ObjectiveMutiSelect,
  mapProps((props: any, field: any) => {
    return {
      ...props,
      options: field.dataSource, // 映射 dataSource 作为 options
      title: field.title,
    };
  })
);

const CustomInput = connect(
  ObjectiveInput,
  mapProps((props: any, field: any) => {
    console.log(field.title, field.dataSource, 1212); // 日志输出数据源以便调试
    return {
      ...props,
      title: field.title,
    };
  })
);

// 自定义多行简答题组件
const CustomTextarea = connect(Input.TextArea);

export { CustomSelect, CustomTextarea, CustomInput, CustomMutiSelect };
