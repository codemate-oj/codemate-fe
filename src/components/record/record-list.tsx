"use client";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import React, { useState } from "react";
import RecordFilterForm, { RecordFilterFormType } from "./record-filter-form";
import { Button, Table, TableProps } from "antd";
import { getTimeDiffFromNow } from "@/lib/utils";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import JudgeStatus from "../user/record/judge-status";
import Link from "next/link";

export const tableColumns: TableProps["columns"] = [
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    render: (value, record) => (
      <Link href={`/record/${record.rid}`} target="_blank" className="hover:underline">
        <JudgeStatus statusCode={value} score={record.score} />
      </Link>
    ),
  },
  {
    title: "题目",
    dataIndex: "problem",
    render: (value) => (
      <Link
        href={`/p/${value.pid}`}
        className="font-bold text-gray-900 hover:text-primary hover:underline"
        target="_blank"
      >
        <span>{value.pid}</span>
        <span> - </span>
        <span>{value.title}</span>
      </Link>
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
    render: (value) => (value === 0 ? "-" : `${value.toFixed(1)} ms`),
  },
  {
    title: "内存",
    dataIndex: "memory",
    render: (value) => (value === 0 ? "-" : `${(value / 1024).toFixed(2)} MiB`),
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
  const [filter, setFilter] = useState<RecordFilterFormType>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: records, loading } = useRequest(
    async () => {
      return await request.get("/record", {
        params: {
          page: currentPage,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(filter as any),
        },
        transformData: async (data) => {
          const ObjectId = (await import("bson")).ObjectId;
          return data.data.rdocs.map((record) => ({
            rid: record._id,
            status: record.status,
            score: record.score,
            problem: data.data.pdict[record.pid],
            submitBy: data.data.udict[record.uid],
            time: record.time,
            memory: record.memory,
            lang: record.lang === "_" ? "客观题" : PROGRAMMING_LANGS[record.lang as keyof typeof PROGRAMMING_LANGS],
            submitAt: new ObjectId(record._id).getTimestamp(),
          }));
        },
      });
    },
    {
      refreshDeps: [filter, currentPage],
      ready: filter !== undefined,
    }
  );

  return (
    <div className="space-y-5">
      <RecordFilterForm onSubmit={setFilter} loading={loading} />
      <Table rowKey="rid" loading={loading} dataSource={records} columns={tableColumns} pagination={false} />
      <div className="w-full space-x-4 text-center">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} loading={loading}>
          上一页
        </Button>
        <Button onClick={() => setCurrentPage(currentPage + 1)} loading={loading}>
          下一页
        </Button>
      </div>
    </div>
  );
};

export default RecordList;
