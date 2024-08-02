import { PROGRAMMING_LANGS } from "@/constants/misc";
import React from "react";
import Link from "next/link";
import ContestState from "./contest-state";
import Image from "next/image";
import { remoteUrl, getTimeDiffByHour, formatTime, getContestState } from "@/lib/utils";
import { Button } from "../ui/button";
interface ContestItemProps {
  title: string;
  rule: string;
  beginAt: string;
  endAt: string;
  attend: number;
  tag?: string[];
  _id: string;
  checkinBeginAt?: string;
  checkinEndAt?: string;
  imageURL?: string;
}
interface ItemProps {
  toDetail: (id: string) => void;
  item: ContestItemProps;
  tsdict: {
    [key: string]: Record<string, string>;
  };
}
const Item: React.FC<ItemProps> = (props) => {
  const { item, tsdict, toDetail } = props;
  const { title, rule, beginAt, endAt, attend, tag, _id, checkinBeginAt, checkinEndAt, imageURL } = item;
  const isApply = Boolean(tsdict[_id]?.attend);
  return (
    <div className="flex">
      <div
        onClick={() => toDetail(_id)}
        className="relative mr-8 h-[337.5px] w-[538.13px] cursor-pointer overflow-hidden"
      >
        <ContestState
          isApply={isApply}
          status={getContestState({
            checkinBeginAt,
            checkinEndAt,
            beginAt,
            endAt,
            isApplied: isApply,
          })}
          className="absolute right-2 top-2 rounded-lg px-4 py-2 text-sm font-normal"
        />

        <Image src={remoteUrl(imageURL)} alt="contest-cover-img" width={538.13} height={337.5} />
      </div>
      <div className="relative flex-1">
        <div className="mb-3 flex w-full justify-end">
          <span className="rounded-l-3xl bg-[#F1F1F1] px-4 py-1 text-sm">专项赛</span>
        </div>
        <div onClick={() => toDetail(_id)} className="cursor-pointer text-xl font-bold">
          {title}
        </div>
        <div className="tags mt-2 flex flex-wrap gap-y-2">
          <div className="rule min-w-[80px] flex-1">
            <p className="text-lg font-normal">{rule}</p>
            <span className="text-sm font-normal text-[#797979]">赛制</span>
          </div>
          <div className="time min-w-[80px] flex-1">
            <p className="text-lg font-normal">{getTimeDiffByHour(endAt, beginAt)}小时</p>
            <span className="text-sm font-normal text-[#797979]">时长</span>
          </div>
          <div className="attend min-w-[80px] flex-1">
            <p className="text-lg font-normal">{attend}人</p>
            <span className="text-sm font-normal text-[#797979]">{isApply ? "已报名" : "未报名"}</span>
          </div>
          <div className="lang min-w-[80px] flex-1">
            <p className="text-lg font-normal text-[#FF7D37]">
              {tag ? (tag.length !== 1 ? "多种语言" : PROGRAMMING_LANGS[tag[0]] || "多种语言") : "多种语言"}
            </p>
            <span className="text-sm font-normal text-[#797979]">语言</span>
          </div>
        </div>
        <footer className="mt-6 flex items-center justify-between gap-4">
          <div className="space-y-4">
            <p className="text-sm font-normal text-[#3D3D3D]">
              报名时间：{!checkinBeginAt ? "---" : formatTime(checkinBeginAt)} --{" "}
              {!checkinEndAt ? "---" : formatTime(checkinEndAt)}
            </p>
            <p className="text-sm font-normal text-[#3D3D3D]">
              比赛时间：{beginAt.slice(0, 16).replace("T", " ")} -- {endAt.slice(0, 16).replace("T", " ")}
            </p>
          </div>
          <Button className="block">
            <Link href={`/contest/${_id}`} target="_blank">
              查看详情
            </Link>
          </Button>
        </footer>
      </div>
    </div>
  );
};
export default Item;
