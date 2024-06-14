import { Button } from "antd";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import React from "react";
import Link from "next/link";
import ContestState from "./contest-state";
import Image from "next/image";
import { remoteUrl, getTimeDiffByHour, formatTime } from "@/lib/utils";
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
    <div className="flex h-48">
      <div onClick={() => toDetail(_id)} className="w-80 h-40 mr-8 relative overflow-hidden cursor-pointer">
        <ContestState
          isApply={isApply}
          beginAt={beginAt}
          endAt={endAt}
          checkinBeginAt={checkinBeginAt}
          checkinEndAt={checkinEndAt}
          styleClassNames="absolute top-2 right-2 py-2 px-4 text-sm font-normal rounded-lg"
        />

        <Image src={remoteUrl(imageURL as string)} alt="loading" width={320} height={160} />
      </div>
      <div className="flex-1 relative">
        <div className="title">
          <span onClick={() => toDetail(_id)} className="font-bold text-lg cursor-pointer">
            {title}
          </span>
          <span className="absolute right-0 bg-[#F1F1F1] py-1 px-4 rounded-l-3xl text-sm">专项赛</span>
        </div>
        <div className="tags flex mt-2">
          <div className="rule flex-1">
            <p className="font-normal text-lg">{rule}</p>
            <span className="font-normal text-sm text-[#797979]">赛制</span>
          </div>
          <div className="time flex-1">
            <p className="font-normal text-lg">{getTimeDiffByHour(endAt, beginAt)}小时</p>
            <span className="font-normal text-sm text-[#797979]">时长</span>
          </div>
          <div className="attend flex-1">
            <p className="font-normal text-lg">{attend}人</p>
            <span className="font-normal text-sm text-[#797979]">{isApply ? "已报名" : "未报名"}</span>
          </div>
          <div className="lang flex-1">
            <p className="font-normal text-lg text-[#FF7D37]">
              {tag ? (tag.length !== 1 ? "多种语言" : PROGRAMMING_LANGS[tag[0]] || "多种语言") : "多种语言"}
            </p>
            <span className="font-normal text-sm text-[#797979]">语言</span>
          </div>
        </div>
        <footer className="relative mt-6">
          <p className="font-normal text-sm text-[#3D3D3D]">
            报名时间：{!checkinBeginAt ? "---" : formatTime(checkinBeginAt)} --{" "}
            {!checkinEndAt ? "---" : formatTime(checkinEndAt)}
          </p>
          <p className="font-normal text-sm text-[#3D3D3D]">
            比赛时间：{beginAt.slice(0, 16).replace("T", " ")} -- {endAt.slice(0, 16).replace("T", " ")}
          </p>
          <span className="absolute right-0 top-2">
            <Link href={`/contest/${_id}`} target="_blank">
              <Button>查看详情</Button>
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
};
export default Item;
