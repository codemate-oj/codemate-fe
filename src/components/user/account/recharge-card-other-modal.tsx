import ThemedModal from "@/components/common/themed-modal";
import { Button } from "@/components/ui/button";
import { niceRadixModal } from "@/lib/utils";
import style from "./recharge-modal.module.css";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Input } from "antd";
import React from "react";

const ShowRecahrgeCardOtherModal = NiceModal.create(() => {
  const modal = useModal();
  return (
    <ThemedModal
      title="给别人充值"
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
      <div className={style.cardRechargeModal}>
        <div className={style.customAntdFormItem}>
          <p className={style.customLabel}>请输入充值的UID</p>
          <Input title="请输入充值卡号" />
        </div>
      </div>
    </ThemedModal>
  );
});

export default ShowRecahrgeCardOtherModal;
