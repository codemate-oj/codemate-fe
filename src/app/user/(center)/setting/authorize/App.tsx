"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import IdCard from "idcard";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import Loading from "@/components/ui/loading";
import SnackBar from "@/components/user/setting/snack-bar";
import NiceModal from "@ebay/nice-modal-react";
import AuthorizeResultModal from "@/components/user/setting/authorize-result-modal";
import loginStore from "@/store/login";
import { pick } from "lodash";
import { toast } from "sonner";
import { HydroError } from "@/lib/error";

const App = () => {
  const [form] = Form.useForm();
  const user = loginStore.user.use();

  const {
    loading,
    data: fetchResult,
    run: refresh,
  } = useRequest(async () => {
    const data = await request.get("/user/verify", {
      transformData: (data) => {
        return data.data;
      },
    });
    form.setFieldsValue(data);
    return data;
  });

  const { run: handleSubmit, loading: submitting } = useRequest(
    async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      let reqSuccess = true;
      try {
        reqSuccess = await request.post("/user/verify", pick(values, ["realName", "idNumber"]), {
          transformData: (data) => data.data.success,
        });
      } catch (e) {
        reqSuccess = false;
        if (e instanceof HydroError) {
          toast.error(e.message);
        }
      }
      refresh();

      NiceModal.show(AuthorizeResultModal, {
        uname: user?.nickname ?? user?.uname,
        category: reqSuccess ? "success" : "error",
      });
    },
    {
      manual: true,
      ready: fetchResult?.verified === false,
    }
  );

  if (loading) return <Loading />;

  return (
    <div>
      <SnackBar theme={fetchResult?.verified ? "success" : "error"} className="mb-10">
        {fetchResult?.verified ? "已完成实名认证" : "请进行实名认证解锁CODEMATE的基本功能 ！"}
      </SnackBar>
      <Form
        disabled={fetchResult?.verified}
        form={form}
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item name="realName" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="idNumber"
          label="身份证号码"
          rules={[
            {
              required: true,
              validator(_, value, callback) {
                if (!value) callback("请输入身份证号码");
                else if (!IdCard.verify(value)) callback("请输入正确的身份证号码");
                else callback();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" size="large" onClick={handleSubmit} loading={loading || submitting}>
            提交认证
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
