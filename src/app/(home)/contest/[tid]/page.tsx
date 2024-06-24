import React from "react";
import ContestDetail from "@/components/contest/detail/detail";
import PageTitle from "@/components/common/page-title";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "竞技场-比赛详情 - CODEMATE",
};
const Detail = ({ params }: { params: { tid: string } }) => {
  const { tid } = params;
  return (
    <div>
      <PageTitle>竞技场-比赛详情</PageTitle>
      <ContestDetail tid={tid} />
    </div>
  );
};
export default Detail;
