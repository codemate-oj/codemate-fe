"use client";
import { request } from "@/lib/request";
import TreeSelector from "./tree-selelctor";
import { useRequest } from "ahooks";
import Loading from "@/app/(home)/loading";
import RankingScoreboardTable from "./ranking-scoreboard-table";
// import data from "./data.json";
const RankingScoreBoard: React.FC = () => {
  // const loading = false;
  const { data, loading } = useRequest(async () => {
    //@ts-expect-error 后端类型未添加
    const { data } = await request.get("/ranking", {
      transformData: (data) => {
        return data;
      },
    });
    return {
      data: data,
    };
  });
  const { udocs } = data?.data?.udocs;
  return (
    <>
      <TreeSelector />
      {loading ? <Loading /> : <RankingScoreboardTable data={udocs} />}
    </>
  );
};
export default RankingScoreBoard;
