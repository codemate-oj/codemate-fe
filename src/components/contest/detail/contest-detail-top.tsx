import { PROGRAMMING_LANGS } from "@/constants/misc";
import React from "react";
import ContestState from "../contest-state";

interface PropsType {
  title: string;
  // docId: string;
  rule: string;
  tag: string;
  attend: number;
  time: number;
  isApply: boolean;
  checkinBeginAt?: string;
  checkinEndAt?: string;
  beginAt: string;
  endAt: string;
}
const ContestDetailTop: React.FC<PropsType> = (props) => {
  const { title, attend, tag, rule, time, isApply, checkinBeginAt, checkinEndAt, beginAt, endAt } = props;

  return (
    <div className="mb-10">
      <div className="header relative flex justify-between">
        <div className="title text-2xl font-bold">比赛:{title}</div>
        <div className="text-2xl font-bold text-[#FF7D37]">参赛人数：{attend}人</div>
      </div>

      <div className="footor mt-6">
        <div className="flex justify-between text-base text-[#797979]">
          <div>
            <span className="min-w-40 bg-[rgb(249,249,249)] px-9 py-2 text-center">
              语言：{tag ? (tag.length !== 1 ? "多种语言" : PROGRAMMING_LANGS[tag[0]] || "多种语言") : "多种语言"}
            </span>
            <span className="min-w-40 bg-[rgb(249,249,249)] px-9 py-2 text-center">赛制：{rule}</span>
            <span className="min-w-40 bg-[rgb(249,249,249)] px-9 py-2 text-center">阶段：初赛</span>
            <span className="min-w-40 bg-[rgb(249,249,249)] px-9 py-2 text-center">时长：{time} 小时</span>
          </div>
          <div>
            <ContestState
              isApply={isApply}
              beginAt={beginAt}
              endAt={endAt}
              checkinBeginAt={checkinBeginAt}
              checkinEndAt={checkinEndAt}
              styleClassNames={
                "py-2 px-9 text-[#FF7D37] bg-[rgb(255, 125, 55)]  text-base rounded-lg min-w-30 border-0 text-center"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContestDetailTop;
