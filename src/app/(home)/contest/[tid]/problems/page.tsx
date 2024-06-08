import PageTitle from "@/components/common/page-title";
import ProblemsList from "@/components/contest/detail/problems/problems-list";
import React from "react";
const DetailProblems = ({ params }: { params: { tid: string } }) => {
  const { tid } = params;

  return (
    <>
      <PageTitle>竞技场-题单</PageTitle>
      <ProblemsList tid={tid}></ProblemsList>
    </>
  );
};
export default DetailProblems;
