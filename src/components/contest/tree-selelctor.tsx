"use client";
import React from "react";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import TOP_FILTER from "@/constants/contest-top-filter";
import { useUrlParamState } from "@/hooks/useUrlParamState";
const TreeSelector: React.FC = () => {
  const [, setTags] = useUrlParamState("tags");
  return (
    <FilerTabsTree
      data={TOP_FILTER}
      onChange={(value) => {
        const key = value.join("-");
        setTags(key);
      }}
    />
  );
};
export default TreeSelector;
