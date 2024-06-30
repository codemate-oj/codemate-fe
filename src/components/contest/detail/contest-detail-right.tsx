"use client";

import React from "react";
import type { getContestState } from "@/lib/utils";
import { CollapseProps } from "antd";

interface ContestDetailRightPropsType {
  tdoc: { tag?: string[]; docId: string };
  udoc: { uname: string; nickname?: string };
  status: ReturnType<typeof getContestState>;
}
const ContestDetailRight: React.FC<ContestDetailRightPropsType> = ({ tdoc, udoc, status }) => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "比赛类别",
      children: <span className="text-[#FF7D37]">专项赛</span>,
    },
    {
      key: "2",
      label: "比赛阶段",
      children: <span className="text-[#FF7D37]">初赛</span>,
    },
    {
      key: "3",
      label: "举办方",
      children: <span className="text-[#FF7D37]">{udoc.nickname ?? udoc.uname}</span>,
    },
    {
      key: "4",
      label: "比赛答疑",
      children: <span className="cursor-pointer text-[#FF7D37]">前往本次比赛答疑专区</span>,
    },
    {
      key: "5",
      label: "赛后总结",
      children: <span className="cursor-pointer text-[#FF7D37]">前往本次比赛赛后总结专区</span>,
    },
    {
      key: "6",
      label: "比赛排名",
      children: (
        <span
          className="cursor-pointer text-[#FF7D37]"
          onClick={() => {
            window.open(`/contest/${tdoc.docId}/scoreboard`);
          }}
        >
          本次比赛完整排名
        </span>
      ),
    },
  ];
  return (
    <div className={""}>
      {items.map((item) => {
        if ((item.key == "5" || item.key == "6") && status !== "已结束") return null;
        return (
          <div key={item.key}>
            <div className="h-10 w-52 border-b">
              <span className={"border-l-4 border-[#FF7D37] pl-2 text-lg font-bold"}>{item.label}</span>
            </div>
            <div className="my-6">{item.children}</div>
          </div>
        );
      })}
    </div>
  );
};
export default ContestDetailRight;
