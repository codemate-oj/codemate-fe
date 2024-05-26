import { Button } from "antd";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import React from "react";
import Link from "next/link";
import ContestState from "./contest-state";
import Image from "next/image";
import { paths } from "@/types/schema";
function calculateTimeDifference(time1: string, time2: string): number {
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return differenceInHours;
}

type ContestItemProps = paths["/contest"]["get"]["responses"]["200"]["content"]["application/json"]["tdocs"][number];

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
      <div onClick={() => toDetail(_id)} className="w-80 h-40 mr-8 relative overflow-hidden cursor-pointer">
        <ContestState
          isApply={Boolean(tsdict[_id])}
          beginAt={beginAt}
          endAt={endAt}
          checkinBeginAt={checkinBeginAt}
          checkinEndAt={checkinEndAt}
        />
        <Image src={`https://www.aioj.net${imageURL}`} alt="loading" width={320} height={160} />
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
            <p className="font-normal text-lg">{calculateTimeDifference(endAt, beginAt)}小时</p>
            <span className="font-normal text-sm text-[#797979]">时长</span>
          </div>
          <div className="attend flex-1">
            <p className="font-normal text-lg">{attend}人</p>
            <span className="font-normal text-sm text-[#797979]">已报名</span>
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
            报名时间：{!checkinBeginAt ? "---" : checkinBeginAt.slice(0, 16).replace("T", " ")} --{" "}
            {!checkinEndAt ? "---" : checkinEndAt.slice(0, 16).replace("T", " ")}
          </p>
          <p className="font-normal text-sm text-[#3D3D3D]">
            比赛时间：{beginAt.slice(0, 16).replace("T", " ")} -- {endAt.slice(0, 16).replace("T", " ")}
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
