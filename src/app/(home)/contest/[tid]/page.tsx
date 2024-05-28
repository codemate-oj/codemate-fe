import React from "react";
import type { Metadata } from "next";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import ContestDetail from "@/components/contest/detail/detail";
const Detail = ({ params }: { params: { tid: string } }) => {
  const { tid } = params;
  return (
    <div>
      <ContestDetail tid={tid} />
    </div>
  );
};
export default Detail;
