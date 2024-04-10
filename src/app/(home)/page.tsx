"use client";
import FilerTabsTree, { type FilerTabsTreeData } from "@/components/common/filter-tabs-tree";
import FixedSelect, { type FixedSelectOptions } from "@/components/common/fixed-select";
import LinkBtn from "@/components/common/link-btn";
import useUrl from "@/hooks/useUrl";
import { request } from "@/lib/request";
import { useRequest } from "alova";
import { Switch, Table, TableColumnsType, Tag } from "antd";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";
interface DataType {
  key: string;
  pid: number;
  title: string;
  titleDescription: string;
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
            <Tag color={"volcano"} key={tag} className="!text-primary !bg-orange-50">
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
        {new Array(Number(record?.difficulty))
          .fill(0)
          ?.map((_, index) => <Image src="/svg/star.svg" alt="" key={index} width={15} height={15}></Image>)}
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
        {new Array(Number(record?.difficulty))
          .fill(0)
          ?.map((_, index) => <Image src="/img/fire.png" alt="" key={index} width={15} height={15}></Image>)}
      </div>
    ),
  },
];

const HomePage = () => {
  const { data: sideTabsData } = useRequest(request.get<FixedSelectOptions[]>("/home/tabs"));
  const { data: questionBankTabsData } = useRequest(request.get<FilerTabsTreeData>("/home/filter"));
  const { data: tableDataData, loading: isTableLoading } = useRequest(request.get<DataType[]>("/home/table"));
  const { queryParams, updateQueryParams } = useUrl();

  return (
    <Suspense>
      <FixedSelect
        options={sideTabsData?.data ?? []}
        onSelect={(i) => updateQueryParams("fixedTab", i)}
        defaultSelectedValue={queryParams["fixedTab"]}
      />
      <FilerTabsTree
        filerTabsTreeData={questionBankTabsData?.data ?? []}
        onChange={(key) => {
          updateQueryParams("tab", key);
        }}
        defaultActiveKey={queryParams["tab"]}
      />
      <Table
        loading={isTableLoading}
        columns={columns}
        dataSource={tableDataData?.data}
        rowKey="pid"
        size="small"
        expandable={{
          expandedRowRender: (record) => (
            <div
              style={{
                color: "#797979",
                paddingBottom: "1rem",
                borderBottom: "0.1rem dashed #F1F1F1",
              }}
            >
              {record?.titleDescription}
            </div>
          ),
          expandedRowClassName: () => "!text-grey",
          expandedRowKeys: tableDataData?.data?.map((item) => item.key),
          expandIcon: () => <></>,
        }}
        pagination={{
          current: Number(queryParams["pageIndex"]) || 1,
          onChange(page, pageSize) {
            updateQueryParams("pageIndex", String(page));
          },
          position: ["bottomCenter"],
          itemRender(page, type, element) {
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
    </Suspense>
  );
};

export default HomePage;
