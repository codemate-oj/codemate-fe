import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useTencentCaptcha from "@/hooks/useTencentCaptcha";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "../ui/dialog";

interface IProps {
  className?: string;
  onVerifySuccess?: (result: ICaptchaResult) => void;
  onVerifyFail?: (error: ICaptchaResult) => void;
}

const VerifyButton: React.FC<IProps> = ({ className, onVerifyFail, onVerifySuccess }) => {
  const [verifyPassed, setVerifyPassed] = useState(false);
  const handleClick = async () => {
    if (verifyPassed) return;
    try {
      const result = (await NiceModal.show(VerifyModal)) as ICaptchaResult;
      setVerifyPassed(true);
      onVerifySuccess?.(result);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        onVerifyFail?.(error as ICaptchaResult);
      }
    }
  };

  return (
    <button
      type="button"
      className={cn(
        className,
        "flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFF4EE] py-3 text-center",
        {
          "cursor-default": verifyPassed,
        }
      )}
      onClick={handleClick}
    >
      <Image
        src={verifyPassed ? "/svg/orange-check.svg" : "/svg/orange-circles.svg"}
        alt="verify"
        width={16}
        height={16}
      />
      <span className="text-sm text-[#FFAD80]">{verifyPassed ? "验证已通过" : "点击完成验证"}</span>
    </button>
  );
};

export const VerifyModal = NiceModal.create(({ idSuffix = "" }: { idSuffix: string }) => {
  const modal = useModal();
  const containerId = useRef(`captcha-container${idSuffix}`);
  const { doVerify } = useTencentCaptcha(containerId.current);

  useLayoutEffect(() => {
    setTimeout(() => {
      doVerify()
        .then((res) => {
          modal.resolve(res);
          modal.hide();
        })
        .catch((err) => {
          modal.reject(err);
          modal.hide();
        });
    });
  }, [doVerify, modal]);

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
      <DialogContent className="w-fit">
        <div id={containerId.current} className="m-5 w-fit"></div>
      </DialogContent>
    </Dialog>
  );
});

export default VerifyButton;
