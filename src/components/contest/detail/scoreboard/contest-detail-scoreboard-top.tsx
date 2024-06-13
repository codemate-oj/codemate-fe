import { formatTime } from "@/lib/utils";
import React from "react";

interface ScoreboardTopProps {
  title: string;
  attend: number;
  beginAt: string;
  // other props...
}
const ScoreboardTop: React.FC<ScoreboardTopProps> = (props) => {
  const { title, attend, beginAt } = props;
  return (
    <div className="mb-10">
      <div className="header flex justify-between ">
        <div className="flex">
          <div className="title font-bold text-2xl">比赛:{title}</div>
          <div className="text-[#FF7D37] font-bold text-2xl">&nbsp;&nbsp;参赛人数：{attend}人</div>
        </div>
        <div>
          <span className="bg-[rgb(249,249,249)] min-w-40 py-1 px-2 text-center text-[rgb(121,121,121)] text-sm">
            比赛时间：{formatTime(beginAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ScoreboardTop;
