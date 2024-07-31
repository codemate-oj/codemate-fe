import type { Metadata } from "next";
import React from "react";
import AsideCategorySelector from "@/components/contest/aside-category-select";
import TreeSelector from "@/components/contest/tree-selelctor";
import ContestItemList from "@/components/contest/contest-item-list";
import PageTitle from "@/components/common/page-title";
import SideLayout from "@/components/common/side-layout";
import { BRANCH_NAME } from "@/constants/misc";
import BulletinSidebar from "@/components/common/bulletin-sidebar";

export const metadata: Metadata = {
  title: `竞技场 - ${BRANCH_NAME}`,
};

const ContestPage = () => {
  return (
    <>
      <PageTitle>竞技场</PageTitle>
      <AsideCategorySelector />
      <SideLayout sideComponent={<BulletinSidebar />}>
        <TreeSelector />
        <ContestItemList />
      </SideLayout>
    </>
  );
};

export default ContestPage;
