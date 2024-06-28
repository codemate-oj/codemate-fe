import React from "react";
import PageTitle from "@/components/common/page-title";
import { Metadata } from "next";
import { request } from "@/lib/request";
import { getContestState } from "@/lib/utils";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import ContestState from "@/components/contest/contest-state";
import ContestDetailFooter from "@/components/contest/detail/contest-detail-footer";
import ContestDetailRight from "@/components/contest/detail/contest-detail-right";
import { forwardAuthHeader } from "@/lib/forward-auth";

const MarkdownRenderer = React.lazy(() => import("@/components/common/markdown-renderer"));

export const metadata: Metadata = {
  title: "竞技场-比赛详情 - CODEMATE",
};

const getContestDetail = (tid: string) => {
  return request.get(`/contest/${tid}` as "/contest/{tid}", {
    transformData: (data) => {
      return data.data;
    },
    ...forwardAuthHeader(),
  });
};

const ContestDetailPage = async ({ params }: { params: { tid: string } }) => {
  const { tid } = params;
  const { tdoc, tsdoc, udict } = await getContestDetail(tid);

  const contestStatus = getContestState({
    checkinBeginAt: tdoc.checkinBeginAt,
    checkinEndAt: tdoc.checkinEndAt,
    beginAt: tdoc.beginAt,
    endAt: tdoc.endAt,
  });
  const isApply = Boolean(tsdoc.attend);
  // @ts-expect-error 为兼容老版本，新版本没有此定义
  const hybridContent = `### 重要内容 \n\n ${tdoc.importantContent} \n\n ### 比赛内容 \n\n ${tdoc.content}`;

  return (
    <div>
      <PageTitle>竞技场-比赛详情</PageTitle>
      <div className="flex justify-between space-x-10 pb-16">
        <div className="mt-6 flex-1">
          <div className="mb-10">
            <div className="header relative flex justify-between">
              <div className="title text-2xl font-bold">比赛:{tdoc.title}</div>
              <div className="text-2xl font-bold text-[#FF7D37]">参赛人数：{tdoc.attend}人</div>
            </div>
            <div className="footor mt-6">
              <div className="flex flex-wrap justify-between gap-10 text-base">
                <div className="flex flex-1 justify-between bg-[rgb(249,249,249)] px-6 py-2 text-[#797979]">
                  <span>
                    语言：
                    {tdoc.tag
                      ? tdoc.tag.length !== 1
                        ? "多种语言"
                        : PROGRAMMING_LANGS[tdoc.tag[0]] || "多种语言"
                      : "多种语言"}
                  </span>
                  <span>赛制：{tdoc.rule}</span>
                  <span>阶段：初赛</span>
                  <span>时长：{tdoc.duration} 小时</span>
                </div>
                <ContestState
                  isApply={isApply}
                  status={contestStatus}
                  className="min-w-30 block rounded-lg border-0 px-9 py-2 text-center text-base"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-full">
              <MarkdownRenderer markdown={hybridContent} className="prose-pdetail" />
            </div>
          </div>
          <ContestDetailFooter tdoc={tdoc} isApply={isApply} status={contestStatus} />
        </div>
        {/* @ts-expect-error APIFox类型错误 */}
        <ContestDetailRight tdoc={tdoc} udoc={udict[tdoc.owner]} status={contestStatus} />
      </div>
    </div>
  );
};
export default ContestDetailPage;
