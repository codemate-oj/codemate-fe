"use client";
import { STATUS_TEXTS } from "@/constants/judge-status";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import { Button, Form, FormItemProps, Input, Select } from "antd";
import React from "react";

export interface RecordFilterFormType {
  uidOrName?: string;
  pid?: string;
  tid?: string;
  lang?: string;
  status?: number; // STATUS枚举值
}

const FormItem = Form.Item as React.FC<
  Omit<FormItemProps, "name"> & {
    name: keyof RecordFilterFormType;
  }
>;

const langOptions = Object.keys(PROGRAMMING_LANGS)
  .filter((_, i) => i < 3)
  .map((key) => {
    return {
      value: key,
      label: PROGRAMMING_LANGS[key as keyof typeof PROGRAMMING_LANGS],
    };
  });

const statusOptions = Object.keys(STATUS_TEXTS).map((key) => {
  return {
    value: Number(key),
    label: STATUS_TEXTS[Number(key) as keyof typeof STATUS_TEXTS],
  };
});

interface IProps {
  onSubmit?: (value: RecordFilterFormType) => void;
  loading?: boolean;
}

const RecordFilterForm: React.FC<IProps> = ({ onSubmit, loading }) => {
  const [form] = Form.useForm<RecordFilterFormType>();

  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue() as RecordFilterFormType;
    onSubmit?.(values);
  };

  return (
    <div>
      <Form form={form} layout="inline" className="gap-y-5" onKeyDown={(e) => e.key === "Enter" && handleSubmit()}>
        <FormItem label="由用户名或UID筛选" name="uidOrName">
          <Input />
        </FormItem>
        <FormItem label="由题目ID筛选" name="pid">
          <Input />
        </FormItem>
        <FormItem label="由比赛ID筛选" name="tid">
          <Input />
        </FormItem>
        <FormItem label="由题目语言筛选" name="lang" layout="horizontal">
          <Select className="min-w-[150px]" options={langOptions} />
        </FormItem>
        <FormItem label="由评测状态筛选" name="status">
          <Select className="min-w-[200px]" options={statusOptions} />
        </FormItem>
      </Form>
      <div className="mt-5 flex w-full justify-end gap-x-2">
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          筛选
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </div>
    </div>
  );
};

export default RecordFilterForm;
