"use client";
import { STATUS_ACCEPTED, STATUS_TEXTS } from "@/constants/judge-status";
import { request } from "@/lib/request";
import { cn, getTimeDiffFromNow } from "@/lib/utils";
import loginStore from "@/store/login";
import { useRequest } from "ahooks";
import { Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const tableColumns: TableProps["columns"] = [
  {
    title: "分数",
    dataIndex: "score",
    render: (value, record) => {
      return record["lang"] !== "_" ? record.score : value === STATUS_TEXTS[STATUS_ACCEPTED];
    },
  },
  {
    title: "评测结果",
    dataIndex: "result",
    render(value) {
      return (
        <span className={cn(value === STATUS_ACCEPTED ? "text-[#04c407]" : "text-[#FF7D37]", "font-bold")}>
          {STATUS_TEXTS[value as keyof typeof STATUS_TEXTS]}
        </span>
      );
    },
  },
  {
    title: "语言",
    dataIndex: "lang",
    render(value) {
      return value === "cc.cc14o2" ? "C++" : value === "py.py3" ? "Python" : value;
    },
  },
  { title: "耗时", dataIndex: "duration", render: (value) => `${value}ms` },
  { title: "消耗内存", dataIndex: "memory", render: (value) => `${(value / 1024).toFixed(2)}MB` },
  {
    title: "答题时间",
    dataIndex: "submitAt",
    render: (value) => getTimeDiffFromNow(value),
  },
];

interface RecordType {
  result: number;
  score: number;
  lang: string;
  duration: number;
  memory: number;
  submitAt: Date;
}

const getRecords = (page = 1, pid: string, uid = loginStore.user.get()?._id ?? 0) => {
  return request.get("/record", {
    params: {
      uidOrName: String(uid),
      page,
      pid,
    },
    transformData: ({ data }) => {
      return data.rdocs.map((record) => {
        return {
          result: record.status,
          score: record.score,
          lang: record.lang,
          duration: record.time,
          memory: record.memory,
          submitAt: new Date(record.judgeAt),
        };
      });
    },
  });
};

interface SubmitRecordProps {
  updateRecord: number;
}

const SubmitRecord: React.FC<SubmitRecordProps> = ({ updateRecord }) => {
  const pathname = usePathname();
  const pid = pathname.split("/").pop();
  const [tableData, setTableData] = useState<RecordType[]>([]);
  const [current, setCurrent] = useState(1);
  const [hasNoMore, setHasNoMore] = useState(false);

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && !hasNoMore) {
      loadMore();
    }
  };

  const { run: loadMore, loading } = useRequest(
    async () => {
      const rdocs = (await getRecords(current, pid!)).filter((r) => {
        return r.lang !== "_";
      });
      if (rdocs.length === 0) {
        setHasNoMore(true);
        return [];
      }
      setCurrent(current + 1);
      return rdocs;
    },
    {
      manual: true,
      onSuccess: (result) => {
        setTableData((prev) => {
          const updatedData = [...prev, ...result];
          return updatedData.sort((a, b) => b.submitAt.getTime() - a.submitAt.getTime());
        });
      },
    }
  );

  useEffect(() => {
    loadMore();
    setHasNoMore(false);
  }, [loadMore, updateRecord]);

  return (
    <div>
      <Table
        columns={tableColumns}
        loading={loading}
        dataSource={tableData}
        pagination={false}
        virtual
        scroll={{ y: 110 }}
        onScroll={handleScroll}
      />
    </div>
  );
};

export default SubmitRecord;
