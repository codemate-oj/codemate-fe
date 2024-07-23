// import { useState } from "react";
import { Input, Modal } from "antd";

/** @desc 创建题单modal */
const CreateQuizModel = ({ ModalOpen }: { ModalOpen: boolean }) => {
  // const [isModalOpen, setIsModalOpen] = useState(ModalOpen);

  const handleOk = () => {
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    // setIsModalOpen(false);
  };

  return (
    <Modal title="Basic Modal" open={ModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>题单名称</p>
      <Input />
      <p>题单描述</p>
      <Input />
    </Modal>
  );
};

export default CreateQuizModel;
