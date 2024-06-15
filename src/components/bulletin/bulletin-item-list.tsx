"use client";
import React, { useCallback } from "react";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import BulletinItem from "./bulletin-item";
import Skeleton from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import LinkBtn from "../common/link-btn";

const BulletinItemList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useUrlParamState("page", "1");

  const toDetial = useCallback(
    (id: string) => {
      router.push(`/bulletin/${id}`);
    },
    [router]
  );

  const { data: itemListData, loading } = useRequest(
    async () => {
      const { data } = await request.get("/bulletin", {
        params: {
          page: Number(page),
          tags: searchParams.get("tags") || undefined,
        },
        transformData: (data) => {
          return data;
        },
      });
      const pageTpcount = data.bdocsPage;
      const itemList = data.bdocs;
      return {
        itemList,
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
              <BulletinItem
                toDetail={(id: string) => {
                  toDetial(id);
                }}
                key={item._id}
                item={item}
              />
            );
          })}
          <div className={"text-center mb-4"}>
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
export default BulletinItemList;
