import ThemedModal from "@/components/common/themed-modal";
import { Button } from "@/components/ui/button";
import { niceRadixModal } from "@/lib/utils";
import { CheckOutlined } from "@ant-design/icons";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";

const ApplySuccessModal = NiceModal.create(
  ({ username = "用户", contestTitle }: { username?: string; contestTitle: string }) => {
    const modal = useModal();
    return (
      <ThemedModal
        titleIcon={<CheckOutlined />}
        title="比赛报名成功"
        footer={
          <Button
            onClick={() => {
              modal.resolve();
              modal.remove();
            }}
          >
            我知道了
          </Button>
        }
        {...niceRadixModal(modal)}
      >
        <div className="space-y-5">
          <p>
            亲爱的<span className="font-bold">【{username}】</span>
          </p>
          <p>您已成功报名【{contestTitle}】，请在后台“我的比赛”中查看。</p>
          <p>请务必记住比赛时间，及时参赛哦</p>
        </div>
      </ThemedModal>
    );
  }
);

export default ApplySuccessModal;
