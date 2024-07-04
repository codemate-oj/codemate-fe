"use client";
import { Table, TableColumnsType, Tag } from "antd";
import React from "react";
import Image from "next/image";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { request } from "@/lib/request";
import LinkBtn from "../common/link-btn";
import { useWatcher } from "alova";
import { paths } from "@/types/schema";
import { useSearchParams } from "next/navigation";
import ProblemListMask from "@/components/home/problem-list-mask";
import CommonModal from "@/components/common/common-modal";
import { useRequest } from "ahooks";
import { useProblemPermission } from "@/hooks/useProblemPermission";

type DataType = paths["/p"]["get"]["responses"]["200"]["content"]["application/json"]["pdocs"][number];

const columns: TableColumnsType<DataType> = [
  {
    title: "编号",
    dataIndex: "pid",
    key: "pid",
    width: "120px",
  },
  {
    title: "题目名称",
    dataIndex: "title",
    key: "title",
    width: "250px",
    render: (_, { title }) => <span className="text-sm font-bold">{title}</span>,
  },
  {
    title: () => (
      <>
        <span className="mr-3 text-sm font-bold">算法标签</span>
        {/* <Switch defaultChecked /> */}
      </>
    ),
    key: "tag",
    width: "250px",
    dataIndex: "tag",
    ellipsis: true,
    render: (_, record) => (
      <>
        {record.tag?.map((tag: string) => {
          return (
            <Tag color={"volcano"} key={tag} className="!bg-orange-50 !leading-4 !text-primary">
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "难度",
    key: "difficulty",
    hidden: true,
    render: (_, record) => (
      <div className="flex gap-1">
        {new Array(
          Number(record?.difficulty ?? Math.round(Math.max(Math.min(record?.nSubmit / (record?.nAccept + 1), 10), 1)))
        ).map((_, index) => (
          <Image src="/svg/star.svg" alt="" key={index} width={15} height={15} />
        ))}
      </div>
    ),
  },
  {
    title: "尝试",
    key: "nSubmit",
    dataIndex: "nSubmit",
    width: "100px",
  },
  {
    title: "AC率",
    key: "nAccept",
    render: (_, record) => `${((record.nAccept / record.nSubmit) * 100).toFixed(1)}%`,
    width: "100px",
  },
  {
    title: "热度",
    key: "hot",
    render: (_, record) => (
      <div className="flex gap-1">{"🔥".repeat(Math.min(Math.floor(record.nSubmit / 20), 6))}</div>
    ),
    width: "200px",
  },
];

const ProblemListTable = () => {
  const [page, setPage] = useUrlParamState("page", "1");
  const queryParams = useSearchParams();

  const { data, loading = true } = useWatcher(
    request.get("/p", {
      params: {
        page: Number(page) || 1,
        limit: 15,
        source: queryParams.get("tid") || undefined,
        lang: queryParams.get("lang") || undefined,
      },
      transformData: (data) => {
        return data.data;
      },
    }),
    [queryParams, page],
    { immediate: true }
  );

  const { data: tdocData } = useRequest(
    async () => {
      const tid = queryParams.get("tid");
      if (!tid) return { ishasPermission: true };
      const { data } = await request.get(`/p-list/${tid}` as "/p-list/{tid}", {
        transformData: (data) => {
          return data;
        },
      });
      return { tid: tid, content: data.tdoc.content, ishasPermission: data.hasPermission };
    },
    {
      cacheKey: "/home/filter-data/hasPermission",
      refreshDeps: [queryParams.get("tid")],
    }
  );

  const { runCheckProblemPermission } = useProblemPermission();

  return (
    <ProblemListMask
      tid={tdocData?.tid ?? ""}
      content={tdocData?.content ?? ""}
      ishasPermission={tdocData?.ishasPermission ?? true}
    >
      <CommonModal />
      <Table
        loading={loading}
        dataSource={data?.pdocs}
        columns={columns}
        rowKey="pid"
        rowClassName="!cursor-pointer"
        onRow={(record) => {
          return {
            onClick: () => {
              runCheckProblemPermission({ pid: record.pid, assign: record.assign, title: record.title });
            },
          };
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div
              style={{
                color: "#797979",
                paddingBottom: "1rem",
                borderBottom: "0.1rem dashed #F1F1F1",
              }}
            >
              {record?.brief}
            </div>
          ),
          expandedRowClassName: () => "!text-grey",
          expandedRowKeys: data?.pdocs?.filter((item) => Boolean(item.brief))?.map((item) => item.pid),
          expandIcon: () => <></>,
        }}
        pagination={{
          position: ["bottomCenter"],
          current: Number(page) || 1,
          total: data?.pcount,
          pageSize: 15,
          onChange: (page) => {
            setPage(String(page));
          },
          showSizeChanger: false,
          itemRender(_, type, element) {
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
          },
        }}
      />
    </ProblemListMask>
  );
};

export default ProblemListTable;
