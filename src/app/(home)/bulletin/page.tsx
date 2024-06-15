import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";
import React from "react";
import TreeSelector from "@/components/bulletin/tree-selector";
import BulletinItemList from "@/components/bulletin/bulletin-item-list";

export const metadata: Metadata = {
  title: "告示墙 - CODEMATE",
};
const BulletinPage = async () => {
  return (
    <div>
      <PageTitle>告示墙</PageTitle>
      <div className="flex w-full">
        <div className="md:w-[90vw] lg:w-[60vw] 4xl:max-w-7xl">
          <TreeSelector />
          <BulletinItemList />
        </div>
        <div className="ml-[14px] w-[0px] overflow-hidden lg:w-[400px]"></div>
      </div>
    </div>
  );
};

export default BulletinPage;
