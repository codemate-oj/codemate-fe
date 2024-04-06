"use client";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import FixedSelect, { FixedSelectOptions } from "@/components/common/fixed-select";
import useQuestionBankTabs from "@/hooks/useQuestionBankTabs";
import React from "react";

const HomePage = () => {
  const { questionBankTabs } = useQuestionBankTabs();
  const options: FixedSelectOptions[] = [
    {
      value: "1",
      label: "选择语言",
      children: [
        {
          value: "11",
          label: "赛事题库1",
        },
        {
          value: "12",
          label: "赛事题库2",
        },
        {
          value: "13",
          label: "赛事题库3",
        },
      ],
    },
  ];
  return (
    <>
      <FixedSelect options={options} onSelect={(value) => console.log(value)} />
      <FilerTabsTree filerTabsTreeData={questionBankTabs} />
    </>
  );
};

export default HomePage;
