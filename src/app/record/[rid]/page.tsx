import PageTitle from "@/components/common/page-title";
import DetailPage from "@/components/record/detail-page";
import { BRANCH_NAME } from "@/constants/misc";
import { request } from "@/lib/request";
import { getScoreColor, getTimeDiffFromNow, getTimeFromObjectId } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: `评测结果 - ${BRANCH_NAME}`,
};

interface Props {
  params: {
    rid: string;
  };
}

const getRecordDetail = async (rid: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return request.get(`/record/${rid}` as "/record/{rid}", {
    transformData: (data) => data.data,
  });
};

const RecordDetailPage = async ({ params }: Props) => {
  const { rid } = params;
  if (!rid) throw new Error("No rid provided");
  const { rdoc, udoc, pdoc } = await getRecordDetail(rid);
  const submitAt = await getTimeFromObjectId(rdoc._id);
  return (
    <div>
      <PageTitle>评测结果</PageTitle>
      <div className="flex flex-wrap justify-around bg-[#F9F9F9] py-1.5 text-[#797979]">
        <div>
          <span>递交者: </span>
          <span>{udoc?.uname}</span>
        </div>
        <div>
          <span>题目：</span>
          <Link href={`/p/${pdoc.pid}`} target="_blank" className="hover:underline">
            {pdoc.pid} - {pdoc?.title}
          </Link>
        </div>
        <div>
          <span>递交时间：</span>
          <span>{getTimeDiffFromNow(submitAt)}</span>
        </div>
        <div>
          <span>分数: </span>
          <span style={{ color: getScoreColor(rdoc.score) }}>{rdoc.score}</span>
        </div>
      </div>
      <DetailPage rid={rid} defaultValue={rdoc} />
    </div>
  );
};

export default RecordDetailPage;
