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
      <div className="flex h-12 w-full rounded-t-lg bg-[#FF7D37] pl-3 pt-3 text-2xl text-white">
        <Icon icon="ic:outline-warning-amber" className="mr-3 text-3xl text-white" />
        输入错误
      </div>
      <div className="px-8 pb-6">
        <div className="my-3 space-y-3">
          <p>亲爱的用户：</p>
          <article className="space-y-3 indent-7">
            <p>请仔细核对无误后再次输入！</p>
          </article>
        </div>
        <div className="flex w-full justify-around">
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
