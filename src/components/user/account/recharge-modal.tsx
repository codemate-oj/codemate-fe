import React, { useState } from "react";
import { Button, Input } from "antd";
import "./recharge-modal.style.css";
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
      <DialogContent className="modal-main max-w-[500px] border-0 p-0">
        <DialogTitle className="modal-title-container">
          <div className="modal-title">在线充值</div>
        </DialogTitle>

        <div className="online-recharge-modal p-6">
          <p className="tips">
            {/* <TipIcon /> */}
            1元=10魅值
          </p>
          <div className="amount-card-container">
            {SupportedAmounts.map((amount, index) => (
              <div
                key={index}
                className={`amount-card-item ${index === selectedIndex && "selected"}`}
                onClick={() => {
                  setSelectedIndex(index);
                  setAmount(amount);
                }}
              >
                <span>{amount}魅值</span>
              </div>
            ))}
          </div>
          <div className="amount-input">
            <p className="desc-text">其他金额</p>
            <Input
              type="number"
              onChange={(e) => {
                handleInputChange(e.target.value);
              }}
            />
          </div>
          {amount && (
            <div className="alarm-text">
              订单确认：充值{amount}魅值 金额{amount / 10}元
            </div>
          )}
        </div>

        <DialogFooter className="modal-footer">
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
