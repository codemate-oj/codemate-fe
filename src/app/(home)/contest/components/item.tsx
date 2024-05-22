import { Button } from "antd";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import React from "react";
import Link from "next/link";
import { labelValueKeyValue } from "../labelValueMap";
import Image from "next/image";
import useUrl from "@/hooks/useUrl";
function calculateTimeDifference(time1: string, time2: string): number {
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  const differenceInMilliseconds = (date1 as any) - (date2 as any);
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return differenceInHours;
}
interface NavItemType {
  name: string;
  href: Parameters<(str: string) => [string]>[0];
  isActive?: boolean;
  disabled?: boolean;
}
const getState = (isApply: boolean, beginAt: string, endAt: string, checkinBeginAt: string, checkinEndAt: string) => {
  const nowDate = new Date();
  const beginDate = new Date(beginAt);
  const endDate = new Date(endAt);
  const checkinBeginDate = new Date(checkinBeginAt);
  const checkinEndDate = new Date(checkinEndAt);
  if (nowDate < checkinBeginDate)
    return (
      <span className="absolute top-2 right-2 text-[#FF7D37] border border-[#FF7D37] rounded-lg py-2 px-4 text-sm font-normal">
        预告中
      </span>
    );
  else if (nowDate < beginDate)
    return (
      <span className="absolute top-2 right-2 text-white border border-[#FF7D37] bg-[#FF7D37] rounded-lg py-2 px-4 text-sm font-normal">
        {isApply ? "已报名（未开始）" : "可报名"}
      </span>
    );
  else if (nowDate < checkinEndDate)
    return (
      <span className="absolute top-2 right-2 text-white border border-[#0256FF] bg-[#0256FF] rounded-lg py-2 px-4 text-sm font-normal">
        {isApply ? "已报名（进行中）" : "进行中"}
      </span>
    );
  else if (nowDate < endDate)
    return (
      <span className="absolute top-2 right-2 text-white border border-[#0256FF] bg-[#0256FF] rounded-lg py-2 px-4 text-sm font-normal">
        {isApply ? "已报名（进行中）" : "进行中"}
      </span>
    );
  else
    return (
      <span className="absolute top-2 right-2 text-white border border-[#3D3D3D] bg-[#3D3D3D] rounded-lg py-2 px-4 text-sm font-normal">
        已结束
      </span>
    );
};
const Item: React.FC<any> = (props) => {
  const { item, tsdict } = props;
  const { title, rule, beginAt, endAt, attend, tag, _id, checkinBeginAt, checkinEndAt, imageURL } = item;
  const { queryParams, updateQueryParams } = useUrl();
  // const data = useRequest(async () => {
  //   const { data: img } = request.get("/contest/file/2/sKI-ZU-No83ClIBleJqSq.png");
  // });
  const k: NavItemType = {
    name: title,
    href: "/contest/" + _id,
  };
  return (
    <div className="flex h-48">
      <div className="w-80 h-40 mr-8 relative">
        {getState(tsdict[_id], beginAt, endAt, checkinBeginAt, checkinEndAt)}
        {/* <img src={`https://www.aioj.net${imageURL}`} alt="123" /> */}
        {/* file/2/sKI-ZU-No83ClIBleJqSq.png */}
        <Image src={`https://www.aioj.net${imageURL}`} alt="loading" width={320} height={160} />
        {/* <div className="w-full h-full bg-black"></div> */}
      </div>
      <div className="flex-1 relative">
        <div className="title">
          <span className="font-bold text-lg">{title}</span>
          <span className="absolute right-0 bg-[#F1F1F1] py-1 px-4 rounded-l-3xl text-sm">{}</span>
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
              {tag.length !== 1 ? "多种语言" : PROGRAMMING_LANGS[tag[0]] || "多种语言"}
            </p>
            <span className="font-normal text-sm text-[#797979]">语言</span>
          </div>
        </div>
        <footer className="relative mt-6">
          <p className="font-normal text-sm text-[#3D3D3D]">
            报名时间：{checkinBeginAt.slice(0, 16).replace("T", " ")} -- {checkinEndAt.slice(0, 16).replace("T", " ")}
          </p>
          <p className="font-normal text-sm text-[#3D3D3D]">
            比赛时间：{beginAt.slice(0, 16).replace("T", " ")} -- {endAt.slice(0, 16).replace("T", " ")}
          </p>
          <span className="absolute right-0 top-2">
            {/* <Link href={`/contest/${_id}`}>
              <Button>查看详情</Button>
            </Link> */}
          </span>
        </footer>
      </div>
    </div>
  );
};
export default Item;
