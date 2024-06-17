"use client";

import { CATEGORY_MAP } from "@/components/contest/aside-category-select";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { request } from "@/lib/request";
import { useAntdTable } from "ahooks";
import { Table, TableProps, Tabs, TabsProps } from "antd";
import dayjs from "dayjs";
import React from "react";

export const tabItems: TabsProps["items"] = Object.keys(CATEGORY_MAP).map((item) => {
  return {
    label: CATEGORY_MAP[item as keyof typeof CATEGORY_MAP],
    key: item,
  };
});

export const tableColumns: TableProps["columns"] = [
  {
    title: "状态",
    render(_, record) {
      const beginTime = new Date(record.beginAt).getTime();
      const endTime = new Date(record.endAt).getTime();
      if (beginTime > Date.now()) {
        return "未开始";
      } else if (endTime < Date.now()) {
        return "已结束";
      } else {
        return "进行中";
      }
    },
  },
  {
    title: "比赛名称",
    dataIndex: "title",
    render(value, record) {
      return (
        <a href={`/contest/${record.docId}`} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      );
    },
  },
  {
    title: "比赛时间",
    render(_, record) {
      return (
        <div>
          {dayjs(record.beginAt).format("YYYY-MM-DD HH:mm:ss")}
          {` ~ `}
          {dayjs(record.endAt).format("YYYY-MM-DD HH:mm:ss")}
        </div>
      );
    },
  },
  {
    title: "题数",
    render(_, record) {
      return record.pids.length;
    },
  },

  // {
  //   title: "举办者",
  //   dataIndex: "owner",
  // },
];

const UserContestPage = () => {
  const [tab, setTab] = useUrlParamState("tab", tabItems[0].key);

  const { tableProps } = useAntdTable(
    async ({ current }) => {
      const data = await request.get("/contest", {
        params: {
          page: current,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          category: tab as any,
          attend: true,
        },
        transformData(data) {
          return {
            ...data.data,
            tdocs: data.data.tdocs.map((item) => ({
              ...item,
              beginAt: new Date(item.beginAt),
              endAt: new Date(item.endAt),
            })),
          };
        },
      });

      return {
        list: data.tdocs,
        total: data.tpcount,
      };
    },
    {
      refreshDeps: [tab],
    }
  );

  return (
    <div>
      <Tabs items={tabItems} activeKey={tab} onChange={setTab} />
      <Table rowKey="docId" columns={tableColumns} {...tableProps} />
    </div>
  );
};

export default UserContestPage;
