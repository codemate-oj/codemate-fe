"use client";

import React from "react";
import { Icon } from "@iconify/react";
import store from "@/store/modal";

const ActivateSuccessPoint: React.FC = () => {
  const currentContext = store.currentContext.use();

  return (
    <div>
      <div className="flex h-12 w-full rounded-t-lg bg-[#FF7D37] pl-3 pt-3 text-2xl text-white">
        <Icon icon="ic:outline-check-circle" className="mr-3 text-3xl text-white" />
        魅值消耗成功
      </div>
      <div className="px-8 pb-6">
        <div className="my-3 space-y-3">
          <p>亲爱的用户：</p>
          <article className="space-y-3 indent-7">
            <p>恭喜本次成功消耗魅值【{currentContext.point}】点，快去享受你拥有的增值服务吧！</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ActivateSuccessPoint;
