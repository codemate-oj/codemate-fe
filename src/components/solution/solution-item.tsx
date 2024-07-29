"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import SolutionItemBottom from "@/components/solution/solution-item-bottom";
import { components } from "@/types/schema";
import { getTimeDiffFromNow } from "@/lib/utils";
import Loading from "@/components/ui/loading";
import dynamic from "next/dynamic";

interface Solution {
  _id: string;
  content: string;
  docId?: number;
  docType?: number;
  domainId?: string;
  owner?: number;
  maintainer: number[];
  paren?: number;
  reply: components["schemas"]["SolutionReply"];
  vote?: number;
}

interface SolutionTopProps {
  pid: string;
  item: Solution;
  udoc: components["schemas"]["User"];
}

const MarkdownRenderer = dynamic(() => import("@/components/common/markdown-renderer"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

const SolutionItem: React.FC<SolutionTopProps> = ({ item, udoc, pid }) => {
  const time = new Date(udoc.regat!);

  const userLink = [{ name: "身份属性" }, { name: "更多作品" }, { name: "用户评价" }, { name: "看TA博客" }];

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image className="mr-2" src="/img/avatar.png" alt="my-record" width={24} height={24}></Image>
          <span className=" ">{udoc.uname}</span>
        </div>
        <div className="flex items-center">
          <span className="font-yahei text-[#797979]">{getTimeDiffFromNow(time)}</span>
          <Button
            variant={"outline"}
            //改h而不是leading
            className="ml-10 mr-2 h-8 border border-primary px-4 py-[0.1rem] leading-[0.3rem] text-primary hover:bg-accent/30 hover:text-primary"
          >
            收藏
          </Button>
        </div>
      </div>
      <div className="mb-10 flex">
        {userLink.map((item, index) => (
          <span key={index} className="mr-2 font-yahei text-sm text-[#797979] hover:text-primary">
            {item.name}
          </span>
        ))}
      </div>

      <div className="flex flex-col bg-primary/10 py-7 pl-10 pr-5 text-primary">
        <Suspense fallback={<Loading />}>
          <MarkdownRenderer markdown={item.content} className="prose-pdetail" />
        </Suspense>
      </div>

      <SolutionItemBottom voteNumber={item.vote} pid={pid} psid={item._id}></SolutionItemBottom>
    </div>
  );
};
export default SolutionItem;
