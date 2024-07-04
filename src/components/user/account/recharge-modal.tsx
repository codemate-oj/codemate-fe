import React, { useState } from "react";
import { Button, Input } from "antd";
import style from "./recharge-modal.module.css";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../../ui/dialog";

const SupportedAmounts = [100, 500, 1000, 3000, 10000, 50000];

export const showRechargeModal = NiceModal.create(() => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  const handleInputChange = (val: string) => {
    try {
      const amount = parseInt(val, 10);
      setSelectedIndex(null);
      setAmount(amount);
    } catch {}
  };

  const modal = useModal();

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          modal.remove();
        } else {
          modal.show();
        }
      }}
    >
      <DialogContent className={`${style.modalMain} max-w-[500px] border-0 p-0`}>
        <DialogTitle className={style.modalTitleContainer}>
          <div className={style.modalTitle}>在线充值</div>
        </DialogTitle>

        <div className={`${style.onlineRechargeModal} p-6`}>
          <p className={style.tips}>
            {/* <TipIcon /> */}
            1元=10魅值
          </p>
          <div className={style.amountCardContainer}>
            {SupportedAmounts.map((amount, index) => (
              <div
                key={index}
                className={`${style.amountCardItem} ${index === selectedIndex && style.selected}`}
                onClick={() => {
                  setSelectedIndex(index);
                  setAmount(amount);
                }}
              >
                <span>{amount}魅值</span>
              </div>
            ))}
          </div>
          <div className={style.amountInput}>
            <p className={style.descText}>其他金额</p>
            <Input
              type="number"
              onChange={(e) => {
                handleInputChange(e.target.value);
              }}
            />
          </div>
          {amount && (
            <div className={style.alarmText}>
              订单确认：充值{amount}魅值 金额{amount / 10}元
            </div>
          )}
        </div>

        <DialogFooter className={style.modalFooter}>
          <Button
            disabled={!amount}
            onClick={() => {
              /* 点击确认按钮的操作 */
            }}
          >
            确认支付
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
