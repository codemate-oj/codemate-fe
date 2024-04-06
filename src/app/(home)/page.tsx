import FilerTabsTree, { type FilerTabsTreeData } from "@/components/common/filter-tabs-tree";
import FixedSelect, { type FixedSelectOptions } from "@/components/common/fixed-select";
import { request } from "@/lib/request";
import React from "react";

async function getSideTabs() {
  const resp = await request.get<FixedSelectOptions[]>("/home/filter-aside").send();
  return resp.json();
}

async function getFilterTree() {
  const resp = await request.get<FilerTabsTreeData>("/home/filter").send();
  return resp.json();
}

const HomePage = async () => {
  const options = await getSideTabs();
  const questionBankTabs = await getFilterTree();
  return (
    <>
      <FixedSelect options={options} />
      <FilerTabsTree filerTabsTreeData={questionBankTabs} />
    </>
  );
};

export default HomePage;
