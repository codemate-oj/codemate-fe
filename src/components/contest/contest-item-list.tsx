"use client";
import React, { useCallback, useEffect, useState } from "react";
import useUrl from "@/hooks/useUrl";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import Item from "./contest-item";
import Loading from "@/app/(home)/loading";
import { useRouter } from "next/navigation";
import { Pagination } from "antd";
import LinkBtn from "../common/link-btn";
const ContestItemList: React.FC = () => {
  const router = useRouter();
  const toDetial = useCallback(
    (id: string) => {
      router.push(`/contest/${id}`);
    },
    [router]
  );
  const { queryParams, updateQueryParams } = useUrl();
  const { data: itemListData, loading } = useRequest(
    async () => {
      const { data } = await request.get("/contest", {
        params: {
          page: Number(queryParams["page"]),
          tags: queryParams["tags"],
          category: queryParams["category"] as "incoming" | "ready" | "ongoing" | "done" | undefined,
        },
        transformData: (data) => {
          return data;
        },
      });
      const pageTpcount = data.tpcount;
      const itemList = data.tdocs;
      return {
        itemList,
        tsdict: data.tsdict,
        pageTpcount,
      };
    },
    {
      refreshDeps: [queryParams["tags"], queryParams["category"], queryParams["page"]],
    }
  );
  useEffect(() => {
    updateQueryParams("page", "1");
  }, []);
  return (
    <div className={"pt-3"}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {itemListData?.itemList?.map((item) => {
            return (
              <Item
                toDetail={(id) => {
                  toDetial(id);
                }}
                key={item._id}
                item={item}
                tsdict={itemListData.tsdict}
              />
            );
          })}
          <div className={"text-center mb-4"}>
            <Pagination
              defaultCurrent={Number(queryParams["page"])}
              pageSize={20}
              total={itemListData?.itemList?.length || 0 * 20}
              showSizeChanger={false}
              itemRender={(_, type, element) => {
                if (type === "prev") {
                  return (
                    <>
                      <LinkBtn>首页</LinkBtn>
                      <LinkBtn>上一页</LinkBtn>
                    </>
                  );
                }
                if (type === "next") {
                  return (
                    <>
                      <LinkBtn>下一页</LinkBtn>
                      <LinkBtn>末页</LinkBtn>
                    </>
                  );
                }
                return element;
              }}
              onChange={(page) => {
                updateQueryParams("page", String(page));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ContestItemList;
