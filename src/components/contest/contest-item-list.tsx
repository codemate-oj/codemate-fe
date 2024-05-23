"use client";
import React from "react";
import useUrl from "@/hooks/useUrl";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import Item from "./contest-item";
import Loading from "@/app/(home)/loading";
const ContestItemList: React.FC = () => {
  const { queryParams, updateQueryParams } = useUrl();
  const { data: itemListData, loading } = useRequest(
    async () => {
      const { data } = await request.get("/contest", {
        params: {
          page: 1,
          tags: queryParams["tags"],
          category: queryParams["category"] as "incoming" | "ready" | "ongoing" | "done" | undefined,
        },
        transformData: (data) => {
          return data;
        },
      });

      const itemList = data.tdocs;
      return {
        itemList,
        tsdict: data.tsdict,
      };
    },
    {
      refreshDeps: [queryParams["tags"], queryParams["category"]],
    }
  );
  return (
    <div className={"pt-3"}>
      {loading ? (
        <Loading />
      ) : (
        itemListData?.itemList?.map((item) => {
          return <Item key={item._id} item={item} tsdict={itemListData.tsdict} />;
        })
      )}
    </div>
  );
};
export default ContestItemList;
