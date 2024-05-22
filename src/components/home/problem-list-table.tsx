"use client";
import { Switch, Table, TableColumnsType, Tag } from "antd";
import React from "react";
import Image from "next/image";
import useUrl from "@/hooks/useUrl";
import { useAntdTable } from "ahooks";
import { request } from "@/lib/request";
import LinkBtn from "../common/link-btn";

interface DataType {
  key: string;
  pid: number;
  title: string;
  brief: string;
  difficulty: number;
  nSubmit: number;
  nAccept: number;
  tag: string[];
}

const columns: TableColumnsType<DataType> = [
  {
    title: "编号",
    dataIndex: "pid",
    key: "pid",
    width: "10%",
  },
  {
    title: "题目名称",
    dataIndex: "title",
    key: "title",
    width: "18%",
    render: (_, { title }) => <span className="font-bold text-sm">{title}</span>,
  },
  {
    title: () => (
      <>
        <span className="font-bold text-sm mr-3">算法标签</span>
        <Switch defaultChecked />
      </>
    ),
    key: "tag",
    dataIndex: "tag",
    width: "40%",
    render: (_, { tag }) => (
      <>
        {tag?.map((tag) => {
          return (
            <Tag color={"volcano"} key={tag} className="!text-primary !bg-orange-50 !leading-4">
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
    dataIndex: "difficulty",
    width: "12%",
    render: (_, record) => (
      <div className="flex gap-1">
        {new Array(Number(record?.difficulty ?? 0)).map((_, index) => (
          <Image src="/svg/star.svg" alt="" key={index} width={15} height={15} />
        ))}
      </div>
    ),
  },
  {
    title: "尝试",
    key: "nSubmit",
    dataIndex: "nSubmit",
    width: "5%",
  },
  {
    title: "AC率",
    key: "nAccept",
    dataIndex: "nAccept",
    width: "5%",
  },
  {
    title: "热度",
    key: "difficulty",
    dataIndex: "difficulty",
    width: "15%",
    render: (_, record) => (
      <div className="flex gap-1">
        {new Array(Number(record?.difficulty ?? 0)).map((_, index) => (
          <Image src="/img/fire.png" alt="" key={index} width={15} height={15}></Image>
        ))}
      </div>
    ),
  },
];

const ProblemListTable = () => {
  const { queryParams, updateQueryParams } = useUrl();

  const {
    data: tableData,
    tableProps: { pagination, ...tableProps },
  } = useAntdTable(
    async ({ current, pageSize }) => {
      const { data } = await request.get("/p", {
        params: {
          page: current,
          limit: pageSize,
          source: queryParams["tid"],
          lang: queryParams["lang"],
        },
      });
      updateQueryParams("page", String(current));
      return { total: data.pcount, list: data.pdocs as any[] };
    },
    {
      cacheKey: "/home/p/table-data",
      defaultCurrent: Number(queryParams["page"]) || 1,
      defaultPageSize: 15,
      refreshDeps: [queryParams["tid"], queryParams["lang"]],
    }
  );

  return (
    <Table
      {...tableProps}
      columns={columns}
      rowKey="pid"
      rowClassName="!cursor-pointer"
      onRow={(record) => {
        return {
          onClick: () => {
            window.open(`/p/${record.pid}`);
          },
        };
      }}
      expandable={{
        expandedRowRender: (record?: DataType) => (
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
        expandedRowKeys: tableData?.list?.map((item) => item.key),
        expandIcon: () => <></>,
      }}
      pagination={{
        ...pagination,
        position: ["bottomCenter"],
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
  );
};

export default ProblemListTable;
