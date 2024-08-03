"use client";
import GradeSelect from "@/components/form/grade-select";
import Loading from "@/components/ui/loading";
import { HydroError } from "@/lib/error";
import { request } from "@/lib/request";
import loginStore from "@/store/login";
import { useRequest } from "ahooks";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { merge } from "lodash";
import React from "react";
import { toast } from "sonner";

const SEX_OPTIONS = [
  { label: "男", value: 0 },
  { label: "女", value: 1 },
];

const App = () => {
  const [form] = Form.useForm();
  const globalUser = loginStore.user.use();

  const isAuthorized = globalUser?.verifyPassed ?? globalUser?.verifyInfo?.verifyPassed;

  const { loading, run: refresh } = useRequest(async () => {
    const udoc = await request.get("/user/center", {
      transformData(data) {
        return merge(data.data.udoc, data.data.UserContext);
      },
    });
    form.setFieldsValue(udoc);
    return udoc;
  });

  const { run: handleSubmit, loading: submitting } = useRequest(
    async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      if (isAuthorized && "sex" in values) {
        delete values.sex;
      }
      try {
        await request.post("/user/center", values, {
          transformData: (data) => data.data,
        });
        toast.success("更新成功");
        refresh();
      } catch (e) {
        if (e instanceof HydroError) {
          toast.error(e.message);
        }
      }
    },
    { manual: true }
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Form form={form} layout="horizontal" labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Tooltip title={isAuthorized ? "已实名用户不可修改" : ""}>
          <Form.Item name="sex" label="性别">
            <Select options={SEX_OPTIONS} disabled={isAuthorized} />
          </Form.Item>
        </Tooltip>
        <Form.Item name="school" label="所在学校">
          <Input />
        </Form.Item>
        <Form.Item name="schoolGrade" label="所在年级">
          <GradeSelect />
        </Form.Item>
        <Form.Item
          name="parentPhone"
          label="家长电话"
          rules={[
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                }
                if (!/^1[3456789]\d{9}$/.test(value)) {
                  callback("请输入正确的家长电话");
                }
                callback();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="commentFocus" label="重点关注">
          <Input />
        </Form.Item>
        <Form.Item name="commentPursue" label="核心诉求">
          <Input />
        </Form.Item>
        <Form.Item name="learnLevel" label="当前学习阶段">
          <Input />
        </Form.Item>
        <Form.Item name="academicLevel" label="圈层">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" size="large" onClick={handleSubmit} loading={submitting}>
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
