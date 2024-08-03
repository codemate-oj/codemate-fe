"use client";
import ImageUploader from "@/components/form/image-uploader";
import Loading from "@/components/ui/loading";
import { getAvatarUrl, getAvatarUrlFromUserContext } from "@/lib/avatar";
import { HydroError } from "@/lib/error";
import { request } from "@/lib/request";
import { remoteUrl } from "@/lib/utils";
import loginStore from "@/store/login";
import { useRequest } from "ahooks";
import { Button, Form, Input, Select, Tooltip } from "antd";
import React from "react";
import { toast } from "sonner";

const App = () => {
  const [form] = Form.useForm();
  const globalUser = loginStore.user.use();

  const isAuthorized = globalUser?.verifyPassed ?? globalUser?.verifyInfo?.verifyPassed;

  const { loading, run: refresh } = useRequest(async () => {
    const udoc = await request.get("/user/center", {
      transformData(data) {
        return data.data.udoc;
      },
    });
    form.setFieldsValue(udoc);
    // @ts-expect-error next-line
    setAvatarUrl(getAvatarUrlFromUserContext(udoc));
    if (udoc.nationality === "中国") {
      udoc.nationality = "CN";
    }
    return udoc;
  });

  const { run: handleSubmit, loading: submitting } = useRequest(
    async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      if (isAuthorized && "age" in values) {
        delete values.age;
      }
      try {
        await request.post("/user/center", values, {
          transformData: (data) => data.data.UserContext,
        });
        refresh();
        toast.success("保存成功");
      } catch (e) {
        if (e instanceof HydroError) {
          toast.error(e.message);
        } else {
          throw e;
        }
      }
    },
    { manual: true }
  );

  const handleUploadAvatar = async (file?: File) => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append("file", file);
      // @ts-expect-error next-line
      const data = await request.post("/home/avatar", formData);
      const url = data.data.UserContext.avatarUrl ?? getAvatarUrl(data.data.UserContext.avatar) ?? null;
      const avatarUrl = remoteUrl(url);
      loginStore.user.set((u) => {
        if (u) {
          u.avatarUrl = avatarUrl;
          u.avatar = data.data.UserContext.avatar;
        }
      });
      return avatarUrl;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Form form={form} layout="horizontal" labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="头像">
          <ImageUploader onUpload={handleUploadAvatar} value={globalUser?.avatarUrl} />
        </Form.Item>
        <Form.Item name="nickname" label="昵称">
          <Input />
        </Form.Item>
        {/* <Form.Item label="国籍与地区">
          <LocationSelect
            value={[nation, region]}
            onChange={([nation, region]) => {
              console.log(nation, region);
              setNation(nation);
              setRegion(region);
            }}
          />
        </Form.Item> */}
        <Tooltip title={isAuthorized ? "实名用户不可修改年龄" : ""}>
          <Form.Item name="age" label="年龄">
            <Input type="number" disabled={isAuthorized} />
          </Form.Item>
        </Tooltip>
        <Form.Item name="oier" label="是否为现役oier">
          <Select
            options={[
              { label: "是", value: true },
              { label: "否", value: false },
            ]}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" size="large" loading={loading || submitting} onClick={handleSubmit}>
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
