import PageTitle from "@/components/common/page-title";
import RankingScoreBoard from "@/components/ranking/ranking-scoreboard";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "封神榜 - CODEMATE",
};

const RankingPage = () => {
  return (
    <div>
      <PageTitle>封神榜 魅神榜 总榜</PageTitle>
      <RankingScoreBoard />
    </div>
  );
};

export default RankingPage;
