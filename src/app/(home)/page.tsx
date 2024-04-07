import FilerTabsTree, { type FilerTabsTreeData } from "@/components/common/filter-tabs-tree";
import FixedSelect, { type FixedSelectOptions } from "@/components/common/fixed-select";
import { request } from "@/lib/request";
import React from "react";

async function getSideTabs() {
  const { data } = await request.get<FixedSelectOptions[]>("/home/tabs");
  return data;
}

async function getFilters() {
  const { data } = await request.get<FilerTabsTreeData>("/home/filter");
  return data;
}

const HomePage = async () => {
  const questionBankTabs = await getFilters();
  return (
    <>
      <FilerTabsTree filerTabsTreeData={questionBankTabs} />
    </>
  );
};

export default HomePage;
