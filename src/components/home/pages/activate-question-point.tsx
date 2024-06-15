import React from "react";
import { Button } from "../../ui/button";
import { Icon } from "@iconify/react";
import store from "@/store/modal";
import { useLockFn } from "ahooks";

const ActivateQuestionPoint: React.FC = () => {
  const currentContext = store.currentContext.use();

  const handleSubmit = useLockFn(async () => {
    // const { data } = await request.post(
    //   `/priv`,
    //   { operation: "activate" },
    //   {
    //     transformData: (data) => {
    //       return data;
    //     },
    //   }
    // );
    // if (data.success) {
    store.modalJumpTo("activate-success-point", {
      point: "point",
    });
    // } else {
    // store.modalJumpTo("activate-error-point", {
    //   point: "point",
    // });
    // }
  });

  const handleClose = () => {
    store.isModalShow.set(false);
  };

  return (
    <div>
      <div className="flex h-12 w-full rounded-t-lg bg-[#FF7D37] pl-3 pt-3 text-2xl text-white">
        <Icon icon="ic:outline-info" className="mr-3 text-3xl text-white" />
        魅值消耗提示
      </div>
      <div className="px-8 pb-6">
        <div className="my-3 space-y-3">
          <p>亲爱的用户：</p>
          <article className="space-y-3 indent-3">
            <p>
              使用【{currentContext.title}】原创内容增值服务本次将消耗您【{"point"}】魅值。
            </p>
            <p>您是否同意？</p>
          </article>
        </div>
        <div className="flex w-full justify-around">
          <Button className="w-4/12" onClick={handleSubmit}>
            我同意
          </Button>
          <Button variant="secondary" className="w-4/12" onClick={handleClose}>
            再想想
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivateQuestionPoint;
