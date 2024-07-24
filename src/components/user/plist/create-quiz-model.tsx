// import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { FC } from "react";

interface CreateQuizModelProps {
  ModalOpen: boolean;
  onCancel: () => void;
  onCreate: (values: unknown) => void;
}

/** @desc 创建题单modal */
const CreateQuizModel: FC<CreateQuizModelProps> = ({ ModalOpen, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {};

  const handleCancel = () => {
    onCancel();
  };

  const handleCreate = () => {
    form.validateFields().then((values) => {
      onCreate(values);
      form.resetFields();
    });
  };

  return (
    <Modal title="创建题单" open={ModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} centered>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="题单名称" rules={[{ required: true, message: "请输入题单名称" }]}>
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
