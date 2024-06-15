"use client";
import React from "react";
import FixedSelect from "@/components/common/fixed-select";
import { useUrlParamState } from "@/hooks/useUrlParamState";
enum CATEGORY {
  "problems" = "修炼场(题库)",
  "rank" = "封神榜(榜单)",
  "contest" = "竞技场(竞赛)",
}
type CATEGORYTYPE = "contest" | "rank" | "contest";

const AsideCategorySelector: React.FC = () => {
  const [category, setCategory] = useUrlParamState("category");
  return (
    <FixedSelect
      options={Object.keys(CATEGORY).map((item) => {
        return {
          label: CATEGORY[item as CATEGORYTYPE],
          value: item,
        };
      })}
      onSelect={setCategory}
      defaultSelectedValue={category}
    />
  );
};
export default AsideCategorySelector;
