"use client";
import { TagRenderer } from "@/components/common/filter-tabs-tree";
import Tag from "@/components/ui/tag";
import { STATUS_ACCEPTED } from "@/constants/judge-status";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { request } from "@/lib/request";
import { cn, getTimeDiffFromNow } from "@/lib/utils";
import loginStore from "@/store/login";
import { useInfiniteScroll } from "ahooks";
import { Button, Table, TableProps } from "antd";
import React from "react";

const tableColumns: TableProps["columns"] = [
  {
    title: "编号",
    dataIndex: "pid",
    width: 100,
  },
  {
    title: "题目名称",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "算法标签",
    dataIndex: "tags",
    render(value) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((tag: string) => (
            <Tag key={tag}>{tag.toUpperCase()}</Tag>
          ))}
        </div>
      );
    },
  },
  {
    title: "难度",
    dataIndex: "difficulty",
    width: 60,
  },
  {
    title: "评测结果",
    dataIndex: "result",
    width: 100,
    render(value, record) {
      return (
        <span className={cn(value === STATUS_ACCEPTED ? "text-[#04c407]" : "text-[#FF7D37]", "font-bold")}>
          {record["lang"] !== "_" ? record.score : value === STATUS_ACCEPTED ? "正确" : "错误"}
        </span>
      );
    },
  },
  {
    title: "平均AC",
    dataIndex: "acPercentage",
    width: 100,
    render(value) {
      return `${(value * 100).toFixed()}%`;
    },
  },
  {
    title: "答题时间",
    dataIndex: "submitAt",
    width: 100,
    render: (value) => getTimeDiffFromNow(value),
  },
];

export const getRecords = (lang?: string, page = 1, full = false, uid = loginStore.user.get()?._id ?? 0) => {
  return request.get("/record", {
    params: {
      uidOrName: String(uid),
      page,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lang: lang as any,
      full,
    },
    transformData: ({ data }) => {
      return data.rdocs.map((record) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const question = data.pdict[record.pid] as Record<string, any>;
        return {
          pid: question?.pid ?? record.pid,
          name: question.title,
          tags: question.tag,
          result: record.status,
          score: record.score,
          lang: record.lang,
          acPercentage: question.nAccept / question.nSubmit,
          duration: record.time,
          rid: record._id,
          submitAt: new Date(record.judgeAt),
          difficulty: question.difficulty,
        };
      });
    },
  });
};

const SubmitRecords = () => {
  const [activeKey, setActiveKey] = useUrlParamState("category", "objective");

  const { data, loadingMore, loading, loadMore, noMore } = useInfiniteScroll(
    async (_data) => {
      const current = _data?.currentPage ?? 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rdocs = (await getRecords(activeKey === "objective" ? ("_" as any) : undefined, current, true)).filter(
        (r) => {
          if (activeKey === "objective") return true;
          return r.lang !== "_";
        }
      );
      if (rdocs.length === 0) {
        return {
          list: [],
          hasNoMore: true,
        };
      }
      return {
        list: rdocs,
        currentPage: current + 1,
        prevLen: _data?.list?.length ?? 0,
      };
    },
    {
      reloadDeps: [activeKey],
      isNoMore: (data) => data?.hasNoMore,
    }
  );

  return (
    <div>
      <TagRenderer
        data={[
          { label: "客观题", key: "objective" },
          { label: "编程题", key: "default" },
        ]}
        selectedKey={activeKey}
        onChange={setActiveKey}
      />
      <Table columns={tableColumns} loading={loading} pagination={false} dataSource={data?.list ?? []} />
      {!loading && (
        <div className="mt-8 w-full text-center">
          <Button onClick={loadMore} disabled={noMore} loading={loadingMore}>
            {noMore ? "没有更多记录" : "加载更多"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubmitRecords;
