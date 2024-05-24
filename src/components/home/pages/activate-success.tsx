"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Icon } from "@iconify/react";
import store from "@/store/modal";
import { useLockFn } from "ahooks";
import useUrl from "@/hooks/useUrl";

const ActivateSuccess: React.FC = () => {
  const currentContext = store.currentContext.use();
  const { queryParams, updateQueryParams } = useUrl();

  const handleSubmit = useLockFn(async () => {
    if (currentContext.from === "activate") {
      updateQueryParams("tid", currentContext.tid);
    }
    store.isModalShow.set(false);
  });

  function transformContent(input: string) {
    return input
      .split(",")
      .map((item) => `【${item}】`)
      .join("--");
  }

  return (
    <div>
      <div className="w-full bg-[#FF7D37] h-12 rounded-t-lg flex text-2xl pt-3 pl-3 text-white">
        <Icon icon="ic:outline-check-circle" className="text-white text-3xl mr-3" />
        激活成功
      </div>
      <div className="px-8 pb-6">
        <div className="space-y-3 my-3">
          <p>亲爱的用户：</p>
          <article className="indent-7 space-y-3">
            <p>恭喜您已成功激活{transformContent(currentContext.content)}专属题库。</p>
            <p>快去体验吧！</p>
          </article>
        </div>
        <div className="w-full flex justify-around">
          <Button className="w-4/12" onClick={handleSubmit}>
            去体验
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivateSuccess;
