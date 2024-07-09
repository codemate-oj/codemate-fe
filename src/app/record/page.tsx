import PageTitle from "@/components/common/page-title";
import RecordList from "@/components/record/record-list";
import { BRANCH_NAME } from "@/constants/misc";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `评测队列 - ${BRANCH_NAME}`,
};

const RecordPage = () => {
  return (
    <div>
      <PageTitle>评测队列</PageTitle>
      <RecordList />
    </div>
  );
};

export default RecordPage;
