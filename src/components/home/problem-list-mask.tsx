import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "@/components/ui/button";
import store from "@/store/modal";

interface ProblemListMaskProps {
  tid: string;
  content: string;
  ishasPermission: boolean;
}

const ProblemListMask: React.FC<React.PropsWithChildren<ProblemListMaskProps>> = ({
  children,
  tid,
  content,
  ishasPermission = true,
}) => {
  return (
    <div className={"relative"}>
      {!ishasPermission && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-200 bg-opacity-80">
          <Icon icon="ic:outline-lock" width={40} height={40} className="mb-4" />
          当前题单未解锁
          <Button
            className="mt-4 cursor-pointer"
            onClick={() => {
              store.modalJumpTo("activate", {
                tid,
                content,
              });
              store.isModalShow.set(true);
            }}
          >
            <Icon icon="ic:outline-lock-open" className="mr-2" />
            激活
          </Button>
        </div>
      )}
      <div className={!ishasPermission ? "pointer-events-none" : ""}>{children}</div>
    </div>
  );
};
export default ProblemListMask;
