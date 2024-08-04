"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Icon } from "@iconify/react";
import store from "@/store/modal";
import { useLockFn } from "ahooks";
import emitter from "@/lib/event-emitter";

const ActivateSuccess: React.FC = () => {
  const currentContext = store.currentContext.use();

  const handleSubmit = useLockFn(async () => {
    if (currentContext.from === "activate") {
      emitter.emit("refreshHomepage");
    }
    store.isModalShow.set(false);
    if (currentContext.pid) {
      const target = window.location.pathname.startsWith("/p") ? "_self" : "_blank";
      window.open(`/p/${currentContext.pid}?tid=${new URLSearchParams(window.location.search).get("tid")}`, target);
    }
  });

  function transformContent(input: string) {
    return input
      .split(",")
      .map((item) => `【${item}】`)
      .join("--");
  }

  return (
    <div>
      <div className="flex h-12 w-full rounded-t-lg bg-[#FF7D37] pl-3 pt-3 text-2xl text-white">
        <Icon icon="ic:outline-check-circle" className="mr-3 text-3xl text-white" />
        激活成功
      </div>
      <div className="px-8 pb-6">
        <div className="my-3 space-y-3">
          <p>亲爱的用户：</p>
          <article className="space-y-3 indent-7">
            <p>恭喜您已成功激活{transformContent(currentContext.content)}专属题库。</p>
            <p>快去体验吧！</p>
          </article>
        </div>
        <div className="flex w-full justify-around">
          <Button className="w-4/12" onClick={handleSubmit}>
            去体验
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivateSuccess;
