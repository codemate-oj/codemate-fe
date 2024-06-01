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
      <div className="w-full bg-[#FF7D37] h-12 rounded-t-lg flex text-2xl pt-3 pl-3 text-white">
        <Icon icon="ic:outline-info" className="text-white text-3xl mr-3" />
        魅值消耗提示
      </div>
      <div className="px-8 pb-6">
        <div className="space-y-3 my-3">
          <p>亲爱的用户：</p>
          <article className="indent-3 space-y-3">
            <p>
              使用【{currentContext.title}】原创内容增值服务本次将消耗您【{"point"}】魅值。
            </p>
            <p>您是否同意？</p>
          </article>
        </div>
        <div className="w-full flex justify-around">
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
