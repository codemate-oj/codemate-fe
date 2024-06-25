"use client";
import { request } from "@/lib/request";
import TreeSelector from "./tree-selelctor";
import { useRequest } from "ahooks";
const RankingScoreBoard: React.FC = () => {
  const { data, loading } = useRequest(async () => {
    //@ts-expect-error 后端类型未添加
    const { data } = await request.get("/ranking_by?rankby=problem_cpp", {
      transformData: (data) => {
        return data;
      },
    });
    return {
      udocs: data.udocs,
    };
  });
  return (
    <>
      <TreeSelector />
      {loading ? data?.udocs : null}
    </>
  );
};
export default RankingScoreBoard;
