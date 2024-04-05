"use client";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import useQuestionBankTabs from "@/hooks/useQuestionBankTabs";
import React from "react";

const HomePage = () => {
  const { questionBankTabs } = useQuestionBankTabs();
  return (
    <>
      <FilerTabsTree filerTabsTreeData={questionBankTabs} />
    </>
  );
};

export default HomePage;
