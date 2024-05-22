"use client";
import type { Metadata } from "next";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import FixedSelect from "@/components/common/fixed-select";
import React, { Suspense } from "react";
import Loading from "../loading";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import useUrl from "@/hooks/useUrl";
import TOPFILTER from "../../../constants/contest-top-filter";
import Item from "../../../components/contest/item";
enum CATEGORY {
  "all" = "全部",
  "incoming" = "预告中",
  "ready" = "报名中",
  "ongoing" = "比赛中",
  "done" = "已结束",
}
type CATEGORYTYPE = "all" | "incoming" | "ready" | "ongoing" | "done";
// export const metadata: Metadata = {
//   title: "竞技场 - CODEMATE",
// };
const ContestPage = () => {
  const { queryParams, updateQueryParams } = useUrl();
  const { data: itemListData } = useRequest(
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
    <Suspense fallback={<Loading />}>
      <FixedSelect
        options={Object.keys(CATEGORY).map((item) => {
          return {
            label: CATEGORY[item as CATEGORYTYPE],
            value: item,
          };
        })}
        onSelect={(i) => updateQueryParams("category", i)}
        defaultSelectedValue={queryParams["category"]}
      />
      <FilerTabsTree
        data={TOPFILTER}
        onChange={(value) => {
          const key = value.join("-");
          updateQueryParams("tags", key);
        }}
        // defaultActiveKey={queryParams["tid"]}
      />
      {itemListData ? (
        itemListData?.itemList?.map((item) => {
          return <Item key={item._id} item={item} tsdict={itemListData.tsdict} />;
        })
      ) : (
        <Loading />
      )}
    </Suspense>
  );
};

export default ContestPage;
