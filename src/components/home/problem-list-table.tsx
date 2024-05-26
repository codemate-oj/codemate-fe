"use client";
import { Switch, Table, TableColumnsType, Tag } from "antd";
import React from "react";
import Image from "next/image";
import useUrl from "@/hooks/useUrl";
import { request } from "@/lib/request";
import LinkBtn from "../common/link-btn";
import { useWatcher } from "alova";
import { paths } from "@/types/schema";

type DataType = paths["/p"]["get"]["responses"]["200"]["content"]["application/json"]["pdocs"][number];

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
    render: (_, record) => (
      <>
        {record.tag?.map((tag: string) => {
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

  const { data, loading = true } = useWatcher(
    request.get("/p", {
      params: {
        page: Number(queryParams["page"]) || 1,
        limit: 15,
        source: queryParams["tid"],
        lang: queryParams["lang"],
      },
      transformData: (data) => {
        return data.data;
      },
    }),
    [queryParams["tid"], queryParams["lang"], queryParams["page"]],
    { immediate: true }
  );

  return (
    <Table
      loading={loading}
      dataSource={data?.pdocs}
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
        expandedRowRender: (record) => (
          <div
            style={{
              color: "#797979",
              paddingBottom: "1rem",
              borderBottom: "0.1rem dashed #F1F1F1",
            }}
          >
            {record?.title}
          </div>
        ),
        expandedRowClassName: () => "!text-grey",
        expandedRowKeys: data?.pdocs?.map((item) => item.pid),
        expandIcon: () => <></>,
      }}
      pagination={{
        position: ["bottomCenter"],
        current: Number(queryParams["page"]) || 1,
        total: data?.pcount,
        pageSize: 15,
        onChange: (page) => {
          updateQueryParams("page", String(page));
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
  );
};

export default ProblemListTable;
