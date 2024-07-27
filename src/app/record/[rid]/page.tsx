import PageTitle from "@/components/common/page-title";
import DetailPage from "@/components/record/detail-page";
import { BRANCH_NAME } from "@/constants/misc";
import { request } from "@/lib/request";
import { getTimeDiffFromNow, getTimeFromObjectId } from "@/lib/utils";
import type { Metadata } from "next";

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
      <DetailPage
        rid={rid}
        defaultValue={rdoc}
        uname={udoc?.uname}
        pid={pdoc.pid}
        title={pdoc?.title}
        subtime={getTimeDiffFromNow(submitAt)}
      />
    </div>
  );
};

export default RecordDetailPage;
