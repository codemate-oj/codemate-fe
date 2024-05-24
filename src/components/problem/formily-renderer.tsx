"use client";
import React, { useMemo } from "react";
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField, ISchema, Schema } from "@formily/react";
import { Form } from "antd";
import { CustomInput, CustomMutiSelect, CustomSelect, CustomTextarea } from "@/components/problem/formily-items"; // 导入自定义组件
import * as unified from "unified";
import * as markdown from "remark-parse";
import ObjectiveBottom from "@/components/problem/objective-bottom";
import { extractQuestionsFromAst } from "@/lib/problem-parse";
import useClientOnly from "@/hooks/useClientOnly";

const AstProcessor = unified.unified().use(markdown.default);

const form = createForm();

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
}

const FormilyRenderer: React.FC<FormilySchemaProps> = ({ schema }) => {
  const loaded = useClientOnly();

  const handleSubmit = async () => {
    try {
      const values = await form.submit();
      console.log(values);
    } catch (err) {
      console.error(err);
    }
  };

  if (!loaded) return null;

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
