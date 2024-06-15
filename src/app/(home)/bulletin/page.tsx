import PageTitle from "@/components/common/page-title";
import AsideCategorySelector from "@/components/bulletin/aside-category-select";
import type { Metadata } from "next";
import React from "react";
import TreeSelector from "@/components/bulletin/tree-selector";
import BulletinItemList from "@/components/bulletin/bulletin-item-list";
import BulletinBoard, { BulletinCardProps, BullltinItemProps } from "@/components/common/bulletin-board";
import { request } from "@/lib/request";

export const metadata: Metadata = {
  title: "告示墙 - CODEMATE",
};
function getBulletinCardData() {
  return request.get("/bulletin", {
    params: {
      page: 1,
      limit: 3,
    },
    transformData({ data }) {
      const parseBulletinItem = (item) => {
        const _ret: BullltinItemProps = {
          id: item.docId,
          title: item.title,
          postTime: item.postAt,
          href: `/bulletin/${item.docId}`,
        };
        return _ret;
      };
      return [
        {
          key: "重要公告",
          children: data?.bdocs?.map(parseBulletinItem),
          label: "重要公告",
        },
      ] as BulletinCardProps[];
    },
  });
}
const BulletinPage = async () => {
  const bulletinCardData = await getBulletinCardData();
  return (
    <div>
      <PageTitle>告示墙</PageTitle>
      <AsideCategorySelector />
      <div className="w-full flex">
        <div className="md:w-[90vw] lg:w-[60vw] 4xl:max-w-7xl">
          <TreeSelector />
          <BulletinItemList />
        </div>
        <div className="w-[0px] lg:w-[400px] overflow-hidden  ml-[14px]">
          <BulletinBoard data={bulletinCardData as BulletinCardProps[]}></BulletinBoard>
        </div>
      </div>
    </div>
  );
};

export default BulletinPage;
