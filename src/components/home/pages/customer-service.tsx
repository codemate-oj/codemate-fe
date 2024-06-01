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
      <div className="w-full bg-[#FF7D37] h-12 rounded-t-lg flex text-2xl pt-3 pl-3 text-white">
        <Icon icon="bx:smile" className="text-white text-3xl mr-3" />
        温馨提示
      </div>
      <div className="px-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3 my-3">
            <p>亲爱的用户：</p>
            <article className="indent-7 space-y-3">
              <p>请加客服微信号：18922852573 咨询。</p>
            </article>
          </div>
          <Image src="/img/wechat.png" alt="客服微信" width={85} height={85} className="my-3" />
        </div>
        <div className="w-full flex justify-around">
          <Button className="w-4/12" onClick={handleClose}>
            关闭窗口
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
