import React from "react";
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/react";
import { Form } from "antd";
import { CustomInput, CustomTextarea } from "@/components/p/formilyItem"; // 导入自定义组件

const form = createForm();

const SchemaField = createSchemaField({
  components: {
    CustomInput,
    CustomTextarea,
  },
});

// const formilySchema = {
//   type: "object",
//   properties: {
//     question1: {
//       type: "string",
//       title: "在计算机术语中，CPU代表什么？",
//       enum: ["Central Process Unit", "Central Processing Unit", "Computer Processing Unit", "Central Processor Unit"],
//       "x-component": "CustomSelect",
//     },
//   },
// };

interface FormilySchemaProps {
  schema: object;
}
const FormilySchema: React.FC<FormilySchemaProps> = (props) => {
  const { schema } = props;

  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <SchemaField schema={schema} />
      </Form>
    </FormProvider>
  );
};
export default FormilySchema;
