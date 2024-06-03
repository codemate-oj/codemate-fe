import React from "react";
import ContestDetail from "@/components/contest/detail/detail";
import PageTitle from "@/components/common/page-title";
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
