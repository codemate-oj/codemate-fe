"use client";
import { Table, TableColumnsType, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { request } from "@/lib/request";
import LinkBtn from "../common/link-btn";
import { paths } from "@/types/schema";
import ProblemListMask from "@/components/home/problem-list-mask";
import CommonModal from "@/components/common/common-modal";
import { useRequest } from "ahooks";
import { useProblemPermission } from "@/hooks/useProblemPermission";
import { stripMarkdown } from "@/lib/markdown";

type DataType = paths["/p"]["get"]["responses"]["200"]["content"]["application/json"]["pdocs"][number];

export const columns: TableColumnsType<DataType> = [
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
    width: "200px",
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
    dataIndex: "tag",
    // ellipsis: true,
    render: (_, record) => (
      <div className="flex flex-wrap">
        {record.tag?.map((tag: string) => {
          return (
            <Tag color={"volcano"} key={tag} className="!bg-orange-50 !leading-4 !text-primary">
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </div>
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
      <div className="flex gap-1">{"🔥".repeat(Math.min(Math.floor(record.nSubmit / 20), 5))}</div>
    ),
    width: "150px",
  },
];

interface Props {
  tid?: string;
  lang?: string;
}

const ProblemListTable: React.FC<Props> = ({ tid, lang }) => {
  const [page, setPage] = useUrlParamState("page", "1");
  const cache = useRef<string | null>(null);

  const {
    data,
    run: refresh,
    loading,
  } = useRequest(
    async () => {
      const data = await request.get("/p", {
        params: {
          page: Number(page) || 1,
          limit: 15,
          source: tid,
          lang: lang,
        },
        transformData: (data) => {
          return data.data;
        },
      });

      return data;
    },
    {
      manual: true,
    }
  );

  const { data: tdocData } = useRequest(
    async () => {
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
      refreshDeps: [tid],
    }
  );

  const { runCheckProblemPermission } = useProblemPermission();

  // 在tid或lang变化时，重置page
  useEffect(() => {
    if (cache.current) {
      const newCache = JSON.stringify({ tid, lang });
      if (cache.current === newCache) return;
    }
    cache.current = JSON.stringify({ tid, lang });
    if (page === "1") {
      refresh(); // page=1时需要手动刷新
    } else {
      setPage("1");
    }
  }, [tid, lang]);

  // 在page更新时刷新表格（tid和lang依赖page去刷新）
  useEffect(() => {
    refresh();
  }, [page]);

  return (
    <ProblemListMask
      tid={tdocData?.tid ?? ""}
      content={tdocData?.content ?? ""}
      ishasPermission={tdocData?.ishasPermission ?? true}
    >
      <CommonModal />
      <Table
        size="small"
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
          showExpandColumn: false,
          expandedRowRender: (record) => (
            <div
              style={{
                color: "#797979",
                paddingBottom: "1rem",
                borderBottom: "0.1rem dashed #F1F1F1",
              }}
            >
              {stripMarkdown(record?.brief)?.slice(0, 100)}...
            </div>
          ),
          expandedRowClassName: () => "!text-grey",
          expandedRowKeys: data?.pdocs?.filter((item) => Boolean(item.brief))?.map((item) => item.pid),
          expandIcon: () => null,
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
