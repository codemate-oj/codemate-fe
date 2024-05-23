"use client";
import { useInfiniteScroll } from "ahooks";
import React from "react";
import { getRecords } from "./submit-records";
import { STATUS_ACCEPTED } from "@/constants/judge-status";
import { Button, List } from "antd";
import Item from "./item";

const FaultList = () => {
  const { data, loadingMore, loading, loadMore, noMore } = useInfiniteScroll(
    async (d) => {
      const current = d?.currentPage ?? 1;
      let rdocs = await getRecords(undefined, current, true);
      rdocs = rdocs
        .filter((i) => i.result !== STATUS_ACCEPTED)
        .sort((a, b) => b.submitAt.getTime() - a.submitAt.getTime());
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
            <Item {...item} isFault timePrefix={"上次尝试时间："} time={item.submitAt} />
          </List.Item>
        )}
      />
      {!loading && (
        <div className="load-more-btn">
          <Button onClick={loadMore} disabled={noMore} loading={loadingMore}>
            {noMore ? "没有啦" : "加载更多"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FaultList;
