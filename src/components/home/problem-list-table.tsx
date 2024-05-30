"use client";
import { Switch, Table, TableColumnsType, Tag } from "antd";
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
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
              {record?.title}
            </div>
          ),
          expandedRowClassName: () => "!text-grey",
          expandedRowKeys: data?.pdocs?.map((item) => item.pid),
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
