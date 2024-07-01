import ThemedModal from "@/components/common/themed-modal";
import { Button } from "@/components/ui/button";
import { niceRadixModal } from "@/lib/utils";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Input } from "antd";
import React from "react";

const ShowRecahrgeCardModal = NiceModal.create(() => {
  const modal = useModal();
  return (
    <ThemedModal
      title="充值卡充值"
      footer={
        <div className="space-x-4">
          <Button
            onClick={() => {
              /* 点击确认按钮的操作 */
            }}
          >
            确定充值
          </Button>
        </div>
      }
      {...niceRadixModal(modal)}
    >
      <div className="card-recharge-modal">
        <div className="custom-antd-form-item">
          <p className="custom-label">请输入充值卡号</p>
          <Input title="请输入充值卡号" />
        </div>
        <div className="custom-antd-form-item">
          <p className="custom-label">请输入充值卡密码</p>
          <Input title="请输入充值卡密码" />
        </div>
      </div>
    </ThemedModal>
  );
});

export default ShowRecahrgeCardModal;
