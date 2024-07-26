"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import SolutionItemBottom from "@/components/solution/solution-item-bottom";
import { components } from "@/types/schema";
import { getTimeDiffFromNow } from "@/lib/utils";

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

const MarkdownRenderer = React.lazy(() => import("@/components/common/markdown-renderer"));

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
      {/* <div className="mb-5 flex flex-col">
        <span>本章考察知识点</span>
        <span className="font-yahei text-[#797979]">本章考察知识点</span>
      </div>{" "}
      <div>
        <span className="mb-4 inline-block">选题辨识度分析</span>
        <div className="flex flex-col bg-primary/10 py-7 pl-10 pr-5 text-primary">
          <span>【易错选项】</span>
          <span className="mt-5">【易错选项分析】 </span>
          <span className="mt-5">【其他选项分析】</span>

            
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <span>特别提醒 </span>
        <span className="text-red-600">特别提醒</span>
      </div> */}
      <div className="flex flex-col bg-primary/10 py-7 pl-10 pr-5 text-primary">
        <Suspense fallback={<div>Loading...</div>}>
          <MarkdownRenderer markdown={item.content} className="prose-pdetail" />
        </Suspense>
      </div>

      <SolutionItemBottom voteNumber={item.vote} pid={pid} psid={item._id}></SolutionItemBottom>
    </div>
  );
};
export default SolutionItem;
