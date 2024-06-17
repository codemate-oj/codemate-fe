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
  return (
    <div className="flex h-48">
      <div onClick={() => toDetail(_id)} className="relative mr-8 h-40 w-80 cursor-pointer overflow-hidden">
        <ContestState
          isApply={Boolean(tsdict[_id])}
          beginAt={beginAt}
          endAt={endAt}
          checkinBeginAt={checkinBeginAt}
          checkinEndAt={checkinEndAt}
          styleClassNames="absolute top-2 right-2 py-2 px-4 text-sm font-normal rounded-lg"
        />

        <Image src={remoteUrl(imageURL as string)} alt="loading" width={320} height={160} />
      </div>
      <div className="relative flex-1">
        <div className="title">
          <span onClick={() => toDetail(_id)} className="cursor-pointer text-lg font-bold">
            {title}
          </span>
          <span className="absolute right-0 rounded-l-3xl bg-[#F1F1F1] px-4 py-1 text-sm">专项赛</span>
        </div>
        <div className="tags mt-2 flex">
          <div className="rule flex-1">
            <p className="text-lg font-normal">{rule}</p>
            <span className="text-sm font-normal text-[#797979]">赛制</span>
          </div>
          <div className="time flex-1">
            <p className="text-lg font-normal">{getTimeDiffByHour(endAt, beginAt)}小时</p>
            <span className="text-sm font-normal text-[#797979]">时长</span>
          </div>
          <div className="attend flex-1">
            <p className="text-lg font-normal">{attend}人</p>
            <span className="text-sm font-normal text-[#797979]">已报名</span>
          </div>
          <div className="lang flex-1">
            <p className="text-lg font-normal text-[#FF7D37]">
              {tag ? (tag.length !== 1 ? "多种语言" : PROGRAMMING_LANGS[tag[0]] || "多种语言") : "多种语言"}
            </p>
            <span className="text-sm font-normal text-[#797979]">语言</span>
          </div>
        </div>
        <footer className="relative mt-6">
          <p className="text-sm font-normal text-[#3D3D3D]">
            报名时间：{!checkinBeginAt ? "---" : formatTime(checkinBeginAt)} --{" "}
            {!checkinEndAt ? "---" : formatTime(checkinEndAt)}
          </p>
          <p className="text-sm font-normal text-[#3D3D3D]">
            比赛时间：{!beginAt ? "---" : formatTime(beginAt)} -- {!endAt ? "---" : formatTime(endAt)}
            {/* {beginAt.slice(0, 16).replace("T", " ")} -- {endAt.slice(0, 16).replace("T", " ")} */}
          </p>
          <span className="absolute right-0 top-2">
            <Link href={`/contest/${_id}`}>
              <Button>查看详情</Button>
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
};
export default Item;
