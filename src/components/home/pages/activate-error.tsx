"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Icon } from "@iconify/react";
import store from "@/store/modal";
import { useLockFn } from "ahooks";

const ActivateError: React.FC = () => {
  const currentContext = store.currentContext.use();

  const reInput = useLockFn(async () => {
    if (currentContext.from === "activate") {
      store.modalJumpTo("activate", {
        tid: currentContext?.tid,
        content: currentContext?.content,
      });
    } else if (currentContext.from === "activate-question-group") {
      store.modalJumpTo("activate-question-group", {
        tid: currentContext?.tid,
        group: currentContext?.group,
      });
    }
  });
  const knowCompetition = useLockFn(async () => {});

  return (
    <div>
      <div className="w-full bg-[#FF7D37] h-12 rounded-t-lg flex text-2xl pt-3 pl-3 text-white">
        <Icon icon="ic:outline-warning-amber" className="text-white text-3xl mr-3" />
        输入错误
      </div>
      <div className="px-8 pb-6">
        <div className="space-y-3 my-3">
          <p>亲爱的用户：</p>
          <article className="indent-7 space-y-3">
            <p>请仔细核对无误后再次输入！</p>
          </article>
        </div>
        <div className="w-full flex justify-around">
          <Button className="w-4/12" onClick={reInput}>
            再次输入
          </Button>
          <Button className="w-4/12" variant="secondary" onClick={knowCompetition}>
            了解比赛
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivateError;
