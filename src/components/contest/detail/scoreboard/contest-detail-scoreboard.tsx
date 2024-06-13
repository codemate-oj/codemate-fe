"use client";

import Loading from "@/app/(home)/loading";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import ScoreboardTop from "./contest-detail-scoreboard-top";
import ContestDetailRight from "../contest-detail-right";
import ScoreboardTable from "./contesst-detail-table";
import { getDetailState } from "@/lib/utils";

interface ScoreboardProps {
  tid: string;
}
const Scoreboard: React.FC<ScoreboardProps> = (props) => {
  const { tid } = props;
  const { data, loading } = useRequest(async () => {
    const { data } = await request.get(`/contest/${tid as "{tid}"}/scoreboard`, {
      transformData: ({ data }) => {
        return { data };
      },
    });
    return {
      rows: data.rows,
      tdoc: data.tdoc,
      udict: data.udict,
    };
  });
  const { title, attend, beginAt, endAt } = data?.tdoc || {};
  const rows = data?.rows.slice(1);
  const state = getDetailState({
    checkinBeginAt: data?.tdoc?.checkinBeginAt,
    checkinEndAt: data?.tdoc?.checkinEndAt,
    beginAt: beginAt,
    endAt: endAt,
  });
  const tableColumns = data?.rows[0];
  const tableData = rows?.map((item, index: number) => {
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
        <ContestDetailRight
          tag={data?.tdoc.tag}
          nickname={String(data?.udict[data?.tdoc.owner].nickname)}
          state={state}
          tid={tid}
        />
      </div>
    </div>
  );
};
export default Scoreboard;
