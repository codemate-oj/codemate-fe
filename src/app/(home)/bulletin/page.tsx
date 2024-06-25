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
      <TreeSelector />
      <BulletinItemList />
    </div>
  );
};

export default BulletinPage;
