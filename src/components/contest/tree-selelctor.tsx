"use client";
import React from "react";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import TOP_FILTER from "@/constants/contest-top-filter";
import { useUrlParamState } from "@/hooks/useUrlParamState";
const TreeSelector: React.FC = () => {
  const [tags, setTags] = useUrlParamState("tags");
  return (
    <FilerTabsTree
      data={TOP_FILTER}
      selectedPath={tags ? tags.split(",") : undefined}
      onChange={(value) => {
        setTags(value.join(","));
      }}
    />
  );
};
export default TreeSelector;
