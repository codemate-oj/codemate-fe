"use client";
import React from "react";
import { createForm, onFormValuesChange } from "@formily/core";
import { FormProvider, createSchemaField, ISchema } from "@formily/react";
import { Form } from "antd";
import { CustomInput, CustomMutiSelect, CustomSelect, CustomTextarea } from "@/components/problem/formily-items"; // 导入自定义组件
import { debounce } from "lodash";
import { Button } from "../ui/button";
import ActionBar from "./action-bar";

const PID = window.location.pathname.split("/")[2];
const CACHE_KEY = `answers-${PID}`;

const form = createForm({
  effects() {
    onFormValuesChange(
      debounce((form) => {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(form.values));
      }, 100)
    );
  },
  initialValues: JSON.parse(window.localStorage.getItem(CACHE_KEY) || "{}"),
});

const SchemaField = createSchemaField({
  components: {
    FormItem: Form.Item,
    CustomSelect,
    CustomTextarea,
    CustomInput,
    CustomMutiSelect,
  },
});

export interface OptionType {
  label: string;
  value: string;
}

export type Property = {
  type: string;
  title: string;
  enum?: OptionType[];
  strong?: string;
  "x-decorator": string;
  "x-component": string;
};

export interface FormilySchema extends ISchema {
  type: "object";
  properties: {
    [key: string]: Property;
  };
}

interface FormilySchemaProps {
  schema: FormilySchema;
  pid: string;
}

const FormilyRenderer: React.FC<FormilySchemaProps> = ({ schema, pid }) => {
  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <SchemaField schema={schema} />
        <div className="flex flex-wrap gap-2">
          <div>
            <Button>确认提交</Button>
          </div>
          <ActionBar pid={pid} />
        </div>
      </Form>
    </FormProvider>
  );
};
export default FormilyRenderer;
