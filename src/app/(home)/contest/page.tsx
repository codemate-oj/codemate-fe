"use client";
import SideFilter, { SideFilterOptions } from "@/components/common/side-filter";
import FilerTabsTree, { TreeItem, type FilerTabsTreeData } from "@/components/common/filter-tabs-tree";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import useUrl from "@/hooks/useUrl";
import React from "react";
import { CONTEST_STATUS, CONTEST_FILTER, CONTEST_FILTER_DIR, type CONTEST_STATUS_VAL } from "./const";

const ContestPage = () => {
  const { queryParams, updateQueryParams } = useUrl();
  const { data } = useRequest(
    async () => {
      const tags = queryParams["tid"]
        .split(",")
        .map((item) => {
          //@ts-ignore
          return CONTEST_FILTER_DIR[item];
        })
        .join(",");
      const category = queryParams["status"] as CONTEST_STATUS_VAL;
      console.log(tags, category);
      const { data } = await request.get("/contest", {
        params: {
          page: 1,
          tags,
          category,
        },
      });
    },
    {
      refreshDeps: [queryParams["tid"]],
    }
  );
  return (
    <div className="flex flex-row">
      <SideFilter
        title="热门比赛"
        options={CONTEST_STATUS}
        onSelect={(value) => {
          updateQueryParams("status", value);
        }}
      />
      <div className="ml-8 flex-1">
        <FilerTabsTree
          filerTabsTreeData={CONTEST_FILTER}
          onChange={(key) => {
            updateQueryParams("tid", key);
          }}
          defaultActiveKey={queryParams["tid"]}
        />
      </div>
    </div>
  );
};

export default ContestPage;
