"use client";
import React from "react";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import TOP_FILTER from "@/constants/bulletin-top-filter";
import { useUrlParamState } from "@/hooks/useUrlParamState";
const TreeSelector: React.FC = () => {
  const [tags, setTags] = useUrlParamState("tags", "平台公告");
  return (
    <FilerTabsTree
      data={TOP_FILTER}
      selectedPath={tags ? tags.split("-") : undefined}
      onChange={(value) => {
        const key = value.join("-");
        setTags(key);
      }}
    />
  );
};
export default TreeSelector;
