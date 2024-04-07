"use client";
import FilerTabsTree, { type FilerTabsTreeData } from "@/components/common/filter-tabs-tree";
import FixedSelect, { type FixedSelectOptions } from "@/components/common/fixed-select";
import LinkBtn from "@/components/common/link-btn";
import useUrl from "@/hooks/useUrl";
import { request } from "@/lib/request";
import { Switch, Table, TableColumnsType, Tag } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
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
        {new Array(Number(record?.difficulty)).fill(0).map((_, index) => (
          <Image src="/svg/star.svg" alt="" key={index} width={15} height={15}></Image>
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
        {new Array(Number(record?.difficulty)).fill(0).map((_, index) => (
          <Image src="/img/fire.png" alt="" key={index} width={15} height={15}></Image>
        ))}
      </div>
    ),
  },
];

async function getSideTabs() {
  const { data } = await request.get<FixedSelectOptions[]>("/home/tabs");
  return data;
}

async function getFilters() {
  const { data } = await request.get<FilerTabsTreeData>("/home/filter");
  return data;
}

async function getTable(params: any) {
  const { data } = await request.get<DataType[]>("/home/table", { params });
  return data;
}

const HomePage = () => {
  const [sideTabs, setSideTabs] = useState<FixedSelectOptions[]>([]);
  const [questionBankTabs, setQuestionBankTabs] = useState<FilerTabsTreeData>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const { queryParams, updateQueryParams } = useUrl();
  const [tablePayload, setTablePayload] = useState<{
    pageIndex?: number;
    tab?: string;
    fixedTab?: string;
  }>({});
  useEffect(() => {
    getSideTabs().then(setSideTabs);
    getFilters().then(setQuestionBankTabs);
    getTable(tablePayload).then(setTableData);
  }, []);

  return (
    <>
      <FixedSelect
        options={sideTabs}
        onSelect={(i) => updateQueryParams("fixedTab", i)}
        defaultSelectedValue={queryParams["fixedTab"]}
      />
      <>
        <FilerTabsTree
          filerTabsTreeData={questionBankTabs}
          onChange={(key) => {
            console.log(key, 22);
            updateQueryParams("tab", key);
          }}
          defaultActiveKey={queryParams["tab"]}
        />
        <Table
          columns={columns}
          dataSource={tableData}
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
            expandedRowKeys: tableData.map((item) => item.key),
            expandIcon: () => <></>,
          }}
          expandedRowClassName={() => "!text-grey"}
          pagination={{
            current: Number(queryParams["pageIndex"]) || 1,
            onChange(page, pageSize) {
              updateQueryParams("pageIndex", page);
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
      </>
    </>
  );
};

export default HomePage;
