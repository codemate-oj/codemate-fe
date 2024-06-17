"use client";
import React, { useCallback } from "react";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import Item from "./contest-item";
import Skeleton from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import LinkBtn from "../common/link-btn";
import { ContestTagEnum } from "@/constants/filters";
const ContestItemList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useUrlParamState("page", "1");
  const toDetial = useCallback(
    (id: string) => {
      router.push(`/contest/${id}`);
    },
    [router]
  );
  const { data: itemListData, loading } = useRequest(
    async () => {
      const tags = searchParams.get("tags")?.split(",").filter(Boolean) ?? [];
      const { data } = await request.get("/contest", {
        params: {
          page: Number(page),
          tags: tags ? tags.map((tag) => ContestTagEnum[Number(tag)]).join(",") : undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          category: searchParams.get("category") as any,
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
      refreshDeps: [searchParams, page],
    }
  );

  return (
    <div className={"pt-3"}>
      {loading ? (
        <Skeleton />
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
          <div className={"mb-4 text-center"}>
            <Pagination
              defaultCurrent={Number(page)}
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
                setPage(String(page));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ContestItemList;
