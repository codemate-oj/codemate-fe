"use client";
import ThemedModal from "@/components/common/themed-modal";
import { Button } from "@/components/ui/button";
import { niceRadixModal } from "@/lib/utils";
import { CheckOutlined, WarningOutlined } from "@ant-design/icons";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  uname?: string;
  category: "success" | "error";
}

const TypeVars = {
  success: {
    title: "实名认证成功",
    icon: <CheckOutlined />,
    content: (
      <p>
        您已经开通修炼场智能刷题权限啦！ <br></br>快去体验吧！
      </p>
    ),
  },
  error: {
    title: "实名认证失败",
    icon: <WarningOutlined />,
    content: <p>请仔细核对证件信息，再次进行认证！ 注意身份证号码内如有字母请大写。</p>,
  },
};

const AuthorizeResultModal = NiceModal.create(({ category, uname }: IProps) => {
  const modal = useModal();
  const router = useRouter();
  const vars = TypeVars[category];
  return (
    <ThemedModal
      title={vars.title}
      titleIcon={vars.icon}
      footer={
        <div>
          {category === "success" ? (
            <Button
              onClick={() => {
                modal.remove();
                router.push("/");
              }}
            >
              去修炼场
            </Button>
          ) : (
            <Button onClick={modal.remove}>返回</Button>
          )}
        </div>
      }
      {...niceRadixModal(modal)}
    >
      <p className="space-y-4">
        <p>亲爱的【{uname ?? "用户"}】：</p>
        {vars.content}
      </p>
    </ThemedModal>
  );
});

export default AuthorizeResultModal;
