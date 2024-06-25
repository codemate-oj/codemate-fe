"use client";
import React from "react";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import TOP_FILTER from "@/constants/ranking-top-filter";
const TreeSelector: React.FC = () => {
  return <FilerTabsTree data={TOP_FILTER} selectedPath={["0"]} />;
};
export default TreeSelector;
