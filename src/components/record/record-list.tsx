"use client";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import React, { useEffect, useMemo, useState } from "react";
import RecordFilterForm, { RecordFilterFormType } from "./record-filter-form";
import { Button, Table, TableProps } from "antd";
import { getTimeDiffFromNow } from "@/lib/utils";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import JudgeStatus from "./judge-status";
import Link from "next/link";
import useRecordMainConn from "@/hooks/useRecordMainConn";

export interface RecordRowType {
  rid: string;
  status: number;
  score: number;
  problem: {
    pid: string;
    title: string;
  };
  submitBy: {
    nickname?: string;
    uname: string;
  };
  time: number;
  memory: number;
  lang: string;
  submitAt: Date;
}

export const tableColumns: TableProps["columns"] = [
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    width: 200,
    render: (value, record) => (
      <Link href={`/record/${record.rid}`} target="_blank" className="hover:underline">
        <JudgeStatus statusCode={value} score={record.score} />
      </Link>
    ),
  },
  {
    title: "题目",
    key: "problem",
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
    key: "submitBy",
    dataIndex: "submitBy",
    render: (value) => value.nickname ?? value.uname,
  },
  {
    title: "时间",
    key: "time",
    dataIndex: "time",
    render: (value) => (value === 0 ? "-" : `${value.toFixed(1)} ms`),
  },
  {
    title: "内存",
    key: "memory",
    dataIndex: "memory",
    render: (value) => (value === 0 ? "-" : `${(value / 1024).toFixed(2)} MiB`),
  },
  {
    title: "语言",
    key: "lang",
    dataIndex: "lang",
  },
  {
    title: "提交时间",
    key: "submitAt",
    dataIndex: "submitAt",
    render: (value) => getTimeDiffFromNow(value),
  },
];

interface RecordListProps {
  builtinFilter?: RecordFilterFormType;
  hiddenColumns?: string[];
  tableProps?: Partial<TableProps>;
}

const RecordList: React.FC<RecordListProps> = ({ builtinFilter, hiddenColumns = [], tableProps = {} }) => {
  const [filter, setFilter] = useState(builtinFilter);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: records,
    loading,
    mutate,
  } = useRequest(
    async () => {
      const ObjectId = (await import("bson")).ObjectId;
      return await request.get("/record", {
        params: {
          page: currentPage,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(filter as any),
        },
        transformData: (data) => {
          return data.data.rdocs.map((record) => ({
            rid: record._id,
            status: record.status,
            score: record.score,
            problem: data.data.pdict[record.pid] as unknown as {
              pid: string;
              title: string;
            },
            submitBy: data.data.udict[record.uid] as unknown as {
              nickname?: string;
              uname: string;
            },
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

  const latestRowChange = useRecordMainConn(filter);

  useEffect(() => {
    if (!latestRowChange || !records) return;
    const _records = [...records];
    const existedRDoc = _records?.find((record) => record.rid === latestRowChange.rid);
    if (existedRDoc) {
      const i = _records?.indexOf(existedRDoc);
      if (i !== undefined && i !== -1) {
        _records.splice(i, 1, { ...existedRDoc, ...latestRowChange });
        mutate(_records);
      }
    } else {
      _records.unshift({ ...latestRowChange });
      _records.splice(_records.length - 1, 1);
      mutate(_records);
    }
  }, [latestRowChange]);

  const columns = useMemo(
    () => tableColumns.filter((col) => !hiddenColumns.includes(col.key as string)),
    [hiddenColumns]
  );

  return (
    <div className="space-y-5">
      {!builtinFilter && <RecordFilterForm onSubmit={setFilter} loading={loading} />}
      <Table rowKey="rid" loading={loading} dataSource={records} columns={columns} pagination={false} {...tableProps} />
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
