import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "封神榜 - CODEMATE",
};

const RankingPage = () => {
  return (
    <div>
      <PageTitle>封神榜</PageTitle>
    </div>
  );
};

export default RankingPage;
