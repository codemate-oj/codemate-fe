import type { Metadata } from "next";
import React from "react";
import AsideCategorySelector from "@/components/contest/aside-category-select";
import TreeSelector from "@/components/contest/tree-selelctor";
import ContestItemList from "@/components/contest/contest-item-list";
import PageTitle from "@/components/common/page-title";

export const metadata: Metadata = {
  title: "竞技场 - CODEMATE",
};

const ContestPage = () => {
  return (
    <>
      <PageTitle>竞技场</PageTitle>
      <AsideCategorySelector />
      <TreeSelector />
      <ContestItemList />
    </>
  );
};

export default ContestPage;
