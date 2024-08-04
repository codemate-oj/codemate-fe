import PageTitle from "@/components/common/page-title";
import DetailPage from "@/components/record/detail-page";
import { BRANCH_NAME } from "@/constants/misc";
import { forwardAuthHeader } from "@/lib/forward-auth";
import { request } from "@/lib/request";
import { getTimeFromObjectId } from "@/lib/utils";
import type { Metadata } from "next";
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
    ...forwardAuthHeader(),
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
      <DetailPage rid={rid} defaultValue={{ submitAt, ...rdoc }} udoc={udoc} pdoc={pdoc} />
    </div>
  );
};

export default RecordDetailPage;
