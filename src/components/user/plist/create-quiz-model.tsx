// import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { request } from "@/lib/request";

interface CreateQuizModelProps {
  ModalOpen: boolean;
  onCancel: () => void;
  onCreate: (values: unknown) => void;
}

/** @desc 创建题单modal */
const CreateQuizModel: FC<CreateQuizModelProps> = ({ ModalOpen, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const handleOk = () => {};

  const handleCancel = () => {
    onCancel();
  };

  const handleCreate = () => {
    form.validateFields().then(async (values) => {
      onCreate(values);
      form.resetFields();
      try {
        const res = await request.post(`/user-plist/create`, {
          title: values.title,
          content: values.description,
        });
        router.push(`/user/plist/${res.data.tid}/detail`);
      } catch (e) {
        // 错误处理，例如显示错误信息
        console.error(e);
      }
    });
  };

  return (
    <Modal title="创建题单" open={ModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} centered>
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="题单名称" rules={[{ required: true, message: "请输入题单名称" }]}>
          <Input placeholder="A题单" />
        </Form.Item>
        <Form.Item name="description" label="题单描述" rules={[{ required: true, message: "请输入题单描述" }]}>
          <Input.TextArea placeholder="C++暑假训练精选题目" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCreate}>
            确认创建
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateQuizModel;
