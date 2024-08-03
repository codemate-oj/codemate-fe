import React from "react";
import { Table, TableColumnsType, Button } from "antd";
import Link from "next/link";
import Image from "next/image";

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

interface ProblemTableProps {
  data: ProblemList[];
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const columns: TableColumnsType<ProblemList> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
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
  },
  {
    title: "Action",
    key: "action",
    render: (_, data) => (
      <Link href={`/user/plist/${data._id}/detail`}>
        <Image src="/svg/app-user-plist-editIcon.svg" alt="editQuiz" width={20} height={24} />
      </Link>
    ),
  },
];

const LinkBtn: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => {
  return (
    <Button className="hover:!text-primary" {...props} type="link">
      {children}
    </Button>
  );
};

const ProblemTable: React.FC<ProblemTableProps> = ({ data, loading, currentPage, onPageChange, showButton }) => {
  return (
    <Table
      showHeader={false}
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={{
        position: ["bottomCenter"],
        current: currentPage,
        total: 3,
        pageSize: 15,
        onChange: onPageChange,
        showSizeChanger: false,
        itemRender(_, type, element) {
          if (showButton) {
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
          }
        },
      }}
    />
  );
};

export default ProblemTable;
