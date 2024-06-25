import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "antd";
import Link from "next/link";

interface BulletinItemProps {
  title: string;
  maintainer: number[];
  tag?: string[];
  _id: string;
  content: string;
  owner: number;
  postAt: number | string;
  updateAt: number | string;
}

interface ItemProps {
  toDetail: (id: string) => void;
  item: BulletinItemProps;
}

const BulletinItem: React.FC<ItemProps> = (props) => {
  const { item, toDetail } = props;
  const { title, _id, content, postAt } = item;
  const [isChildrenExpend, setIsChildrenExpend] = useState(false);
  const searchParams = useSearchParams();
  const time = new Date(postAt ?? item.updateAt);

  return (
    <>
      {searchParams.get("tags") === "平台公告" && (
        <div className={`flex ${isChildrenExpend ? "h-auto" : "h-20"} mb-8 overflow-hidden`}>
          <div className="relative flex-1">
            <div className="title">
              <span onClick={() => toDetail(_id)} className="cursor-pointer text-lg font-bold">
                {title}
              </span>
              <span className="absolute right-16 px-4 py-1 text-sm text-[#B9B9B9]">
                {time.toLocaleDateString().replace("/", "年").replace("/", "月")}日 {time.toLocaleTimeString()}
              </span>
              <span className="absolute right-0 px-4 py-1 text-sm text-[#FF7D37]">置顶</span>
            </div>
            <div className="tags mt-2 flex">
              <div className="rule flex-1 pr-24">
                <span className="text-sm font-normal text-[#797979]">{content}</span>
              </div>
              <div
                className="lang flex-2 cursor-pointer pr-2 pt-6"
                onClick={() => setIsChildrenExpend(!isChildrenExpend)}
              >
                {!isChildrenExpend ? (
                  <Image src={`/img/arrow-down.png`} alt="arrow-down" width={20} height={10}></Image>
                ) : (
                  <Image src={`/img/arrow-up.png`} alt="arrow-up" width={20} height={10}></Image>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {searchParams.get("tags") === "行业新闻" && (
        <div className="flex h-24">
          <div className="relative flex-1">
            <div className="title">
              <span onClick={() => toDetail(_id)} className="cursor-pointer text-lg font-bold">
                {title}
              </span>
              <span className="absolute right-0 px-4 py-1 text-sm text-[#B9B9B9]">
                {time.toLocaleDateString().replace("/", "年").replace("/", "月")}日 {time.toLocaleTimeString()}
              </span>
            </div>
            <div className="tags mt-2 flex">
              <div className="rule flex-1">
                <span className="text-sm font-normal text-[#797979]">关键词：</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {searchParams.get("tags") === "神犇驾到" && (
        <div className="mb-8 flex h-52 overflow-hidden">
          <div className="mr-5">
            <Image src={""} alt="" width={225} height={250} />
          </div>
          <div className="relative flex-1 justify-around">
            <div className="title">
              <span onClick={() => toDetail(_id)} className="cursor-pointer text-lg font-bold">
                {title}
              </span>
              <span className="absolute right-0 px-4 py-1 text-sm text-[#B9B9B9]">
                {time.toLocaleDateString().replace("/", "年").replace("/", "月")}日
              </span>
            </div>
            <div className="tags mt-2 flex">
              <div className="rule flex-1">
                <span className="line-clamp-6 text-sm font-normal text-[#797979]">{content}</span>
              </div>
            </div>
            <footer className="relative">
              <span className="absolute right-0 top-2 text-[#FF7D37]">
                <Link href={`/bulletin/${_id}`}>
                  <Button type={"primary"}>查看详情</Button>
                </Link>
              </span>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
export default BulletinItem;
