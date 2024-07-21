"use client";

import Loading from "@/app/(home)/loading";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import ScoreboardTop from "./contest-detail-scoreboard-top";
import ScoreboardTable from "./contesst-detail-table";
import { getContestState } from "@/lib/utils";
import ContestDetailRight from "../contest-detail-right";

interface ScoreboardProps {
  tid: string;
}
const Scoreboard: React.FC<ScoreboardProps> = (props) => {
  const { tid } = props;
  const { data, loading } = useRequest(async () => {
    //@ts-expect-error 后端类型未添加
    const { data } = await request.get(`/contest/${tid as "{tid}"}/scoreboard`, {
      transformData: ({ data }) => {
        return { data };
      },
    });
    return {
      rows: data?.rows,
      tdoc: data?.tdoc,
      udict: data?.udict,
    };
  });
  const { title, attend, beginAt, endAt } = data?.tdoc || {};
  const rows = data?.rows.slice(1);
  const state = getContestState({
    checkinBeginAt: data?.tdoc?.checkinBeginAt,
    checkinEndAt: data?.tdoc?.checkinEndAt,
    beginAt: beginAt,
    endAt: endAt,
  });
  const tableColumns = data?.rows[0];
  const tableData = rows?.map((item: { [key: string]: string }[], index: number) => {
    const record: { [key: string]: string } = {};
    let count = 0;
    item.forEach((k) => {
      if (k.type == "record") {
        record[String.fromCharCode("A".charCodeAt(0) + count++)] = k.value;
      }
    });
    return {
      key: index,
      rank: item[0].value,
      user: item[1].value,
      total_score: item[2].value,
      ...record,
    };
  });
  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-between">
      <div className="flex-1 pr-12">
        <ScoreboardTop title={title} attend={attend} beginAt={beginAt} />
        <ScoreboardTable tableColumns={tableColumns} dataSource={tableData}></ScoreboardTable>
      </div>
      <div>
<<<<<<< HEAD
        <ContestDetailRight
          tag={data?.tdoc.tag}
          nickname={String(data?.udict[data?.tdoc.owner]?.nickname)}
          state={state}
          tid={tid}
        />
=======
        <ContestDetailRight tdoc={data?.tdoc} status={state} udoc={data?.udict[data?.tdoc?.owner]} />
>>>>>>> origin/main
      </div>
    </div>
  );
};
export default Scoreboard;
