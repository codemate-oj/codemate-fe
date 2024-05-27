import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import SolutionItemBottom from "@/components/solution/solution-item-bottom";

interface SolutionTopProps {}
const SolutionItem: React.FC<SolutionTopProps> = (props) => {
  const {} = props;

  const userLink = [{ name: "身份属性" }, { name: "更多作品" }, { name: "用户评价" }, { name: "看TA博客" }];

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image className="mr-2" src="/img/avatar.png" alt="my-record" width={24} height={24}></Image>
          <span className=" ">胜多负少</span>
        </div>
        <div className="flex items-center">
          <span className="font-yahei text-[#797979]">2022.2.1</span>
          <Button
            variant={"outline"}
            //改h而不是leading
            className="leading-[0.3rem] ml-10 py-[0.1rem] px-4 h-8  border-primary border   text-primary hover:text-primary  mr-2 hover:bg-accent/30"
          >
            收藏
          </Button>
        </div>
      </div>
      <div className="flex mb-10">
        {userLink.map((item, index) => (
          <span key={index} className="mr-2 text-sm font-yahei text-[#797979] hover:text-primary">
            {item.name}
          </span>
        ))}
      </div>
      <div className="flex flex-col mb-5">
        <span>本章考察知识点</span>
        <span className="text-[#797979]   font-yahei">本章考察知识点</span>
      </div>{" "}
      <div>
        <span className="mb-4 inline-block">选题辨识度分析</span>
        <div className=" bg-primary/10 pr-5 pl-10 py-7 flex flex-col text-primary">
          <span>【易错选项】</span>
          <span className="mt-5">【易错选项分析】 </span>
          <span className="mt-5">【其他选项分析】</span>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <span>特别提醒</span>
        <span className="text-red-600">特别提醒</span>
      </div>
      <SolutionItemBottom></SolutionItemBottom>
    </div>
  );
};
export default SolutionItem;
