"use client";
import React from "react";
import { createForm, onFormValuesChange } from "@formily/core";
import { FormProvider, createSchemaField, ISchema } from "@formily/react";
import { Form } from "antd";
import { CustomInput, CustomMutiSelect, CustomSelect, CustomTextarea } from "@/components/problem/formily-items"; // 导入自定义组件
import ObjectiveBottom from "@/components/problem/objective-bottom";
import { debounce } from "lodash";
import { objectToYaml } from "@/lib/objectToYaml";
import { request } from "@/lib/request";
import { useCodeLangContext } from "@/providers/code-lang-provider";

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
  const { lang } = useCodeLangContext();
  const handleSubmit = async () => {
    try {
      const values = await form.submit();
      const transformedCode = objectToYaml(values as { [key: string]: string | number });
      const result = await request.post(
        `/p/${pid}/submit` as "/p/{pid}/submit",
        {
          lang: lang,
          // pretest: false,
          code: transformedCode!,
        }
        // { ...forwardAuthClient() }
      );

      console.info(values, transformedCode, result);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <SchemaField schema={schema} />
        <ObjectiveBottom handleSubmit={handleSubmit} />
      </Form>
    </FormProvider>
  );
};
export default FormilyRenderer;
