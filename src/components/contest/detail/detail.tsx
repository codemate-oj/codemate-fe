"use client";
import Loading from "@/app/(home)/loading";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import ContestDetailTop from "./contest-detail-top";
import ContestDetailContent from "./contest-detail-content";
import { getDetailState, getTimeDiffByHour } from "@/lib/utils";
import ContestDetailFooter from "./contest-detail-footer";
import ContestDetailRight from "./contest-detail-right";

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
  const defaultTsdocData = {
    attend: 1 | 0,
  };
  const { title, attend, rule, beginAt, endAt, content, tag, owner } = (data || { tdoc: deafultTdocData }).tdoc;
  const { attend: isApply } = (data || { tsdoc: defaultTsdocData }).tsdoc;
  const state = getDetailState({
    checkinBeginAt: data?.tdoc?.checkinBeginAt,
    checkinEndAt: data?.tdoc?.checkinEndAt,
    beginAt: beginAt,
    endAt: endAt,
  });

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex pb-16 space-x-10 justify-between">
          <div className="flex-1 mt-6">
            <ContestDetailTop
              title={title}
              attend={attend}
              rule={rule}
              time={getTimeDiffByHour(endAt, beginAt)}
              isApply={isApply == 1 ? true : false}
              checkinBeginAt={data?.tdoc?.checkinBeginAt}
              checkinEndAt={data?.tdoc?.checkinEndAt}
              beginAt={beginAt}
              endAt={endAt}
              tag={""}
            />
            <ContestDetailContent content={content} />
            <ContestDetailFooter
              title={title}
              isApply={isApply == 1 ? true : false}
              state={state}
              checkinEndAt={data?.tdoc?.checkinEndAt}
              tid={tid}
            />
          </div>
          <ContestDetailRight tag={tag} nickname={String(data?.udict[owner].nickname) || ""} state={state} tid={tid} />
        </div>
      )}
    </div>
  );
};
export default ContestDetail;
