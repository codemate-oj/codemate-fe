"use client";

import React from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { Icon } from "@iconify/react";
import store, { ModalPageContext } from "@/store/modal";
import { useLockFn } from "ahooks";

const CustomerService: React.FC = () => {
  const handleClose = useLockFn(async () => {
    store.isModalShow.set(false);
    store.currentContext.set({} as ModalPageContext);
  });

  return (
    <div>
      <div className="flex h-12 w-full rounded-t-lg bg-[#FF7D37] pl-3 pt-3 text-2xl text-white">
        <Icon icon="bx:smile" className="mr-3 text-3xl text-white" />
        温馨提示
      </div>
      <div className="px-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="my-3 space-y-3">
            <p>亲爱的用户：</p>
            <article className="space-y-3 indent-7">
              <p>请加客服微信号：18922852573 咨询。</p>
            </article>
          </div>
          <Image src="/img/wechat.png" alt="客服微信" width={85} height={85} className="my-3" />
        </div>
        <div className="flex w-full justify-around">
          <Button className="w-4/12" onClick={handleClose}>
            关闭窗口
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
