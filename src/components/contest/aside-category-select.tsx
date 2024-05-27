"use client";
import React from "react";
import FixedSelect from "@/components/common/fixed-select";
import { useUrlParamState } from "@/hooks/useUrlParamState";
enum CATEGORY {
  "all" = "全部",
  "incoming" = "预告中",
  "ready" = "报名中",
  "ongoing" = "比赛中",
  "done" = "已结束",
}
type CATEGORYTYPE = "all" | "incoming" | "ready" | "ongoing" | "done";

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
