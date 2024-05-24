"use client";
import React from "react";
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField, ISchema } from "@formily/react";
import { Form } from "antd";
import { CustomInput, CustomMutiSelect, CustomSelect, CustomTextarea } from "@/components/problem/formilyItem"; // 导入自定义组件
import * as unified from "unified";
import * as markdown from "remark-parse";
import { Submit } from "@formily/antd";
import { Button } from "@/components/ui/button";
import ObjectiveBottom from "@/components/problem/objective-bottom";

const form = createForm();

const SchemaField = createSchemaField({
  components: {
    CustomSelect,
    CustomTextarea,
    CustomInput,
    CustomMutiSelect,
  },
});

type Property = {
  type: string;
  title: string;
  enum?: string[];
  strong?: string;
  "x-decorator": string;
  "x-component": string;
};

interface FormilySchema extends ISchema {
  type: "object";
  properties: {
    [key: string]: Property;
  };
}

const extractOptions = (listData: any) => {
  return listData.children
    .map((item: any) => {
      if (item.children && item.children.length > 0) {
        const textNode = item.children[0].children.find((child: any) => child.type === "text") as any;
        if (textNode && "value" in textNode) {
          const label = textNode.value.trim();
          const value = label; // or any other unique identifier
          return { label, value };
        }
      }
      return null;
    })
    .filter((option: any) => option !== null); // 过滤掉 null 值
};

const formilySchema = {
  type: "object",
  properties: {
    question1: {
      type: "string",
      title: "在计算机术语中，CPU代表什么？",
      enum: ["Central Process Unit", "Central Processing Unit", "Computer Processing Unit", "Central Processor Unit"],
      "x-component": "CustomInput",
    },
  },
};
const targetFormily: FormilySchema = {
  type: "object",
  properties: {
    question1: {
      type: "string",
      "x-decorator": "FormItem",
      title: "在计算机术语中，CPU代表什么？",
      enum: ["Central Process Unit", "Central Processing Unit", "Computer Processing Unit", "Central Processor Unit"],
      "x-component": "CustomSelect",
    },
  },
};

const transformAst = (ast: any) => {
  const arr = ast.children;

  const objectArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type == "paragraph") {
      const str = arr[i].children[0]?.value;
      if (typeof str != "string") continue;

      if (str.includes("{{ input")) {
        //提取题目
        const extractedStr = str.substring(0, str.indexOf("{{")).trim();
        console.log(extractedStr, "22");

        //提取序号
        const regex = /\{\{\s*input\((\d+)\)\s*\}\}/;
        const match = str.match(regex);
        const number = match![1];
        console.log(number, "33");

        const newQuestion: Property = {
          type: "string",
          title: extractedStr,

          "x-decorator": "FormItem",
          "x-component": "CustomInput",
        };
        targetFormily.properties[`question${number}`] = newQuestion;
      } else if (str.includes("{{ select")) {
        //提取序号
        const regex = /\{\{\s*select\((\d+)\)\s*\}\}/;
        const match = str.match(regex);
        const number = match![1];
        console.log(number, "44");

        let title =
          arr[i - 2]?.children[0]?.value !== undefined
            ? arr[i - 2].children[0].value
            : arr[i - 2]?.children[0].children[0]?.children[0]?.value;

        // if(title)
        const strong =
          arr[i - 1].children[0].url !== unified
            ? arr[i - 1].children[0].url
            : arr[i - 1].children[0].children[0].value;

        if (title == undefined) {
          title = arr[i - 1]?.children[0]?.value;
        }
        const title1 = arr[i - 2]?.children[0].value;
        const strong1 = arr[i - 1].children[0].url;
        console.log(title1, strong1, "title1");

        const enum1 = extractOptions(arr[i + 1]);
        console.log(enum1, "选项");
        const newQuestion: Property = {
          type: "string",
          title: title,
          strong: strong,
          enum: enum1,
          "x-decorator": "FormItem",
          "x-component": "CustomSelect",
        };
        targetFormily.properties[`question${number}`] = newQuestion;
      } else if (str.includes("{{ multiselect")) {
        //提取序号
        const regex = /\{\{\s*multiselect\((\d+)\)\s*\}\}/;
        const match = str.match(regex);
        const number = match![1];
        console.log(number, "55");

        const title =
          arr[i - 2].children[0]?.value !== undefined
            ? arr[i - 2].children[0].value
            : arr[i - 2].children[0].children[0]?.children[0]?.value;
        const strong =
          arr[i - 1].children[0].url !== unified
            ? arr[i - 1].children[0].url
            : arr[i - 1].children[0].children[0].value;

        const enum1 = extractOptions(arr[i + 1]);
        console.log(enum1, "选项");

        const newQuestion: Property = {
          type: "string",
          title: title,
          strong: strong,
          enum: enum1,
          "x-decorator": "FormItem",
          "x-component": "CustomMutiSelect",
        };
        targetFormily.properties[`question${number}`] = newQuestion;
      }
    }
  }

  console.log(targetFormily, "目标");
};

interface FormilySchemaProps {
  schema: string;
}
const FormilySchema: React.FC<FormilySchemaProps> = (props) => {
  const { schema } = props;

  const processor = unified.unified().use(markdown.default);

  const content = schema;
  const ast = processor.parse(content);
  console.log(ast, "123");
  transformAst(ast);
  console.log(JSON.stringify(formilySchema, null, 2));

  const handleSubmit = async () => {
    try {
      const values = await form.submit();
      console.log(values);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <SchemaField schema={targetFormily} />
        <ObjectiveBottom handleSubmit={handleSubmit} />
      </Form>
    </FormProvider>
  );
};
export default FormilySchema;
