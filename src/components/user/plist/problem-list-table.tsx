import React from "react";
import { Table, TableColumnsType, Button } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRequest } from "ahooks";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { request } from "@/lib/request";

export interface ProblemList {
  _id: string;
  docId?: string;
  docType?: number;
  domainId?: string;
  owner?: string;
  parent?: number;
  title: string;
  pids: number[];
  visibility?: "private" | "public" | "system";
  content?: string;
}

const columns: TableColumnsType<ProblemList> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "20%",
    ellipsis: true,
  },
  {
    title: "Pids",
    key: "pids",
    render: (_, { pids }) => <span className="text-sm text-[#FF7D37]">{`${pids.length} 道`}</span>,
  },
  {
    title: "Description",
    dataIndex: "content",
    key: "content",
    width: "60%",
    render: (text) => <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>{text}</div>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, data) => (
      <Link href={`/user/plist/${data._id}/detail`}>
        <Image src="/svg/app-user-plist-editIcon.svg" alt="editQuiz" width={20} height={24} />
      </Link>
    ),
    width: "10%",
  },
];

const LinkBtn: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => (
  <Button className="hover:!text-primary" {...props} type="link">
    {children}
  </Button>
);

/** @desc 题单列表 */
const ProblemListTable: React.FC = () => {
  const [page, setPage] = useUrlParamState("page", "1");

  const { data: problemListData, loading: requestLoading } = useRequest(
    async () => {
      const { data } = await request.get(`/user-plist`, {
        params: {
          page: Number(page) > 0 ? Number(page) : 1,
          all: false,
        },
      });
      return data;
    },
    {
      refreshDeps: [page],
    }
  );

  const dataSource = problemListData?.pldocs || [];
  const total = problemListData?.pldocsCount || 0;

  const onPageChange = (page: number) => {
    if (page > 0) {
      setPage(page.toString());
    }
  };

  return (
    <Table
      showHeader={false}
      dataSource={dataSource}
      columns={columns}
      loading={requestLoading}
      rowKey="_id"
      pagination={{
        position: ["bottomCenter"],
        current: Number(page) > 0 ? Number(page) : 1,
        total,
        onChange: onPageChange,
        showSizeChanger: false,
        itemRender: (_, type, element) => {
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
  );
};

export default ProblemListTable;
