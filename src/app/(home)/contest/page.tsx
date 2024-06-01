import type { Metadata } from "next";
import React from "react";
import AsideCategorySelector from "@/components/contest/aside-category-select";
import TreeSelector from "@/components/contest/tree-selelctor";
import ContestItemList from "@/components/contest/contest-item-list";

export const metadata: Metadata = {
  title: "竞技场 - CODEMATE",
};

const ContestPage = () => {
  return (
    <>
      <AsideCategorySelector />
      <TreeSelector />
      <ContestItemList />
    </>
  );
};

export default ContestPage;
