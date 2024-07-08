import React from "react";
import BulletinBoard from "./bulletin-board";
import { request } from "@/lib/request";

function getBulletinCardData() {
  return request.get("/bulletin", {
    params: {
      page: 1,
      limit: 3,
    },
    transformData({ data }) {
      return [
        {
          key: "bulletin",
          label: "重要公告",
          children: data?.bdocs?.map?.((item) => ({
            id: item.docId,
            title: item.title,
            postTime: item.postAt,
            href: `/bulletin/${item.docId}`,
          })),
        },
      ];
    },
  });
}

/** This is server-only */
const BulletinSidebar = async () => {
  const bulletinData = await getBulletinCardData();
  return <BulletinBoard data={bulletinData} />;
};

export default BulletinSidebar;
