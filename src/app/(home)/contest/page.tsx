"use client";
import SideFilter from "@/components/common/side-filter";
import FilerTabsTree from "@/components/common/filter-tabs-tree";
import LinkBtn from "@/components/common/link-btn";
import ContestItem from "@/components/contest/contest-item";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import useUrl from "@/hooks/useUrl";
import { Pagination } from "antd";
import React from "react";
import { CONTEST_STATUS, CONTEST_FILTER, CONTEST_FILTER_DIR, type CONTEST_STATUS_VAL } from "./const";

const contest_mock = [
  {
    _id: "test01",
    docId: "RZX001",
    docType: 0,
    beginAt: "2024-12-17T03:24:00",
    endAt: "2024-12-17T05:24:00",
    attend: 99,
    title: "粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    content: "【RZX002】 粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    rule: "oi",
    pids: [],
  },
  {
    _id: "test01",
    docId: "RZX001",
    docType: 0,
    beginAt: "2024-12-17T03:24:00",
    endAt: "2024-12-17T05:24:00",
    attend: 99,
    title: "粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    content: "【RZX002】 粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    rule: "oi",
    pids: [],
  },
  {
    _id: "test01",
    docId: "RZX001",
    docType: 0,
    beginAt: "2024-12-17T03:24:00",
    endAt: "2024-12-17T05:24:00",
    attend: 99,
    title: "粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    content: "【RZX002】 粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    rule: "oi",
    pids: [],
  },
  {
    _id: "test01",
    docId: "RZX001",
    docType: 0,
    beginAt: "2024-12-17T03:24:00",
    endAt: "2024-12-17T05:24:00",
    attend: 99,
    title: "粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    content: "【RZX002】 粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    rule: "oi",
    pids: [],
  },
  {
    _id: "test01",
    docId: "RZX001",
    docType: 0,
    beginAt: "2024-12-17T03:24:00",
    endAt: "2024-12-17T05:24:00",
    attend: 99,
    title: "粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    content: "【RZX002】 粤港澳青少年信息学创新大赛-创新程序开发闯关竞赛--图形化甲组",
    rule: "oi",
    pids: [],
  },
];

const ContestPage = () => {
  const { queryParams, updateQueryParams } = useUrl();
  const { data } = useRequest(
    async () => {
      if (!queryParams["page"]) {
        updateQueryParams("page", "1");
      }
      const tags = queryParams["tid"]
        ?.split(",")
        .map((item) => {
          //@ts-ignore
          return CONTEST_FILTER_DIR[item];
        })
        .join(",");
      const category = queryParams["status"] as CONTEST_STATUS_VAL;
      const page = Number(queryParams["page"]);
      console.log(tags, category, page);
      const { data } = await request.get("/contest", {
        params: {
          page,
          tags,
          category,
        },
      });
    },
    {
      refreshDeps: [queryParams["tid"], queryParams["status"], queryParams["page"]],
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
        defaultSelectedValue={queryParams["status"]}
      />
      <div className="ml-8 flex-1 flex flex-col">
        <FilerTabsTree
          filerTabsTreeData={CONTEST_FILTER}
          onChange={(key) => {
            updateQueryParams("tid", key);
          }}
          defaultActiveKey={queryParams["tid"]}
        />
        {contest_mock.map((item, index) => {
          return (
            <div key={item._id} className={index !== contest_mock.length - 1 ? "mb-5" : ""}>
              <ContestItem item={item} />
            </div>
          );
        })}
        <div className={"mb-4 mt-4 flex flex-col"}>
          <Pagination
            className={"self-center"}
            defaultCurrent={1}
            current={Number(queryParams["page"])}
            onChange={(page) => {
              updateQueryParams("page", String(page));
            }}
            pageSize={5}
            total={100}
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
          />
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
