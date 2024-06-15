"use client";
import { useInfiniteScroll } from "ahooks";
import React from "react";
import { Button, List } from "antd";
import Item, { ItemDataType } from "./item";
import { request } from "@/lib/request";

const StarredList = () => {
  const { data, loadingMore, loading, loadMore, noMore } = useInfiniteScroll(
    async (d) => {
      const current = d?.currentPage ?? 1;
      //@ts-expect-error 后端还没有添加该类型
      const { pdocs } = await request.get("/problem/starred", {
        params: {
          page: current,
        },
        transformData(data) {
          return data.data;
        },
      });
      if (pdocs.length === 0) {
        return {
          list: [],
          hasNoMore: true,
        };
      }
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        list: pdocs.map((item: any) => {
          const _obj: ItemDataType = {
            pid: item.pid,
            name: item.title,
          };
          return _obj;
        }),
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
        <div className="mt-8 w-full text-center">
          <Button onClick={loadMore} disabled={noMore} loading={loadingMore}>
            {noMore ? "没有更多记录" : "加载更多"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default StarredList;
