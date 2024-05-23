"use client";
import React from "react";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import TOPFILTER from "@/constants/contest-top-filter";
import useUrl from "@/hooks/useUrl";
const TreeSelector: React.FC = () => {
  const { queryParams, updateQueryParams } = useUrl();
  return (
    <FilerTabsTree
      data={TOPFILTER}
      onChange={(value) => {
        const key = value.join("-");
        updateQueryParams("tags", key);
      }}
    />
  );
};
export default TreeSelector;
