import FilerTabsTree, { type FilerTabsTreeData } from "@/components/common/filter-tabs-tree";
import FixedSelect, { type FixedSelectOptions } from "@/components/common/fixed-select";
import { request, sendRequest } from "@/lib/request";
import React from "react";

const HomePage = async () => {
  const options = await sendRequest<FixedSelectOptions[]>(request.get("/home/tabs"));
  const questionBankTabs = await sendRequest<FilerTabsTreeData>(request.get("/home/filter"));
  return (
    <>
      <FixedSelect options={options} />
      <FilerTabsTree filerTabsTreeData={questionBankTabs} />
    </>
  );
};

export default HomePage;
