"use client";
import { request } from "@/lib/request";
import { useInfiniteScroll } from "ahooks";
import React, { useState } from "react";
import RecordFilterForm, { RecordFilterFormType } from "./record-filter-form";
import { Table, TableProps } from "antd";
import { STATUS_TEXTS, StatusType } from "@/constants/judge-status";
import { getTimeDiffFromNow } from "@/lib/utils";

export const tableColumns: TableProps["columns"] = [
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    render: (value) => STATUS_TEXTS[value as StatusType],
  },
  {
    title: "题目",
    dataIndex: "problem",
    render: (value) => (
      <div>
        <span>{value.pid}</span>
        <span> - </span>
        <span>{value.title}</span>
      </div>
    ),
  },
  {
    title: "递交者",
    dataIndex: "submitBy",
    render: (value) => value.nickname ?? value.uname,
  },
  {
    title: "时间",
    dataIndex: "time",
  },
  {
    title: "内存",
    dataIndex: "memory",
  },
  {
    title: "语言",
    dataIndex: "lang",
  },
  {
    title: "提交时间",
    dataIndex: "submitAt",
    render: (value) => getTimeDiffFromNow(value),
  },
];

const RecordList = () => {
  const [filter, setFilter] = useState<RecordFilterFormType>({});

  const { data, loadingMore, loading } = useInfiniteScroll(
    async (d) => {
      const current = d?.currentPage ?? 1;
      const records = await request.get("/record", {
        params: {
          page: current,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(filter as any),
        },
        transformData: async (data) => {
          const ObjectId = (await import("bson")).ObjectId;
          return data.data.rdocs.map((record) => ({
            status: record.status,
            problem: data.data.pdict[record.pid],
            submitBy: data.data.udict[record.uid],
            time: record.time,
            memory: record.memory,
            lang: record.lang,
            submitAt: new ObjectId(record._id).getTimestamp(),
          }));
        },
      });
      if (records.length === 0) {
        return {
          list: [],
          hasNoMore: true,
        };
      }
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        list: records,
        currentPage: current + 1,
        prevLen: d?.list?.length ?? 0,
      };
    },
    {
      isNoMore: (data) => data?.hasNoMore,
    }
  );

  return (
    <div className="space-y-5">
      <RecordFilterForm onSubmit={setFilter} loading={loading || loadingMore} />
      <Table loading={loading} dataSource={data?.list} columns={tableColumns} pagination={{ pageSize: 100 }} />
    </div>
  );
};

export default RecordList;
