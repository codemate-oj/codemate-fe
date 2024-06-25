"use client";
import React from "react";
import FixedSelect from "@/components/common/fixed-select";
import { useUrlParamState } from "@/hooks/useUrlParamState";

export const CATEGORY_MAP = {
  "": "全部",
  INCOMING: "预告中",
  READY: "报名中",
  ONGOING: "比赛中",
  DONE: "已结束",
};
type CATEGORY_TYPE = keyof typeof CATEGORY_MAP;

const AsideCategorySelector: React.FC = () => {
  const [category, setCategory] = useUrlParamState("category");
  return (
    <FixedSelect
      options={Object.keys(CATEGORY_MAP).map((item) => {
        return {
          label: CATEGORY_MAP[item as CATEGORY_TYPE],
          value: item,
        };
      })}
      onSelect={setCategory}
      defaultSelectedValue={category}
    />
  );
};
export default AsideCategorySelector;
