import ThemedModal from "@/components/common/themed-modal";
import { Button } from "@/components/ui/button";
import { HydroError } from "@/lib/error";
import { niceRadixModal } from "@/lib/utils";
import { CloseOutlined } from "@ant-design/icons";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";

const ApplyFailModal = NiceModal.create(
  ({
    error,
    actions,
    customMessage,
  }: {
    error: HydroError;
    actions?: { text: string; action: (close: () => void) => void }[];
    customMessage?: string;
  }) => {
    const modal = useModal();
    return (
      <ThemedModal
        titleIcon={<CloseOutlined />}
        title="比赛报名失败"
        footer={
          actions?.length && (
            <div className="space-x-4">
              {actions?.map(({ text, action }) => (
                <Button key={text} onClick={() => action(modal.remove)}>
                  {text}
                </Button>
              ))}
            </div>
          )
        }
        {...niceRadixModal(modal)}
      >
        <p>{customMessage ?? error.message}</p>
      </ThemedModal>
    );
  }
);

export default ApplyFailModal;
