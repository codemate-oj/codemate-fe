import PageTitle from "@/components/common/page-title";
import ProblemsList from "@/components/contest/detail/problems/problems-list";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "竞技场-题单 - CODEMATE",
};

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
