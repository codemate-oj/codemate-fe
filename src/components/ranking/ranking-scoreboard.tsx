"use client";
import { request } from "@/lib/request";
import TreeSelector from "./tree-selelctor";
import { useRequest } from "ahooks";
import Loading from "@/app/(home)/loading";
import RankingScoreboardTable from "./ranking-scoreboard-table";
import { useSearchParams } from "next/navigation";
// import data from "./data.json";
interface itemType {
  _id: string;
  key: string;
  uname: string;
  rp: number;
  contest: number;
  nSubmit: number;
  nAccept: number;
  totalScore: number;
}
const defaultObj = {
  _id: "",
  key: "",
  uname: "",
  rp: null,
  contest: null,
  nSubmit: null,
  nAccept: null,
  totalScore: null,
};
const RankingScoreBoard: React.FC = () => {
  // const loading = false;
  const searchParams = useSearchParams();
  const { data, loading } = useRequest(
    async () => {
      // @ts-expect-error 后端类型未添加
      const { data } = await request.get(`/ranking?rankBy=${searchParams.get("rankBy")}`, {
        transformData: (data) => {
          return data;
        },
      });
      const { udocs, rpInfo } = data;
      udocs?.forEach((item: itemType, index: number) => {
        udocs[index] = rpInfo[String(item._id)]
          ? { ...item, ...rpInfo[String(item._id)], ...rpInfo[String(item._id)]?.rpInfo }
          : { ...defaultObj, ...item };
      });
      return {
        udocs,
        rpInfo,
      };
    },
    {
      refreshDeps: [searchParams.get("rankBy")],
    }
  );
  const { udocs, rpInfo } = data || { udocs: undefined, rpInfo: undefined };
  // udocs?.forEach((item: itemType, index: number) => {
  //   udocs[index] = rpInfo[String(item._id)]
  //     ? { ...item, ...rpInfo[String(item._id)], ...rpInfo[String(item._id)]?.rpInfo }
  //     : { ...defaultObj, ...item };
  // });
  return (
    <>
      <TreeSelector />
      {loading ? <Loading /> : <RankingScoreboardTable udocs={udocs} rpInfo={rpInfo} />}
    </>
  );
};
export default RankingScoreBoard;
