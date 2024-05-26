"use client";
import React from "react";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import TOP_FILTER from "@/constants/contest-top-filter";
import useUrl from "@/hooks/useUrl";
const TreeSelector: React.FC = () => {
  const { updateQueryParams } = useUrl();
  return (
    <FilerTabsTree
      data={TOP_FILTER}
      onChange={(value) => {
        const key = value.join("-");
        updateQueryParams("tags", key);
      }}
    />
  );
};
export default TreeSelector;
