"use client";
import { useInfiniteScroll } from "ahooks";
import React from "react";
import { Button, List } from "antd";
import Item from "./item";
import { graphql } from "react-relay";

const StarredList = () => {
  const { data, loadingMore, loading, loadMore, noMore } = useInfiniteScroll(
    async (_data) => {
      const current = _data?.currentPage ?? 1;
      const gql = graphql`
      query Problems {}`;
      return {
        list: [],
        currentPage: current + 1,
        prevLen: _data?.list?.length ?? 0,
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
