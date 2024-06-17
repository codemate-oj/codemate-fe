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
      <div className="header flex justify-between">
        <div className="flex">
          <div className="title text-2xl font-bold">比赛:{title}</div>
          <div className="text-2xl font-bold text-[#FF7D37]">&nbsp;&nbsp;参赛人数：{attend}人</div>
        </div>
        <div>
          <span className="min-w-40 bg-[rgb(249,249,249)] px-2 py-1 text-center text-sm text-[rgb(121,121,121)]">
            比赛时间：{formatTime(beginAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ScoreboardTop;
