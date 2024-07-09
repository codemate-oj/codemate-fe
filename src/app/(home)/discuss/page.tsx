import PageTitle from "@/components/common/page-title";
import { BRANCH_NAME } from "@/constants/misc";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `觉醒台 - ${BRANCH_NAME}`,
};

const DiscussPage = () => {
  return (
    <div>
      <PageTitle>觉醒台</PageTitle>
    </div>
  );
};

export default DiscussPage;
