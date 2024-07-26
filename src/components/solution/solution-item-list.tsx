"use client";
import React, { useState } from "react";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import Skeleton from "@/components/ui/skeleton";
import { Pagination } from "antd";
import LinkBtn from "../common/link-btn";
import SolutionItem from "./solution-item";

interface Props {
  pid: string;
}

const BulletinItemList: React.FC<Props> = ({ pid }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: pSolution, loading } = useRequest(
    async () => {
      const { data } = await request.get(`/p/${pid}/solution` as "/p/{pid}/solution", {
        params: {
          page: Number(currentPage),
        },
        transformData: (data) => {
          return data;
        },
      });
      const pscount = data.pscount;
      const itemList = data.psdocs;
      const pdoc = data.pdoc;
      const udict = data.udict;
      return {
        itemList,
        pscount,
        pdoc,
        udict,
      };
    },
    {
      refreshDeps: [currentPage],
    }
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[2rem] font-bold">{pSolution?.pdoc.pid} ：</span>
          <span className="mr-7 text-[2rem] font-bold">{pSolution?.pdoc.title}</span>
        </div>
        <span className="pr-4 text-[2rem] font-bold text-primary">正确答案：A</span>
      </div>
      <div>
        <span className="font-yahei text-[#797979]">文字解答数量：</span>
        <span className="text-primary">{pSolution?.pscount}篇</span>
      </div>
      <div className={"pt-3"}>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {pSolution?.itemList?.map((item) => {
              return <SolutionItem key={item._id} item={item} pid={pid} udoc={pSolution.udict[item.owner]} />;
            })}
            <div className={"mb-4 text-center"}>
              <Pagination
                defaultCurrent={Number(currentPage)}
                pageSize={5}
                total={pSolution?.itemList?.length || 0 * 5}
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
                  setCurrentPage(page);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default BulletinItemList;
