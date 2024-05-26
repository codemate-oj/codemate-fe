"use client";
import { useInfiniteScroll } from "ahooks";
import React from "react";
import { getRecords } from "./submit-records";
import { STATUS_ACCEPTED } from "@/constants/judge-status";
import { Button, List } from "antd";
import Item from "./item";

const StarredList = () => {
  const { data, loadingMore, loading, loadMore, noMore } = useInfiniteScroll(
    async (d) => {
      const current = d?.currentPage ?? 1;
      const rdocs: any[] = [];
      if (rdocs.length === 0) {
        return {
          list: [],
          hasNoMore: true,
        };
      }
      return {
        list: rdocs,
        currentPage: current + 1,
        prevLen: d?.list?.length ?? 0,
      };
    },
    {
      isNoMore: (data) => data?.hasNoMore,
    }
  );

  return (
    <div>
      <List
        loading={loading}
        dataSource={data?.list ?? []}
        renderItem={(item) => (
          <List.Item>
            <Item {...item} />
          </List.Item>
        )}
      />
      {!loading && (
        <div className="w-full text-center mt-8">
          <Button onClick={loadMore} disabled={noMore} loading={loadingMore}>
            {noMore ? "没有更多记录" : "加载更多"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default StarredList;