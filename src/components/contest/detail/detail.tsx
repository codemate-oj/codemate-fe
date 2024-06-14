"use client";
import Loading from "@/app/(home)/loading";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import ContestDetailTop from "./contest-detail-top";
import ContestDetailContent from "./contest-detail-content";
import { getTimeDiffByHour } from "@/lib/utils";
import ContestDetailFooter from "./contest-detail-footer";
import ContestDetailRight from "./contest-detail-right";
const getDetailState = (props: { beginAt: string; endAt: string; checkinBeginAt?: string; checkinEndAt?: string }) => {
  const { endAt, checkinBeginAt, checkinEndAt } = props;
  const nowDate = new Date();
  const endDate = new Date(endAt);
  const checkinBeginDate = new Date(checkinBeginAt as string);
  const checkinEndDate = new Date(checkinEndAt as string);
  if (nowDate < checkinBeginDate) return "预告中";
  else if (nowDate < checkinEndDate) return "可报名";
  else if (nowDate < endDate) return "进行中";
  else return "已结束";
};
interface PropsType {
  tid: string;
}
const ContestDetail: React.FC<PropsType> = (props) => {
  const { tid } = props;
  const { data, loading } = useRequest(async () => {
    const { data } = await request.get(`/contest/${tid as "{tid}"}`, {
      transformData: ({ data }) => {
        return { data };
      },
    });
    return {
      tdoc: data.tdoc,
      tsdoc: data.tsdoc,
      udict: data.udict,
    };
  });
  const deafultTdocData = {
    title: "",
    attend: 0,
    rule: "",
    beginAt: "",
    endAt: "",
    checkinBeginAt: "",
    checkinEndAt: "",
    content: "",
    importantContent: "",
    tag: [""],
    owner: "",
  };
  //@ts-expect-error TODO: 后端类型更新
  const { title, attend, rule, beginAt, endAt, content, tag, owner } = (data || { tdoc: deafultTdocData }).tdoc;
  const tsdoc = data?.tsdoc;
  const state = getDetailState({
    checkinBeginAt: data?.tdoc?.checkinBeginAt,
    checkinEndAt: data?.tdoc?.checkinEndAt,
    beginAt: beginAt,
    endAt: endAt,
  });
  const isApply = Boolean(tsdoc?.attend);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-between space-x-10 pb-16">
          <div className="mt-6 flex-1">
            <ContestDetailTop
              title={title}
              attend={attend}
              rule={rule}
              time={getTimeDiffByHour(endAt, beginAt)}
              isApply={isApply}
              checkinBeginAt={data?.tdoc?.checkinBeginAt}
              checkinEndAt={data?.tdoc?.checkinEndAt}
              beginAt={beginAt}
              endAt={endAt}
              tag={""}
            />
            <ContestDetailContent content={content} />
            <ContestDetailFooter
              title={title}
              isApply={isApply}
              state={state}
              checkinEndAt={data?.tdoc?.checkinEndAt}
              tid={tid}
            />
          </div>
          <ContestDetailRight tag={tag} nickname={String(data?.udict[owner].nickname) || ""} state={state} />
        </div>
      )}
    </div>
  );
};
export default ContestDetail;
