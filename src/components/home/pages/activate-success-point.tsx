"use client";

import React from "react";
import { Icon } from "@iconify/react";
import store from "@/store/modal";

const ActivateSuccessPoint: React.FC = () => {
  const currentContext = store.currentContext.use();

  return (
    <div>
      <div className="w-full bg-[#FF7D37] h-12 rounded-t-lg flex text-2xl pt-3 pl-3 text-white">
        <Icon icon="ic:outline-check-circle" className="text-white text-3xl mr-3" />
        魅值消耗成功
      </div>
      <div className="px-8 pb-6">
        <div className="space-y-3 my-3">
          <p>亲爱的用户：</p>
          <article className="indent-7 space-y-3">
            <p>恭喜本次成功消耗魅值【{currentContext.point}】点，快去享受你拥有的增值服务吧！</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ActivateSuccessPoint;
