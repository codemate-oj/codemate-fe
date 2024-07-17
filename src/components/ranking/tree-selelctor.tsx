"use client";
import React from "react";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import TOP_FILTER from "@/constants/ranking-top-filter";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { searchParamsLabelValueMap, keyType } from "@/constants/ranking-top-filter";
import { useSearchParams } from "next/navigation";
const TreeSelector: React.FC = () => {
  const searchParams = useSearchParams();

  const [rankBy, setRankBy] = useUrlParamState("rankBy", searchParams.get("rankBy") || "all");
  const [selectedPath, setSelectedPath] = React.useState<string[]>(["0", "5"]);
  return (
    <FilerTabsTree
      data={TOP_FILTER}
      selectedPath={selectedPath}
      onChange={(value) => {
        value.length == 0 ? setRankBy("all") : setRankBy(searchParamsLabelValueMap[value[1] as keyType]);
        setSelectedPath(value);
        rankBy;
      }}
    />
  );
};
export default TreeSelector;
