"use client";
import React from "react";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import { contestFilterTreeData } from "@/constants/filters";
import { useUrlParamState } from "@/hooks/useUrlParamState";
const TreeSelector: React.FC = () => {
  const [tags, setTags] = useUrlParamState("tags");
  return (
    <FilerTabsTree
      data={contestFilterTreeData}
      selectedPath={tags ? tags.split(",") : undefined}
      onChange={(value) => {
        setTags(value.join(","));
      }}
    />
  );
};
export default TreeSelector;
