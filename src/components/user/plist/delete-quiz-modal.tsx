// import { useState } from "react";
import { Modal, Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface CreateQuizModelProps {
  ModalOpen: boolean;
  onCancel: () => void;
  onCreate: () => void;
}

/** @desc 创建题单modal */
const DeleteQuizModel: FC<CreateQuizModelProps> = ({ ModalOpen, onCancel, onCreate }) => {
  const router = useRouter();

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onCreate();
    router.push("/user/plist");
  };

  return (
    <Modal title="特别提醒" open={ModalOpen} onCancel={handleCancel} footer={null} centered>
      <h2>亲爱的xxx</h2>
      <div>确认要删除此内容吗？</div>
      <Space>
        <Button type="primary" onClick={handleOk}>
          确认
        </Button>
        <Button type="primary" onClick={handleCancel}>
          放弃
        </Button>
      </Space>
    </Modal>
  );
};

export default DeleteQuizModel;
